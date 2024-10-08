'use client'

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormConsultType, formConsult } from '~/core/schemas/fipe/formConsult'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { consultStore } from '~/store/consult'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '~/hooks/useSnackbarContext'
import { IVehicleOption, vehicleOptions } from '~/core/utils/types/vehicles'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'

const DEFAULT_SELECT_VALUE = '0'

interface IFormConsultProps {
  brands: IBrandResponse[]
}

function FormConsult({ brands: brandsCached }: IFormConsultProps) {
  const { showSnackbar } = useSnackbar()

  const router = useRouter()

  const {
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { isValid: isFormValid },
  } = useForm<FormConsultType>({
    resolver: zodResolver(formConsult),
    mode: 'onChange',
  })

  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)

  const onSubmit = async (data: FormConsultType) => {
    if (data.brand === 'undefined' || data.model === 'undefined') {
      showSnackbar({
        message: 'Selecione a marca e o modelo para continuar.',
        variant: 'warning',
      })
      return
    }

    setIsLoadingButton(true)
    router.push(
      `/fipe/${data.vehicle.value}/${data.brand}/${data.model}/${data.year}`,
    )
  }

  const currentVehicle = watch('vehicle') || vehicleOptions[0]
  const currentBrand = watch('brand')
  const currentModel = watch('model')

  const isVehicleSelected = !!(currentVehicle && currentModel !== 'undefined')
  const isBrandSelected = !!(currentBrand && currentBrand !== 'undefined')
  const isModelSelected = !!(currentModel && currentModel !== 'undefined')

  const { brands, models, years, loadingModels, loadingBrands } = consultStore

  const brandList = brands || brandsCached

  useEffect(() => {
    setValue('brand', null, { shouldValidate: true })
    setValue('model', null, { shouldValidate: true })
    setValue('year', DEFAULT_SELECT_VALUE, { shouldValidate: true })
    consultStore.clearBrands()
    if (currentVehicle) {
      consultStore.clearModels()
      consultStore.clearYears()
      consultStore.fetchBrands(currentVehicle.value)
    }
  }, [currentVehicle])

  useEffect(() => {
    setValue('model', null, { shouldValidate: true })
    setValue('year', DEFAULT_SELECT_VALUE, { shouldValidate: true })
    consultStore.clearModels()
    if (isVehicleSelected && isBrandSelected) {
      consultStore.clearYears()
      consultStore.fetchModels(currentVehicle.value, currentBrand).catch(() =>
        showSnackbar({
          message: 'Erro ao buscar modelos. Tente novamente mais tarde.',
          variant: 'error',
        }),
      )
    }
  }, [currentBrand])

  useEffect(() => {
    setValue('year', DEFAULT_SELECT_VALUE, { shouldValidate: true })
    if (isVehicleSelected && isBrandSelected && isModelSelected) {
      consultStore.clearYears()
      consultStore
        .fetchYears(currentVehicle.value, currentBrand, currentModel)
        .catch(() =>
          showSnackbar({
            message: 'Erro ao buscar anos. Tente novamente mais tarde.',
            variant: 'error',
          }),
        )
    } else {
      consultStore.setYears(null)
    }
  }, [currentModel])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{ boxShadow: 1, p: 4, textAlign: 'left', mt: '1rem' }}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Autocomplete
          defaultValue="Carros"
          options={vehicleOptions.map((option) => option.label)}
          fullWidth
          renderOption={(props, option) => {
            const Icon = vehicleOptions.find(
              (item) => item.label === option,
            )?.icon
            return (
              <Box component="li" {...props}>
                {Icon && <Icon sx={{ mr: 1 }} />}
                {option}
              </Box>
            )
          }}
          disableClearable={true}
          onChange={(event, value) => {
            setValue(
              'vehicle',
              {
                label: value || 'carros',
                value:
                  vehicleOptions.find((option) => option.label === value)
                    ?.value || 'carros',
              } as IVehicleOption,
              {
                shouldValidate: true,
              },
            )
          }}
          renderInput={(params) => (
            <TextField {...params} label="Selecione o tipo" />
          )}
          noOptionsText="Nenhum veículo encontrado"
        />

        <Box position="relative">
          <Controller
            name="brand"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                options={brandList.map((brand) => brand.nome)}
                {...field}
                value={
                  brandList.find((brand) => brand.codigo === field.value)
                    ?.nome || null
                }
                fullWidth
                onChange={(event, value) =>
                  setValue(
                    'brand',
                    brandList.find((brand) => brand.nome === value)?.codigo ||
                      null,
                    { shouldValidate: true },
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label="Selecione a marca" />
                )}
                disabled={!brandList || loadingBrands}
                noOptionsText="Nenhuma marca encontrada"
              />
            )}
          />
          {loadingBrands && (
            <Box
              position="absolute"
              right={40}
              top="50%"
              sx={{ transform: 'translateY(-50%)', height: 20 }}
            >
              <CircularProgress size={20} />
            </Box>
          )}
        </Box>

        <Box position="relative">
          <Controller
            name="model"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                options={models?.modelos?.map((model) => model.nome) || []}
                {...field}
                value={
                  models?.modelos?.find(
                    (model) => String(model.codigo) === field.value,
                  )?.nome || null
                }
                fullWidth
                onChange={(event, value) =>
                  setValue(
                    'model',
                    String(
                      models?.modelos?.find((model) => model.nome === value)
                        ?.codigo,
                    ) || null,
                    { shouldValidate: true },
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      loadingModels
                        ? 'Carregando modelos...'
                        : 'Selecione o modelo'
                    }
                  />
                )}
                disabled={!models || !isBrandSelected}
              />
            )}
          />
          {loadingModels && (
            <Box
              position="absolute"
              right={40}
              top="50%"
              sx={{ transform: 'translateY(-50%)', height: 20 }}
            >
              <CircularProgress size={20} />
            </Box>
          )}
        </Box>

        {isBrandSelected && isModelSelected && years && (
          <Controller
            name="year"
            control={control}
            defaultValue={DEFAULT_SELECT_VALUE}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(e) =>
                  setValue('year', e.target.value, { shouldValidate: true })
                }
                fullWidth
              >
                <MenuItem value={DEFAULT_SELECT_VALUE} disabled>
                  Selecione o ano
                </MenuItem>
                {years.map((item) => (
                  <MenuItem key={item.codigo} value={item.codigo}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        )}

        <Button
          disabled={!isFormValid}
          variant="contained"
          color="primary"
          type="submit"
          sx={{ alignSelf: 'center', px: 6 }}
          startIcon={
            isLoadingButton && <CircularProgress color="inherit" size={20} />
          }
        >
          Consultar preço
          <CheckCircleOutlineOutlinedIcon sx={{ ml: 1 }} fontSize="small" />
        </Button>
      </Box>
    </form>
  )
}

export default observer(FormConsult)

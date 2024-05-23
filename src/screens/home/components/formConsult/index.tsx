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

const DEFAULT_SELECT_VALUE = '0'

interface IFormConsultProps {
  brands: IBrandResponse[]
}

function FormConsult({ brands }: IFormConsultProps) {
  const { showSnackbar } = useSnackbar()

  const router = useRouter()

  const {
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = useForm<FormConsultType>({
    resolver: zodResolver(formConsult),
    mode: 'onChange',
  })

  const [loadingButton, setLoadingButton] = useState<boolean>(false)

  const onSubmit = async (data: FormConsultType) => {
    if (data.brand === 'undefined' || data.model === 'undefined') return

    setLoadingButton(true)
    router.push(`/fipe/${data.brand}/${data.model}/${data.year}`)
  }

  const currentBrand = watch('brand')
  const currentModel = watch('model')
  const isBrandSelected = !!(currentBrand && currentBrand !== 'undefined')
  const isModelSelected = !!(currentModel && currentModel !== 'undefined')

  const { models, years, loadingModels } = consultStore

  useEffect(() => {
    setValue('model', null)
    setValue('year', DEFAULT_SELECT_VALUE)
    if (isBrandSelected) {
      consultStore.clearModels()
      consultStore.clearYears()
      consultStore.fetchModels('carros', currentBrand).catch(() =>
        showSnackbar({
          message: 'Erro ao buscar modelos. Tente novamente mais tarde.',
          variant: 'error',
        }),
      )
    } else {
      consultStore.setModels(null)
    }
  }, [currentBrand])

  useEffect(() => {
    setValue('year', DEFAULT_SELECT_VALUE)
    if (isBrandSelected && isModelSelected) {
      consultStore.clearYears()
      consultStore.fetchYears('carros', currentBrand, currentModel).catch(() =>
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
        <Controller
          name="brand"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              options={brands.map((brand) => brand.nome)}
              {...field}
              value={
                brands.find((brand) => brand.codigo === field.value)?.nome ||
                null
              }
              fullWidth
              onChange={(event, value) =>
                setValue(
                  'brand',
                  brands.find((brand) => brand.nome === value)?.codigo || null,
                  { shouldValidate: true },
                )
              }
              renderInput={(params) => (
                <TextField {...params} label="Selecione a marca" />
              )}
            />
          )}
        />

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
          disabled={!isValid}
          variant="contained"
          color="primary"
          type="submit"
          sx={{ alignSelf: 'center', px: 6 }}
          startIcon={
            loadingButton && <CircularProgress color="inherit" size={20} />
          }
        >
          Consultar preço
        </Button>
      </Box>
    </form>
  )
}

export default observer(FormConsult)

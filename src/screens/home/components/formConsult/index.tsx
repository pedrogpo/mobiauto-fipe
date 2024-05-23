'use client'

import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Control, Controller, useForm } from 'react-hook-form'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormConsultType, formConsult } from '~/core/schemas/fipe/formConsult'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { consultStore } from '~/store/consult'
import { useRouter } from 'next/navigation'
import Toast from '~/core/toast'
import Snackbar from '@mui/material/Snackbar'

const DEFAULT_SELECT_VALUE = '0'

interface IFormConsultProps {
  brands: IBrandResponse[]
}

function FormConsult({ brands }: IFormConsultProps) {
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

  const onSubmit = async (data: FormConsultType) => {
    router.push(`/fipe/${data.brand}/${data.model}/${data.year}`)
  }

  const currentBrand = watch('brand')
  const currentModel = watch('model')
  const isBrandSelected = currentBrand && currentBrand !== 'undefined'
  const isModelSelected = currentModel && currentModel !== 'undefined'

  const modelsList = consultStore.models
  const yearsList = consultStore.years

  useEffect(() => {
    if (isBrandSelected) {
      setValue('model', null)
      setValue('year', DEFAULT_SELECT_VALUE)
      consultStore.fetchModels('carros', currentBrand).catch(() =>
        Toast({
          message: 'Erro ao buscar modelos',
          type: 'error',
        }),
      )
    }
  }, [currentBrand])

  useEffect(() => {
    if (isBrandSelected && isModelSelected) {
      setValue('year', DEFAULT_SELECT_VALUE)
      consultStore.fetchYears('carros', currentBrand, currentModel).catch(() =>
        Toast({
          message: 'Erro ao buscar anos',
          type: 'error',
        }),
      )
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
              } // provide a default value
              fullWidth
              onChange={(event, values) =>
                setValue(
                  'brand',
                  brands.find((brand) => brand.nome === values)?.codigo || null,
                  {
                    shouldValidate: true,
                  },
                )
              }
              renderInput={(params) => (
                <TextField {...params} label="Selecione a marca" />
              )}
            />
          )}
        />

        <Controller
          name="model"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              options={modelsList?.modelos?.map((brand) => brand.nome) || []}
              {...field}
              value={
                modelsList?.modelos?.find(
                  (model) => String(model.codigo) === field.value,
                )?.nome || null
              } // provide a default value
              fullWidth
              onChange={(event, values) => {
                setValue(
                  'model',
                  String(
                    modelsList?.modelos?.find((model) => model.nome === values)
                      ?.codigo,
                  ) || null,
                  {
                    shouldValidate: true,
                  },
                )
              }}
              renderInput={(params) => (
                <TextField {...params} label="Selecione o modelo" />
              )}
              disabled={!modelsList || !isBrandSelected}
            />
          )}
        />

        {isBrandSelected && isModelSelected && yearsList && (
          <Controller
            name="year"
            control={control}
            defaultValue={DEFAULT_SELECT_VALUE}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(e) =>
                  setValue('year', e.target.value, {
                    shouldValidate: true,
                  })
                }
                fullWidth
              >
                <MenuItem value={DEFAULT_SELECT_VALUE} disabled>
                  Selecione o ano
                </MenuItem>
                {yearsList.length > 0 &&
                  yearsList.map((item) => (
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
        >
          Consultar preço
        </Button>
      </Box>
    </form>
  )
}

export default observer(FormConsult)

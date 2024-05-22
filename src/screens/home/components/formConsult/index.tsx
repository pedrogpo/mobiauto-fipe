'use client'

import { Box, Button, MenuItem, Select } from '@mui/material'
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
  const isBrandSelected = currentBrand && currentBrand !== DEFAULT_SELECT_VALUE
  const isModelSelected = currentModel && currentModel !== DEFAULT_SELECT_VALUE

  const modelsList = consultStore.models
  const yearsList = consultStore.years

  useEffect(() => {
    if (isBrandSelected) {
      setValue('model', DEFAULT_SELECT_VALUE)
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
    if (isModelSelected) {
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
          defaultValue={DEFAULT_SELECT_VALUE}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(e) =>
                setValue('brand', String(e.target.value), {
                  shouldValidate: true,
                })
              }
              sx={{ height: 40 }}
              fullWidth
            >
              <MenuItem value={DEFAULT_SELECT_VALUE} disabled>
                Selecione a marca
              </MenuItem>
              {brands.map((item) => (
                <MenuItem key={item.codigo} value={item.codigo}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        <Controller
          name="model"
          control={control}
          defaultValue={DEFAULT_SELECT_VALUE}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(e) =>
                setValue('model', String(e.target.value), {
                  shouldValidate: true,
                })
              }
              disabled={!modelsList || !isBrandSelected}
              sx={{ height: 40 }}
              fullWidth
            >
              <MenuItem value={DEFAULT_SELECT_VALUE} disabled>
                Selecione o modelo
              </MenuItem>
              {consultStore.models?.modelos?.map((item) => (
                <MenuItem key={item.codigo} value={item.codigo}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        {isModelSelected && (
          <Controller
            name="year"
            control={control}
            defaultValue={DEFAULT_SELECT_VALUE}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(e) =>
                  setValue('year', String(e.target.value), {
                    shouldValidate: true,
                  })
                }
                sx={{ height: 40 }}
                fullWidth
              >
                <MenuItem value={DEFAULT_SELECT_VALUE} disabled>
                  Selecione o ano
                </MenuItem>
                {yearsList?.map((item) => (
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

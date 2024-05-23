'use client'

import { Grid, Typography } from '@mui/material'
import { IFipeCalcWithIds } from '~/interfaces/api/fipe/fipeCalc'
import { FipeBox } from './components/fipe-box'
import { FipeDetail } from './components/fipe-detail'
import { FipeValueBox } from './components/fipe-value-box'
import { BackLink } from './components/back-link'
import { observer } from 'mobx-react-lite'
import { lastConsultsStore } from '~/store/lastConsults'
import { useEffect } from 'react'

function FipeScreen(fipeData: IFipeCalcWithIds) {
  const {
    AnoModelo,
    Combustivel,
    Marca,
    Modelo,
    Valor,
    brandId,
    modelId,
    yearId,
  } = fipeData

  useEffect(() => {
    lastConsultsStore.addConsult({
      ...fipeData,
      brandId,
      modelId,
      yearId,
    })
  }, [])

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid
        item
        md={4}
        sx={{ p: 6, boxShadow: 8 }}
        display="flex"
        gap={2}
        flexDirection="column"
        borderRadius={2}
      >
        <FipeBox title="Tabela FIPE" />
        <Typography
          variant="h4"
          fontWeight={900}
          fontStyle="italic"
          component="h1"
        >
          {Marca}
        </Typography>
        <Typography fontSize={20} fontWeight={500} component="p">
          {Modelo}
        </Typography>
        <FipeDetail label="Ano" value={AnoModelo} />
        <FipeDetail label="Combustível" value={Combustivel} />
        <FipeValueBox value={Valor} />
        <BackLink />
      </Grid>
    </Grid>
  )
}

export default observer(FipeScreen)

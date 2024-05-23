import { Box, Container, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { IFipeCalc } from '~/interfaces/api/fipe/fipeCalc'

interface IFipeScreenProps {
  fipe: IFipeCalc
}

export default function FipeScreen({ fipe }: IFipeScreenProps) {
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
        xs={4}
        sx={{ p: 6, boxShadow: 8 }}
        display="flex"
        gap={2}
        flexDirection="column"
        borderRadius={2}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          fontStyle="italic"
          component="h1"
        >
          {fipe.Marca}
        </Typography>
        <Typography fontSize={20} fontWeight={500} component="p">
          {fipe.Modelo}
        </Typography>
        <Typography fontSize={20} fontWeight={700} component="p">
          Ano: {fipe.AnoModelo}
        </Typography>{' '}
        <Typography fontSize={20} fontWeight={700} component="p">
          Combustível: {fipe.Combustivel}
        </Typography>
        <Typography
          fontSize={20}
          fontWeight={700}
          component="p"
          sx={{ p: 2 }}
          bgcolor="#00A38C"
          color="white"
          borderRadius={2}
        >
          Valor: {fipe.Valor}
        </Typography>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography
            fontSize={16}
            fontWeight={700}
            component="p"
            color="#00A38C"
          >
            Consultar outro veículo
          </Typography>
        </Link>
      </Grid>
    </Grid>
  )
}

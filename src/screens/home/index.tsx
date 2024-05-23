import { Grid, Typography } from '@mui/material'
import FormConsult from './components/formConsult'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'

interface IFormConsultProps {
  brands: IBrandResponse[]
}

export default function HomeScreen({ brands }: IFormConsultProps) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item md={4}>
        <Typography variant="h4" fontWeight={900} component="h1">
          Tabela Fipe
        </Typography>
        <Typography fontWeight={800} component="p">
          Consulte o valor de um veículo de forma gratuita
        </Typography>

        <FormConsult brands={brands} />
      </Grid>
    </Grid>
  )
}

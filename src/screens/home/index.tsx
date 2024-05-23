import { Grid, Typography } from '@mui/material'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'
import LastConsults from './components/last-consults'
import FormConsult from './components/form-consult'

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
      my={2}
      px={2}
    >
      <Grid item md={4} sm={8} xs={12}>
        <Typography variant="h4" fontWeight={900} component="h1">
          Tabela Fipe
        </Typography>
        <Typography fontWeight={800} component="p">
          Consulte o valor de um veículo de forma gratuita
        </Typography>

        <FormConsult brands={brands} />

        <LastConsults />
      </Grid>
    </Grid>
  )
}

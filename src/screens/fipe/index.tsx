import { Grid, Typography } from '@mui/material'
import { IFipeCalc } from '~/interfaces/api/fipe/fipeCalc'
import { FipeBox } from './components/FipeBox'
import { FipeDetail } from './components/FipeDetail'
import { FipeValueBox } from './components/FipeValueBox'
import { BackLink } from './components/BackLink'

export default function FipeScreen({
  AnoModelo,
  Combustivel,
  Marca,
  Modelo,
  Valor,
}: IFipeCalc) {
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

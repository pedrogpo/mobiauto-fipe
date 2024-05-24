import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'

interface IErrorScreenProps {
  title: string
  message: string
}

export default function ErrorScreen({ title, message }: IErrorScreenProps) {
  return (
    <Container>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        sx={{ minHeight: '100vh' }}
      >
        <Grid item md={6}>
          <Typography variant="h4" fontWeight={900} component="h1">
            {title}
          </Typography>
          <Typography sx={{ mt: 1 }} fontWeight={500} component="p">
            {message}
          </Typography>
          <Button sx={{ mt: 3 }} variant="contained" color="primary">
            Voltar para a página inicial
          </Button>
        </Grid>
        <Grid item md={6}>
          <Image
            src="/imgs/brokenCar.webp"
            width={630}
            height={268}
            alt="Carro em manutenção"
            style={{ objectFit: 'contain', width: '100%' }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

import { Grid, Typography } from '@mui/material'

interface IErrorScreenProps {
  title: string
  message: string
}

export default function ErrorScreen({ title, message }: IErrorScreenProps) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={4}>
        <Typography variant="h4" fontWeight={900} component="h1">
          {title}
        </Typography>
        <Typography fontWeight={800} component="p">
          {message}
        </Typography>
      </Grid>
    </Grid>
  )
}

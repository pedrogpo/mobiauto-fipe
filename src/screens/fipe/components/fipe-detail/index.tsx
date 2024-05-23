import { Typography } from '@mui/material'

interface FipeDetailProps {
  label: string
  value: string | number
}

export function FipeDetail({ label, value }: FipeDetailProps) {
  return (
    <Typography fontSize={20} fontWeight={700} component="p">
      {label}: {value}
    </Typography>
  )
}

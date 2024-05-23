import Link from 'next/link'
import { Typography } from '@mui/material'

export function BackLink() {
  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <Typography fontSize={16} fontWeight={700} component="p" color="#00A38C">
        Consultar outro veículo
      </Typography>
    </Link>
  )
}

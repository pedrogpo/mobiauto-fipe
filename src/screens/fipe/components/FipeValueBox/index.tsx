import { Box, Typography } from '@mui/material'

interface FipeValueBoxProps {
  value: string
}

export function FipeValueBox({ value }: FipeValueBoxProps) {
  return (
    <Box>
      <Box
        bgcolor="#00A38C"
        borderRadius={4}
        sx={{ width: 'fit-content' }}
        mx="auto"
        px={3}
        py={1}
        mb={1}
      >
        <Typography fontSize={20} fontWeight={700} component="p" color="white">
          {value}
        </Typography>
      </Box>
      <Typography fontSize={14} fontWeight={500} component="p">
        Este é o preço de compra do veículo
      </Typography>
    </Box>
  )
}

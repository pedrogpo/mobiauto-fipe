import { Box, Typography } from '@mui/material'

interface FipeBoxProps {
  title: string
}

export function FipeBox({ title }: FipeBoxProps) {
  return (
    <Box
      bgcolor="#00A38C"
      borderRadius={2}
      sx={{ width: 'fit-content' }}
      mx="auto"
      px={4}
    >
      <Typography fontSize={16} fontWeight={700} component="p" color="white">
        {title}
      </Typography>
    </Box>
  )
}

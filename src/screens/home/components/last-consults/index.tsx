'use client'
import { Box, Button, Grid, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import useClientSideStore from '~/hooks/useClientSideStore'
import { lastConsultsStore } from '~/store/lastConsults'

function LastConsults() {
  const lastConsults = useClientSideStore(lastConsultsStore)

  return (
    <AnimatePresence>
      {lastConsults && lastConsults.list.length > 0 && (
        <Box
          component={motion.div}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ y: 20 }}
          mt={4}
          textAlign="left"
        >
          <Box>
            <Typography variant="h4" fontWeight={900} component="h2">
              Últimas consultas
            </Typography>
            <Typography fontWeight={800} component="p">
              Essas foram suas últimas consultas
            </Typography>
          </Box>
          <Box mt={2}>
            {lastConsults &&
              lastConsults.list.slice(0, 3).map((consult, index) => (
                <Box
                  key={index}
                  bgcolor="#F4F4F4"
                  p={2}
                  mb={2}
                  borderRadius={2}
                  sx={{ boxShadow: 1 }}
                >
                  <Typography fontSize={18} fontWeight={900} component="h3">
                    {consult.Marca}
                    <small>
                      {''} - {consult.Modelo} | {consult.AnoModelo}
                    </small>
                  </Typography>
                  <Typography
                    fontWeight={800}
                    component="p"
                    sx={{ opacity: 0.8 }}
                  >
                    {consult.Valor}
                  </Typography>
                  <Link
                    href={`/fipe/${consult.vehicle}/${consult.brandId}/${consult.modelId}/${consult.yearId}`}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      Ver detalhes
                    </Button>
                  </Link>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}

export default observer(LastConsults)

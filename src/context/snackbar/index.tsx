'use client'
import React, { createContext, useState, ReactNode } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Alert, AlertColor } from '@mui/material'

interface ShowSnackbarProps {
  message: string
  variant: AlertColor
}

interface SnackbarState extends ShowSnackbarProps {
  open: boolean
}

export interface SnackbarContextType {
  showSnackbar: ({
    message,
    variant,
  }: {
    message: string
    variant?: AlertColor
  }) => void
}

export const SnackbarContext = createContext<SnackbarContextType>(
  {} as SnackbarContextType,
)

interface SnackbarProviderProps {
  children: ReactNode
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: '',
    variant: 'error',
  })

  const showSnackbar = ({
    message,
    variant = 'error',
  }: {
    message: string
    variant?: AlertColor
  }) => {
    setSnackbarState({ ...snackbarState, open: true, message, variant })
  }

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false })
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarState.open}
        onClose={handleClose}
        message={snackbarState.message}
        autoHideDuration={3000}
        key={'bottom' + 'right'}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarState.variant as AlertColor}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

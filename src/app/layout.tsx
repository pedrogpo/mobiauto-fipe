import { CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import theme from '~/core/constants/theme'
import { SnackbarProvider } from '~/context/snackbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="icon"
          href="https://www.mobiauto.com.br/icons/favicon-32x32.png"
        />
      </head>
      <body>
        <SnackbarProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}

import 'react-toastify/dist/ReactToastify.css'
import { CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import theme from '~/core/constants/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <ToastContainer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

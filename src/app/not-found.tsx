import ErrorScreen from '~/screens/errors'

export default function Page() {
  return (
    <ErrorScreen
      title="Ops! Página não encontrada"
      message="A página que você está procurando não existe."
    />
  )
}

import ErrorScreen from '~/screens/errors'

export default function NotFound() {
  return (
    <ErrorScreen
      title="Página não encontrada"
      message={'Essa página não existe.'}
    />
  )
}

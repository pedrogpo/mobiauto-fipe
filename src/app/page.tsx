import HomeScreen from '~/screens/home'
import ErrorScreen from '~/screens/errors'
import { getBrands } from '~/actions/fipe/brands'
import { HttpError } from '~/core/http/errors'

export default async function Page() {
  try {
    const brands = await getBrands('carros')

    if (!brands.length)
      throw new HttpError('Nenhuma marca foi encontrada.', 404)

    return <HomeScreen brands={brands} />
  } catch (err) {
    const { message } = err as HttpError | Error

    return (
      <ErrorScreen
        title="Erro ao buscar marcas"
        message={message || 'Algo deu errado. Tente novamente mais tarde'}
      />
    )
  }
}

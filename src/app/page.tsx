import HomeScreen from '~/screens/home'
import ErrorScreen from '~/screens/errors'
import { getBrands } from '~/actions/fipe/brands'
import { HttpError } from '~/core/http/errors'

export default async function Page() {
  try {
    const brands = await getBrands('carros')

    return <HomeScreen brands={brands} />
  } catch (err) {
    return (
      <ErrorScreen
        title="Erro ao buscar marcas"
        message={(err as HttpError).message}
      />
    )
  }
}

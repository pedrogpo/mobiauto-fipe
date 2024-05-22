import HomeScreen from '~/screens/home'
import { getBrands } from '~/actions/fipe/brands'
import ErrorsScreen from '~/screens/errors'
import { HttpError } from '~/core/http/errors'

export default async function Page() {
  try {
    const brands = await getBrands('carros')

    return <HomeScreen brands={brands} />
  } catch (err) {
    return (
      <ErrorsScreen
        title="Erro ao buscar marcas"
        message={(err as HttpError).message}
      />
    )
  }
}

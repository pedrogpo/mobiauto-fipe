import { fipeCalc } from '~/actions/fipe/fipeCalc'
import { HttpError } from '~/core/http/errors'
import ErrorScreen from '~/screens/errors'
import FipeScreen from '~/screens/fipe'

interface IFipeProps {
  brandId: string
  model: string
  year: string
}

export default async function Page({
  params: { brandId, model, year },
}: {
  params: IFipeProps
}) {
  try {
    const fipeData = await fipeCalc('carros', brandId, model, year)

    return <FipeScreen {...fipeData} />
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

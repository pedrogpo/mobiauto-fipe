import { fipeCalc } from '~/actions/fipe/fipeCalc'
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
  const fipeData = await fipeCalc('carros', brandId, model, year)

  return <FipeScreen {...fipeData} />
}

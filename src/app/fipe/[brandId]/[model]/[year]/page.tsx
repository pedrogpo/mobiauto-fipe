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
  const fipe = await fipeCalc('carros', brandId, model, year)

  return <FipeScreen fipe={fipe} />
}

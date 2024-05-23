'use server'
import { fetchGet } from '~/core/http/api'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import { IFipeCalc } from '~/interfaces/api/fipe/fipeCalc'

export const fipeCalc = async (
  vehicleType: vehicleTypes,
  brandId: string,
  modelId: string,
  yearId: string,
) => {
  const item = await fetchGet<IFipeCalc>(
    `/${vehicleType.toLowerCase()}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`,
    {
      next: {
        revalidate: 15,
      },
    },
  )

  return item
}

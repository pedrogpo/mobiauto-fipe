'use server'
import { fetchGet } from '~/core/http/api'
import { HttpError } from '~/core/http/errors'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import { IFipeCalc } from '~/interfaces/api/fipe/fipeCalc'

export const fipeCalc = async (
  vehicleType: vehicleTypes,
  brandId: string,
  modeloId: string,
  year: string,
) => {
  const item = await fetchGet<IFipeCalc>(
    `/${vehicleType}/marcas/${brandId}/modelos/${modeloId}/anos/${year}`,
    {
      next: {
        revalidate: 15,
      },
    },
  )

  return item
}

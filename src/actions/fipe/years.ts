'use server'
import { fetchGet } from '~/core/http/api'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import { IYearsResponse } from '~/interfaces/api/fipe/years'

export const getYears = async (
  vehicleType: vehicleTypes,
  brandId: string,
  modelId: string,
) => {
  const item = await fetchGet<IYearsResponse[]>(
    `/${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos`,
  )

  return item
}

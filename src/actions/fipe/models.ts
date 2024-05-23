'use server'
import { fetchGet } from '~/core/http/api'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import { IModelsResponse } from '~/interfaces/api/fipe/models'

export const getModels = async (vehicleType: vehicleTypes, brandId: string) => {
  const item = await fetchGet<IModelsResponse>(
    `/${vehicleType.toLowerCase()}/marcas/${brandId}/modelos`,
  )

  return item
}

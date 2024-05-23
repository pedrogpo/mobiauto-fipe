'use server'
import { fetchGet } from '~/core/http/api'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'

export const getBrands = async (vehicleType: vehicleTypes) => {
  const item = await fetchGet<IBrandResponse[]>(
    `/${vehicleType.toLowerCase()}/marcas`,
    {
      cache: 'force-cache',
    },
  )

  return item
}

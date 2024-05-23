'use server'
import { fetchGet } from '~/core/http/api'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'

type vehicleTypes = 'carros' | 'motos' | 'caminhoes'

export const getBrands = async (vehicleType: vehicleTypes) => {
  const item = await fetchGet<IBrandResponse[]>(`/${vehicleType}/marcas`, {
    cache: 'force-cache',
  })

  return item
}

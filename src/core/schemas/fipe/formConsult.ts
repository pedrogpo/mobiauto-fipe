import * as z from 'zod'
import { IVehicleOption, vehicleOptions } from '~/core/utils/types/vehicles'

export const formConsult = z.object({
  vehicle: z.custom<IVehicleOption>().default(vehicleOptions[0]),
  brand: z
    .string()
    .refine((data) => data !== null && data !== 'undefined', {
      message: 'Selecione uma marca',
    })
    .nullable(),
  model: z
    .string()
    .refine((data) => data !== null && data !== 'undefined', {
      message: 'Selecione um ano',
    })
    .nullable(),
  year: z.string().refine((data) => data !== '0', {
    message: 'Selecione um ano',
  }),
})

export type FormConsultType = z.infer<typeof formConsult>

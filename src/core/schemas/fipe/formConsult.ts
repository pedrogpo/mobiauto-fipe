import * as z from 'zod'

export const formConsult = z.object({
  // consider that brand will bring a string with the brand number, so it needs to be greater than 0
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

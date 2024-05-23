import * as z from 'zod'

export const formConsult = z.object({
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

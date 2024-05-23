export type vehicleTypes = 'carros' | 'motos' | 'caminhoes'

export interface IVehicleOption {
  value: vehicleTypes
  label: string
}

export const vehicleOptions: IVehicleOption[] = [
  {
    value: 'carros',
    label: 'Carros',
  },
  {
    value: 'motos',
    label: 'Motos',
  },
  {
    value: 'caminhoes',
    label: 'Caminhões',
  },
]

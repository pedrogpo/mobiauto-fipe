import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined'
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'

export type vehicleTypes = 'carros' | 'motos' | 'caminhoes'

export interface IVehicleOption {
  value: vehicleTypes
  label: string
  icon?: React.ElementType
}

export const vehicleOptions: readonly IVehicleOption[] = [
  {
    value: 'carros',
    label: 'Carros',
    icon: DirectionsCarFilledOutlinedIcon,
  },
  {
    value: 'motos',
    label: 'Motos',
    icon: TwoWheelerOutlinedIcon,
  },
  {
    value: 'caminhoes',
    label: 'Caminhões',
    icon: LocalShippingOutlinedIcon,
  },
]

import { Metadata, ResolvingMetadata } from 'next'
import { fipeCalc } from '~/actions/fipe/fipeCalc'
import { HttpError } from '~/core/http/errors'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import ErrorScreen from '~/screens/errors'
import FipeScreen from '~/screens/fipe'

export interface IFipeProps {
  vehicle: vehicleTypes
  brandId: string
  modelId: string
  yearId: string
}

export async function generateMetadata({
  params: { vehicle, brandId, modelId, yearId },
}: {
  params: IFipeProps
}): Promise<Metadata> {
  try {
    const fipeData = await fipeCalc(vehicle, brandId, modelId, yearId)

    return {
      title: `${fipeData.Marca} - ${fipeData.Modelo} | ${fipeData.AnoModelo}`,
    }
  } catch (err) {
    return {
      title: 'Consulta Fipe',
    }
  }
}

export default async function Page({
  params: { vehicle, brandId, modelId, yearId },
}: {
  params: IFipeProps
}) {
  try {
    // ** adendo: não está chamando 2x a API, pois o Next.js vai fazer o cache da primeira chamada (datafetching)
    const fipeData = await fipeCalc(vehicle, brandId, modelId, yearId)

    return (
      <FipeScreen
        {...fipeData}
        brandId={brandId}
        modelId={modelId}
        yearId={yearId}
        vehicle={vehicle}
      />
    )
  } catch (err) {
    return (
      <ErrorScreen
        title="Ops! Algo deu errado"
        message={
          'Atualmente, é provável que este veículo não tenha informações disponíveis na Tabela Fipe.'
        }
      />
    )
  }
}

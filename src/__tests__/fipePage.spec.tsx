import { findByLabelText, render } from '@testing-library/react'
import Page from '../app/fipe/[brandId]/[model]/[year]/page'
import { HttpError } from '~/core/http/errors'
import { IFipeCalc } from '~/interfaces/api/fipe/fipeCalc'

jest.mock('~/actions/fipe/fipeCalc', () => ({
  fipeCalc: jest.fn(),
}))

const mockParams = {
  params: {
    brandId: '1',
    model: 'A3',
    year: '2003',
  },
}

describe('FormConsult component', () => {
  it('renders without crashing', async () => {
    const ERR_MESSAGE = 'Something went wrong'

    const { fipeCalc } = require('~/actions/fipe/fipeCalc')

    fipeCalc.mockImplementation(() => {
      throw new Error(ERR_MESSAGE)
    })

    render(await Page(mockParams))
  })

  it('renders ErrorScreen when fipeCalc fails with any error', async () => {
    const ERR_MESSAGE = 'Something went wrong'

    const { fipeCalc } = require('~/actions/fipe/fipeCalc')
    fipeCalc.mockImplementation(() => {
      throw new Error(ERR_MESSAGE)
    })

    const { findByText } = render(await Page(mockParams))

    expect(await findByText('Erro ao buscar marcas')).toBeInTheDocument()
    expect(await findByText(ERR_MESSAGE)).toBeInTheDocument()
  })

  it('renders ErrorScreen when fipeCalc fails with HttpError with correct error message', async () => {
    const ERR_MESSAGE = 'Nenhuma marca foi encontrada.'

    const { fipeCalc } = require('~/actions/fipe/fipeCalc')
    fipeCalc.mockImplementation(() => {
      throw new HttpError(ERR_MESSAGE, 404)
    })

    const { findByText } = render(await Page(mockParams))

    expect(await findByText('Erro ao buscar marcas')).toBeInTheDocument()
    expect(await findByText(ERR_MESSAGE)).toBeInTheDocument()
  })

  it('renders FipeScreen when fipeCalc returns data', async () => {
    const fipeData: IFipeCalc = {
      TipoVeiculo: 1,
      Valor: 'R$ 104.933,00',
      Marca: 'VW - VolksWagen',
      Modelo: 'AMAROK High.CD 2.0 16V TDI 4x4 Dies. Aut',
      AnoModelo: 2014,
      Combustivel: 'Diesel',
      CodigoFipe: '005340-6',
      MesReferencia: 'maio de 2024',
      SiglaCombustivel: 'D',
    }

    const { fipeCalc } = require('~/actions/fipe/fipeCalc')
    fipeCalc.mockImplementation(() => fipeData)

    const { findByText } = render(await Page(mockParams))

    expect(await findByText(fipeData.Marca)).toBeInTheDocument()
    expect(await findByText(fipeData.Modelo)).toBeInTheDocument()
    expect(await findByText(fipeData.Valor)).toBeInTheDocument()
  })
})

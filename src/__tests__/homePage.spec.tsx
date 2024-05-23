import { findByLabelText, render } from '@testing-library/react'
import Page from '../app/page'
import { HttpError } from '~/core/http/errors'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: jest.fn(),
    }
  },
}))

jest.mock('~/hooks/useSnackbarContext', () => ({
  useSnackbar: jest.fn(() => ({ showSnackbar: jest.fn() })),
}))

jest.mock('~/actions/fipe/brands', () => ({
  getBrands: jest.fn(),
}))

describe('FormConsult component', () => {
  it('renders without crashing', async () => {
    const ERR_MESSAGE = 'Something went wrong'

    const { getBrands } = require('~/actions/fipe/brands')

    getBrands.mockImplementation(() => {
      throw new Error(ERR_MESSAGE)
    })

    render(await Page())
  })

  it('renders ErrorScreen when getBrands fails with any error', async () => {
    const ERR_MESSAGE = 'Something went wrong'

    const { getBrands } = require('~/actions/fipe/brands')
    getBrands.mockImplementation(() => {
      throw new Error(ERR_MESSAGE)
    })

    const { findByText } = render(await Page())

    expect(await findByText('Erro ao buscar marcas')).toBeInTheDocument()
    expect(await findByText(ERR_MESSAGE)).toBeInTheDocument()
  })

  it('renders ErrorScreen when getBrands fails with HttpError with correct error message', async () => {
    const ERR_MESSAGE = 'Nenhuma marca foi encontrada.'

    const { getBrands } = require('~/actions/fipe/brands')
    getBrands.mockImplementation(() => {
      throw new HttpError(ERR_MESSAGE, 404)
    })

    const { findByText } = render(await Page())

    expect(await findByText('Erro ao buscar marcas')).toBeInTheDocument()
    expect(await findByText(ERR_MESSAGE)).toBeInTheDocument()
  })

  it('render ErrorScreen when getBrands returns an empty array', async () => {
    const { getBrands } = require('~/actions/fipe/brands')
    getBrands.mockImplementation(async () => [])

    const { findByText } = render(await Page())

    expect(await findByText('Erro ao buscar marcas')).toBeInTheDocument()
    expect(
      await findByText('Nenhuma marca foi encontrada.'),
    ).toBeInTheDocument()
  })

  it('render HomeScreen when getBrands returns successfully', async () => {
    const brandsMock: IBrandResponse[] = [
      { codigo: '1', nome: 'Acura' },
      { codigo: '2', nome: 'Agrale' },
    ]

    const { getBrands } = require('~/actions/fipe/brands')
    getBrands.mockImplementation(async () => brandsMock)

    const { findByText } = render(await Page())

    expect(await findByText('Tabela Fipe')).toBeInTheDocument()
  })

  it('should call getBrands', async () => {
    const { getBrands } = require('~/actions/fipe/brands')
    getBrands.mockImplementation(async () => [])

    await Page()

    expect(getBrands).toHaveBeenCalled()
  })
})

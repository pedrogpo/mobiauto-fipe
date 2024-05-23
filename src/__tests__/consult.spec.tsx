import { IModelsResponse } from '~/interfaces/api/fipe/models'
import { ConsultStore } from '../store/consult'
import { IYearsResponse } from '~/interfaces/api/fipe/years'
import { vehicleTypes } from '~/core/utils/types/vehicles'

jest.mock('~/actions/fipe/models', () => ({
  getModels: jest.fn(),
}))

jest.mock('~/actions/fipe/years', () => ({
  getYears: jest.fn(),
}))

const mockModelsResponse: IModelsResponse = {
  anos: [
    { codigo: '2020', nome: '2020' },
    { codigo: '2021', nome: '2021' },
  ],
  modelos: [
    { codigo: 1, nome: 'Modelo 1' },
    { codigo: 2, nome: 'Modelo 2' },
  ],
}

const mockYearsResponse: IYearsResponse[] = [
  { codigo: '2020', nome: '2020' },
  { codigo: '2021', nome: '2021' },
]

describe('Consult store', () => {
  let store: ConsultStore

  beforeEach(() => {
    store = new ConsultStore()
  })

  test('initializes with default values', () => {
    expect(store.models).toBeNull()
    expect(store.years).toBeNull()
    expect(store.loadingModels).toBe(false)
    expect(store.loadingYears).toBe(false)
  })

  test('fetchModels sets loadingModels to true and updates models', async () => {
    const { getModels } = require('~/actions/fipe/models')
    getModels.mockImplementation(async () => mockModelsResponse)

    const vehicleType: vehicleTypes = 'carros'
    const brand = 'BrandX'

    const fetchPromise = store.fetchModels(vehicleType, brand)

    expect(store.loadingModels).toBe(true)

    await fetchPromise

    expect(store.models).toEqual(mockModelsResponse)
    expect(store.loadingModels).toBe(false)
  })

  test('fetchYears sets loadingYears to true and updates years', async () => {
    const { getYears } = require('~/actions/fipe/years')
    getYears.mockImplementation(async () => mockYearsResponse)

    const vehicleType: vehicleTypes = 'carros'
    const brand = 'BrandX'
    const model = 'ModelX'

    const fetchPromise = store.fetchYears(vehicleType, brand, model)

    expect(store.loadingYears).toBe(true)

    await fetchPromise

    expect(store.years).toEqual(mockYearsResponse)
    expect(store.loadingYears).toBe(false)
  })

  test('clearModels sets models to null', () => {
    store.models = mockModelsResponse

    store.clearModels()

    expect(store.models).toBeNull()
  })

  test('clearYears sets years to null', () => {
    store.years = mockYearsResponse

    store.clearYears()

    expect(store.years).toBeNull()
  })

  test('setYears updates the years', () => {
    store.setYears(mockYearsResponse)

    expect(store.years).toEqual(mockYearsResponse)
  })

  test('setModels updates the models', () => {
    store.setModels(mockModelsResponse)

    expect(store.models).toEqual(mockModelsResponse)
  })
})

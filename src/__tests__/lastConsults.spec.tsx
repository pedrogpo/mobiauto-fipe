import { IFipeCalcWithIds } from '~/interfaces/api/fipe/fipeCalc'
import { LastConsultsStore } from '../store/lastConsults'

jest.mock('localforage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(null),
  clear: jest.fn().mockResolvedValue(null),
}))

jest.mock('mobx-persist-store', () => ({
  stopPersisting: jest.fn().mockResolvedValue(null),
  clearPersistedStore: jest.fn().mockResolvedValue(null),
  isHydrated: jest.fn().mockResolvedValue(null),
  isPersisting: jest.fn().mockResolvedValue(null),
  makePersistable: jest.fn().mockResolvedValue(null),
}))

const fipeDataMock: IFipeCalcWithIds = {
  TipoVeiculo: 1,
  Valor: 'R$ 489.506,00',
  Marca: 'ASTON MARTIN',
  Modelo: 'Vantage 6.0 V12 510cv',
  AnoModelo: 2012,
  Combustivel: 'Gasolina',
  CodigoFipe: '085004-7',
  MesReferencia: 'maio de 2024',
  SiglaCombustivel: 'G',
  brandId: '189',
  modelId: '6342',
  yearId: '2012-1',
}

const secondFipeDataMock: IFipeCalcWithIds = {
  TipoVeiculo: 1,
  Valor: 'R$ 29.077,00',
  Marca: 'BMW',
  Modelo: '318i Cabrio 1.8 16V',
  AnoModelo: 1995,
  Combustivel: 'Gasolina',
  CodigoFipe: '009062-0',
  MesReferencia: 'maio de 2024',
  SiglaCombustivel: 'G',
  brandId: '7',
  modelId: '155',
  yearId: '1995-1',
}

describe('LastConsults store', () => {
  let store: LastConsultsStore

  beforeEach(() => {
    store = new LastConsultsStore()
  })

  test('initializes with an empty list', () => {
    expect(store.list).toEqual([])
  })

  test('add a consult', () => {
    store.addConsult(fipeDataMock)
    expect(store.list).toContainEqual(fipeDataMock)
  })

  test('does not add a consult with duplicated item', () => {
    store.addConsult(fipeDataMock)
    store.addConsult(fipeDataMock)
    expect(store.list).toHaveLength(1)
  })

  test('removes a consult by index', () => {
    store.addConsult(fipeDataMock)
    store.addConsult(secondFipeDataMock)
    store.removeConsult(0)
    expect(store.list).not.toContainEqual(fipeDataMock)
    expect(store.list).toContainEqual(secondFipeDataMock)
  })

  test('clears the list', () => {
    store.addConsult(fipeDataMock)
    store.clearList()
    expect(store.list).toEqual([])
  })

  test('gets a consult by index', () => {
    store.addConsult(fipeDataMock)
    expect(store.getConsult(0)).toEqual(fipeDataMock)
  })

  test('gets all consults', () => {
    store.addConsult(fipeDataMock)
    store.addConsult(secondFipeDataMock)
    expect(store.getConsults()).toEqual([fipeDataMock, secondFipeDataMock])
  })

  test('clearPersistedData clears the persisted data and stops persisting', async () => {
    await store.clearPersistedData()
    const { clear } = require('localforage')
    const {
      stopPersisting,
      clearPersistedStore,
    } = require('mobx-persist-store')

    expect(clear).toHaveBeenCalled()
    expect(stopPersisting).toHaveBeenCalledWith(store)
    expect(clearPersistedStore).toHaveBeenCalledWith(store)
  })

  test('isHydrated returns correct value', () => {
    const { isHydrated } = require('mobx-persist-store')
    expect(store.isHydrated).toStrictEqual(isHydrated(store))
  })

  test('isPersisting returns correct value', () => {
    const { isPersisting } = require('mobx-persist-store')
    expect(store.isPersisting).toStrictEqual(isPersisting(store))
  })
})

import { makeAutoObservable } from 'mobx'
import { IFipeCalc, IFipeCalcWithIds } from '~/interfaces/api/fipe/fipeCalc'
import {
  makePersistable,
  isHydrated,
  isPersisting,
  stopPersisting,
  clearPersistedStore,
} from 'mobx-persist-store'
import localForage from 'localforage'
import { enableStaticRendering } from 'mobx-react-lite'

const isServer = typeof window === 'undefined'
enableStaticRendering(isServer)

export class LastConsultsStore {
  list: IFipeCalcWithIds[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })

    if (!isServer)
      makePersistable(this, {
        name: 'lastConsults',
        properties: ['list'],
        storage: localForage,
      })
  }

  clearPersistedData() {
    localForage.clear()
    stopPersisting(this)
    return clearPersistedStore(this)
  }

  get isHydrated() {
    return isHydrated(this)
  }

  get isPersisting() {
    return isPersisting(this)
  }

  addConsult(consult: IFipeCalcWithIds) {
    if (this.list.some((item) => item.CodigoFipe === consult.CodigoFipe)) {
      return
    }

    this.list.unshift(consult)
  }

  removeConsult(index: number) {
    this.list.splice(index, 1)
  }

  clearList() {
    this.list = []
  }

  getConsult(index: number) {
    return this.list[index]
  }

  getConsults() {
    return this.list
  }
}

export const lastConsultsStore = new LastConsultsStore()

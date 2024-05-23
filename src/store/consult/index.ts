// stores/consultStore.ts
import { makeAutoObservable } from 'mobx'
import { getModels } from '~/actions/fipe/models'
import { getYears } from '~/actions/fipe/years'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import { IModelsResponse } from '~/interfaces/api/fipe/models'
import { IYearsResponse } from '~/interfaces/api/fipe/years'

class ConsultStore {
  models: IModelsResponse | null = null
  years: IYearsResponse[] | null = null

  loadingModels = false
  loadingYears = false

  constructor() {
    makeAutoObservable(this)
  }

  async fetchModels(vehicleType: vehicleTypes, brand: string) {
    this.loadingModels = true
    this.models = null
    this.years = null
    this.models = await getModels(vehicleType, brand).finally(() => {
      this.loadingModels = false
    })
  }

  async fetchYears(vehicleType: vehicleTypes, brand: string, model: string) {
    this.loadingYears = true
    this.years = null
    this.years = await getYears(vehicleType, brand, model).finally(() => {
      this.loadingYears = false
    })
  }

  setYears(years: IYearsResponse[] | null) {
    this.years = years
  }

  setModels(models: IModelsResponse | null) {
    this.models = models
  }
}

export const consultStore = new ConsultStore()

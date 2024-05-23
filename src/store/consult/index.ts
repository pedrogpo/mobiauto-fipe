import { makeAutoObservable } from 'mobx'
import { getBrands } from '~/actions/fipe/brands'
import { getModels } from '~/actions/fipe/models'
import { getYears } from '~/actions/fipe/years'
import { vehicleTypes } from '~/core/utils/types/vehicles'
import { IBrandResponse } from '~/interfaces/api/fipe/brands'
import { IModelsResponse } from '~/interfaces/api/fipe/models'
import { IYearsResponse } from '~/interfaces/api/fipe/years'

export class ConsultStore {
  brands: IBrandResponse[] | null = null
  models: IModelsResponse | null = null
  years: IYearsResponse[] | null = null

  loadingBrands = false
  loadingModels = false
  loadingYears = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async fetchBrands(vehicleType: vehicleTypes) {
    this.loadingBrands = true
    this.brands = await getBrands(vehicleType).finally(() => {
      this.loadingBrands = false
    })
  }

  async fetchModels(vehicleType: vehicleTypes, brand: string) {
    this.loadingModels = true
    this.models = await getModels(vehicleType, brand).finally(() => {
      this.loadingModels = false
    })
  }

  async fetchYears(vehicleType: vehicleTypes, brand: string, model: string) {
    this.loadingYears = true
    this.years = await getYears(vehicleType, brand, model).finally(() => {
      this.loadingYears = false
    })
  }

  clearBrands() {
    this.brands = null
  }

  clearModels() {
    this.models = null
  }

  clearYears() {
    this.years = null
  }

  setYears(years: IYearsResponse[] | null) {
    this.years = years
  }

  setModels(models: IModelsResponse | null) {
    this.models = models
  }
}

export const consultStore = new ConsultStore()

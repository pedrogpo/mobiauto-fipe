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
    this.setLoadingBrands(true)
    this.setBrands(
      await getBrands(vehicleType).finally(() => {
        this.setLoadingBrands(false)
      }),
    )
  }

  async fetchModels(vehicleType: vehicleTypes, brand: string) {
    this.setLoadingModels(true)
    this.setModels(
      await getModels(vehicleType, brand).finally(() => {
        this.setLoadingModels(false)
      }),
    )
  }

  async fetchYears(vehicleType: vehicleTypes, brand: string, model: string) {
    this.setLoadingYears(true)
    this.setYears(
      await getYears(vehicleType, brand, model).finally(() => {
        this.setLoadingYears(false)
      }),
    )
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

  setBrands(brands: IBrandResponse[] | null) {
    this.brands = brands
  }

  setYears(years: IYearsResponse[] | null) {
    this.years = years
  }

  setModels(models: IModelsResponse | null) {
    this.models = models
  }

  setLoadingBrands(loading: boolean) {
    this.loadingBrands = loading
  }

  setLoadingModels(loading: boolean) {
    this.loadingModels = loading
  }

  setLoadingYears(loading: boolean) {
    this.loadingYears = loading
  }
}

export const consultStore = new ConsultStore()

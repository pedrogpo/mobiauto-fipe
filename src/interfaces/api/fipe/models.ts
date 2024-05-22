export interface Model {
  codigo: number
  nome: string
}

export interface Year {
  codigo: string
  nome: string
}

export interface IModelsResponse {
  modelos: Model[]
  anos: Year[]
}

export interface IFipeCalc {
  TipoVeiculo: number
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  CodigoFipe: string
  MesReferencia: string
  SiglaCombustivel: string
}

export interface IFipeCalcWithIds extends IFipeCalc {
  brandId: string
  modelId: string
  yearId: string
}

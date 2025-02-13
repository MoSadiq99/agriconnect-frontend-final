export class PredictionResult {
  constructor(
    public month: number,
    public year: number,
    public exchangeRate: number,
    public fuelPrice: number,
    public predictedRetailPrice: number,
    public predictedProducerPrice: number,
  ) {}
}

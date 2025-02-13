export class Cultivation {
  id: number | null;  // Optional, for existing cultivations
  cropType: string = '';
  cultivationDate: Date | null;
  harvestDate: Date | null;
  location: string = '';
  landSize: string = '';
  expectedYield: string = '';
  methodOfCultivation: string = '';
  description: string = '';
}

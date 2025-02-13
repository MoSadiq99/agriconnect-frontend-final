export class Listing {
  id: string | null;
  cropType: string;
  quantity: number;
  price: number;
  unit: string; // e.g., 'kg', 'ton'
  harvestDate: Date | null;
  location: string;
  description: string;
  status: 'Pending' | 'Active' | 'Sold' | 'Expired';
  farmerId: string;

  constructor(init?: Partial<Listing>) {
    this.id = null;
    this.cropType = '';
    this.quantity = 0;
    this.price = 0;
    this.unit = 'kg';
    this.harvestDate = null;
    this.location = '';
    this.description = '';
    this.status = 'Pending';

    Object.assign(this, init);
  }
}

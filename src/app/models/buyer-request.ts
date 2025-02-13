import { User } from "./user";

export class BuyerRequest {
  id: number;
  buyer: User; // Assuming you have a User model
  cropType: string;
  quantity: number;
  quantityType: string;
  location: string;
  startDate: Date;
  deadline: Date;
  status: string;
  requestType: RequestType;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(init?: Partial<BuyerRequest>) {
    this.id = 0;
    this.cropType = '';
    this.quantity = 0;
    this.location = '';
    this.startDate = new Date();
    this.deadline = new Date();
    this.status = '';
    this.requestType = RequestType.ONE_TIME;
    this.description = '';

    Object.assign(this, init);
  }
}

export enum RequestType {
  DAILY_AVERAGE = 'DAILY_AVERAGE',
  ONE_TIME = 'ONE_TIME',
  WEEKLY_AVERAGE = 'WEEKLY_AVERAGE',
  MONTHLY_AVERAGE = 'MONTHLY_AVERAGE',
  URGENT = 'URGENT'
}


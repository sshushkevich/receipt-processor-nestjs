export interface Receipt {
  retailer: string;
  purchaseDate: Date;
  purchaseTime: string;
  total: number;
  items: { shortDescription: string; price: number }[];
}

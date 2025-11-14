export type OrderType = "IN_PERSON" | "DELIVERY";

export enum PaymentMethod {
  PIX = "PIX",
  MONEY = "MONEY",
  CREDIT = "CREDIT"
}

export enum OrderStatus {
  CREATED = "CREATED",
  PAID = "PAID",
  STARTED = "STARTED",
  DONE = "DONE",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
}

// TODO: AGRUPAR DADOS RELACIONADOS
export interface OrderState {
  addressText: string | null;
  partnerName: string | null;
  price: number;
  addressId: string | null;
  realizationAt: string | null;
  serviceId: string | null;
  serviceName: string | null;
  partnerId: string | null;
  type: OrderType | null;
  paymentMethod: PaymentMethod;
}


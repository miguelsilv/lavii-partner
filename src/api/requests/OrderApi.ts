import { IHttpClient } from "../IHttpClient";
import { OrderStatus, OrderType, PaymentMethod } from "@/types/order";

export interface ICreateOrderRequest {
  serviceId: string;
  addressId: string;
  realizationAt: string;
  partnerId: string;
  type: OrderType;
  paymentMethod?: PaymentMethod;
}

export interface IPaymentResponse {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: string;
  provider: string;
  externalId: string;
  expiresAt: string;
  metadata: {
    qrCodeImage: string;
    copyAndPaste: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentStatusResponse {
  paid: boolean;
  status: "CREATED" | "PAID" | "CANCELED" | "DONE";
}

export interface IOrderSummaryResponse {
  id: string;
  service: IServiceResponse;
  realizationAt: string;
  address: IOrderAddressResponse;
  payment: IPaymentResponse;
  price: number;
}

export interface IOrderAddressResponse {
  id: string;
  text: string;
  latitude: number;
  longitude: number;
}

export interface IServiceResponse {
  id: string;
  name: string;
}


export class OrderApi {
  constructor(private http: IHttpClient) { }

  getPaymentStatus(orderId: string) {
    return this.http.get<IPaymentStatusResponse>(`/v1/order/${orderId}/payment-status`);
  }

  summary(orderId: string) {
    return this.http.get<IOrderSummaryResponse>(`/v1/order/${orderId}/summary`);
  }

  reject(orderId: string) {
    return this.http.put<void>(`/v1/order/${orderId}/reject`, {});
  }
}


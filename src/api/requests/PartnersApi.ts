import { IHttpClient } from "../IHttpClient";

export interface IUpdatePartnerRequest {
  email: string;
  phone: string;
  personal: {
    name: string;
    birthday: string;
    cpf: string;
  };
}

export interface IUpdatePartnerResponse {
  id: string;
  email: string;
  phone: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  partner: {
    id: string;
    name: string;
    photo: string;
    cpf: string;
    birthday: string;
  };
}

export class PartnersApi {
  constructor(private http: IHttpClient) {}

  updateMe(data: IUpdatePartnerRequest) {
    return this.http.patch<IUpdatePartnerResponse>("/v1/partners/me", data);
  }
}


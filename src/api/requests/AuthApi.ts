import { IHttpClient } from "../IHttpClient";

interface IPartner {
  id: string;
  name: string;
  photo: string;
  cpf: string;
  birthday: string;
}

export interface IPartnerGetLoggedResponse {
  id: string;
  email: string;
  phone: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  partner: IPartner;
}

export interface IPartnerRegisterRequest {
  email: string;
  phone: string;
  password: string;
  personal: { name: string; photo?: string; cpf: string };
}

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export class AuthApi {
  constructor(private http: IHttpClient) { }

  signIn(email: string, password: string) {
    return this.http.post<{ token: string }>("/v1/auth/login", {
      email,
      password,
    });
  }

  async signUp(data: IPartnerRegisterRequest) {
    const response = await this.http.post<{ token: string }>(
      "/v1/auth/register/partner",
      data
    );
    return response;
  }

  getLogged(token: string) {
    return this.http.get<IPartnerGetLoggedResponse>("/v1/auth/me", {
      Authorization: `Bearer ${token}`,
    });
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post("/v1/auth/change-password", {
      currentPassword,
      newPassword,
    });
  }

  forgotPassword(email: string) {
    return this.http.post<{ message: string }>("/v1/auth/forgot-password", {
      email,
    });
  }

  resetPassword(email: string, code: string, password: string) {
    return this.http.post<{ message: string }>("/v1/auth/reset-password", {
      email,
      code,
      password,
    });
  }
}

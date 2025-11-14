import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { AS_KEY_TOKEN } from "@/constants/async-storage-keys.consts";
import { useApiNoAuthResource } from "@/hooks/useApiNoAuthResource";
import { useAuthUser } from "@/hooks/useAuthUser";
import { IPartnerRegisterRequest } from "@/api/requests/AuthApi";

interface IPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthday: string;
}

interface AuthData {
  token: string;
  partner?: IPartner;
}

interface AuthContextData {
  data: AuthData | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: IPartnerRegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);

  const { authApi } = useApiNoAuthResource();
  const queryClient = useQueryClient();

  const { data: userData, isLoading, isError, error } = useAuthUser(token, !!token);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(AS_KEY_TOKEN);
    queryClient.removeQueries({ queryKey: ['auth', 'me'] });
    setToken(null);
    setData(null);
  }, [queryClient]);

  useEffect(() => {
    async function loadToken() {
      const storedToken = await AsyncStorage.getItem(AS_KEY_TOKEN);
      setToken(storedToken);
      setLoading(false);
    }
    loadToken();
  }, []);

  useEffect(() => {
    if (userData && token) {
      setData({
        token,
        partner: {
          id: userData.partner.id,
          name: userData.partner.name,
          email: userData.email,
          phone: userData.phone,
          cpf: userData.partner.cpf,
          birthday: userData.partner.birthday,
        },
      });
    }
  }, [userData, token]);

  useEffect(() => {
    if (isError && token) {
      console.log("Token inválido ou expirado", error);
      signOut();
    }
  }, [isError, token, error, signOut]);

  async function signIn(email: string, password: string): Promise<void> {
    setLoading(true);
    const response = await authApi.signIn(email, password);
    const newToken = response.data!.token;

    await AsyncStorage.setItem(AS_KEY_TOKEN, newToken);
    setToken(newToken);
    setLoading(false);
  }

  async function signUp(registerData: IPartnerRegisterRequest) {
    setLoading(true);
    const response = await authApi.signUp(registerData);
    if (response.error) {
      throw response.error;
    }
    const newToken = response.data!.token;

    await AsyncStorage.setItem(AS_KEY_TOKEN, newToken);
    setToken(newToken);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        data,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!data,
        loading: loading || isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}

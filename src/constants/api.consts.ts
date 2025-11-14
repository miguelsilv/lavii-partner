export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.10:3000";

export const API_TIMEOUT = 10000; // 10 segundos

export const CACHE_TTL = {
  SHORT: 1000 * 60 * 5, // 5 minutos
  MEDIUM: 1000 * 60 * 15, // 15 minutos
  LONG: 1000 * 60 * 60, // 1 hora
};

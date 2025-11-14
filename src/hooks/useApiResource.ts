import { useContext } from "react";
import { ApiResourceContext } from "@/providers/ApiResourceProvider";

export function useApiResource() {
  const context = useContext(ApiResourceContext);
  if (!context) {
    throw new Error("useApiResource deve ser usado dentro de ApiResourceProvider");
  }
  return context;
}
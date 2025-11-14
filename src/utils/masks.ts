export const numberToCurrency = (number: number, options?: { currency: string, language: string }) => {
    return number.toLocaleString(options?.language || "pt-BR", { style: "currency", currency: options?.currency || "BRL" });
};
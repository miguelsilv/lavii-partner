import { z } from "zod";

export const resetPasswordSchema = z.object({
    code: z.string()
        .min(6, "Código deve ter 6 dígitos")
        .max(6, "Código deve ter 6 dígitos")
        .regex(/^\d+$/, "Código deve conter apenas números"),
    password: z.string()
        .min(8, "Senha deve ter no mínimo 8 caracteres")
        .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "Senha deve conter pelo menos um número")
        .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;




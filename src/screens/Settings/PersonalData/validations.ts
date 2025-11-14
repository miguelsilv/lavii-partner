import * as z from "zod";

function isValidCPF(cpf: string): boolean {
  const cleanCpf = cpf.replace(/\D/g, '');
  
  if (cleanCpf.length !== 11) return false;
  
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 >= 10) digit1 = 0;
  
  if (parseInt(cleanCpf.charAt(9)) !== digit1) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 >= 10) digit2 = 0;
  
  return parseInt(cleanCpf.charAt(10)) === digit2;
}

export const personalDataSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  cpf: z.string()
    .min(1, "CPF é obrigatório")
    .refine((cpf) => isValidCPF(cpf), "CPF inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(11, "Telefone inválido"),
  birthday: z.string().min(1, "Data de nascimento é obrigatória"),
});

export type PersonalDataFormData = z.infer<typeof personalDataSchema>;


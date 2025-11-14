# Sistema de Erros da API - Lavii Partner

Este documento explica como usar o sistema de tratamento de erros implementado no projeto Lavii Partner.

## Arquitetura do Sistema

O sistema de erros é organizado em múltiplas camadas:

```
Requisição HTTP
     ↓
FetchHttpClient (detecta erro)
     ↓
AppHttpErrorInterceptor (trata 401, 500, etc.)
     ↓
useApi hook (propaga para componente)
     ↓
Componente (exibe loading/error states)
     ↓
GlobalErrorBoundary (captura erros não tratados)
```

## Componentes Principais

### 1. Classes de Erro

```typescript
// src/errors/index.ts
BaseError (classe base)
└── ApiError (erro específico da API)
    ├── statusCode: número
    ├── details: array de mensagens
    └── message: mensagem principal
```

### 2. Interceptor Global

O `AppHttpErrorInterceptor` trata automaticamente:
- **401 (Unauthorized)**: Exibe alert e executa logout
- **500 (Internal Server Error)**: Exibe alert genérico
- Outros erros podem ser adicionados conforme necessário

### 3. Error Boundaries

- **GlobalErrorBoundary**: Captura erros não tratados em toda a aplicação
- **ScreenErrorBoundary**: Captura erros específicos de telas individuais

### 4. Hook useApi

Gerencia automaticamente:
- Estado de loading
- Cache de dados
- Propagação de erros
- Função de refetch

## Como Usar

### 1. Configuração no App Principal

O sistema já está configurado no `App.tsx`:

```typescript
<ApiCacheProvider>
  <AuthProvider>
    <GlobalErrorBoundary signOut={signOut}>
      <ApiResourceProvider token={token} interceptor={interceptor}>
        {/* Suas telas */}
      </ApiResourceProvider>
    </GlobalErrorBoundary>
  </AuthProvider>
</ApiCacheProvider>
```

### 2. Usando em Componentes

```typescript
import { useApiResource } from "@/hooks/useApiResource";
import { useApi } from "@/hooks/useApi";

function MinhaTela() {
  const { categoriesApi } = useApiResource();
  
  const { data, loading, error, refetch } = useApi(
    () => categoriesApi.getAll(),
    {
      key: "categories",
      useCache: true,
      ttl: 1000 * 60 * 5, // 5 minutos
    }
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  
  return <DataComponent data={data} />;
}
```

### 3. Tratamento Manual de Erros

Para casos específicos onde você quer tratar erros manualmente:

```typescript
import { ApiError } from "@/errors";

try {
  await api.someMethod();
} catch (error) {
  if (error instanceof ApiError) {
    if (error.statusCode === 401) {
      // Erro de autenticação - será tratado automaticamente pelo interceptor
    } else {
      // Outros erros da API
      console.error('Erro da API:', error.message);
    }
  } else {
    // Outros tipos de erro
    console.error('Erro inesperado:', error);
  }
}
```

### 4. Error Boundaries por Tela

Para proteger telas específicas:

```typescript
import { ScreenErrorBoundary } from "@/components/ScreenErrorBoundary";

function MinhaTela() {
  return (
    <ScreenErrorBoundary>
      <ConteudoDaTela />
    </ScreenErrorBoundary>
  );
}
```

## Configurações

### URL da API

Configure a URL base da API através da variável de ambiente:

```bash
EXPO_PUBLIC_API_URL=https://sua-api.com/api
```

### Cache

O sistema de cache é automático quando você usa `useCache: true`:

```typescript
const { data } = useApi(
  () => api.getData(),
  {
    key: "unique-key", // Chave única para o cache
    useCache: true,
    ttl: 1000 * 60 * 10, // 10 minutos
  }
);
```

## Benefícios

1. **Tratamento Automático**: Erros comuns (401, 500) são tratados automaticamente
2. **Cache Inteligente**: Dados são cacheados automaticamente com TTL configurável
3. **Logout Automático**: Usuário é deslogado automaticamente em caso de token inválido
4. **Fallbacks Visuais**: Error boundaries com UI de recuperação
5. **Consistência**: Padrão uniforme de tratamento de erros em toda a aplicação

## Exemplos Práticos

Veja o arquivo `src/screens/ExampleWithErrorHandling.tsx` para um exemplo completo de como usar o sistema.

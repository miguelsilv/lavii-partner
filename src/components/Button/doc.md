## Visão Geral
O `ButtonComponent` é um botão que implementa um efeito de ripple ao ser pressionado. Ele suporta tanto botões normais quanto botões com estilo de contorno (outline).

## Propriedades

| Propriedade  | Tipo     | Padrão  | Descrição |
|-------------|---------|---------|-------------|
| `onPress`   | `() => void` | `undefined` | Função chamada ao clicar no botão. |
| `title`     | `string` | **Obrigatório** | Texto exibido dentro do botão. |
| `outline`   | `boolean` | `false` | Define se o botão terá um estilo de contorno (outline). |

## Exemplo de Uso

```tsx
import React from "react";
import { View } from "react-native";
import ButtonComponent from "./ButtonComponent";

const App = () => {
    return (
        <View style={{ padding: 20 }}>
            <ButtonComponent title="Clique Aqui" onPress={() => alert("Botão pressionado!")} />
            <ButtonComponent title="Botão Outline" outline onPress={() => alert("Outline pressionado!")} />
        </View>
    );
};

export default App;
```

## Comportamento do Efeito Ripple

- O efeito ripple é ativado ao pressionar o botão.
- A animação é iniciada a partir do ponto exato onde o usuário tocou.
- O efeito desaparece após a conclusão da animação.
- A animação tem duração de 600ms.



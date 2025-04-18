# Documentação dos Core Components

Esta documentação descreve o uso dos componentes centrais utilizados no layout da aplicação.

## Container

`Container` é um wrapper principal que envolve toda a tela, garantindo espaçamento interno e fundo padrão.

```tsx
<Container>
  <Text>Olá, mundo!</Text>
</Container>
```

## Section

`Section` serve para separar seções dentro do layout, aplicando um espaçamento inferior padrão.

```tsx
<Section>
  <Text>Seção 1</Text>
</Section>
```


## Margin

`Margin` aplica margens automaticamente. Caso nenhuma propriedade seja passada, aplica margem horizontal de 8.

### Propriedades:

- `horizontal`: Aplica margem nos lados esquerdo e direito.
- `vertical`: Aplica margem no topo e na base.
- `top`: Aplica margem apenas no topo.
- `bottom`: Aplica margem apenas na base.
- `left`: Aplica margem apenas na esquerda.
- `right`: Aplica margem apenas na direita.

```tsx
<Margin vertical>
  <Text>Texto com margem vertical</Text>
</Margin>
```

## Gutter

`Gutter` define o espaçamento entre os elementos filhos. Pode ser configurado globalmente ou de forma específica para linhas e colunas.

### Propriedades:

- `space`: Define um espaçamento geral entre os elementos.
- `horizontalSpace`: Define um espaçamento apenas entre colunas.
- `verticalSpace`: Define um espaçamento apenas entre linhas.

```tsx
<Gutter space={16}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Gutter>
```

## Align

```tsx
<View style={{ height: 300, backgroundColor: "red" }}>
  <Align alignment="bottomCenter">
    <View style={{ width: 50, height: 50, backgroundColor: "green" }} />
  </Align>
</View>
```

## Space

Aplica um espaçamento entre dois elementos.

### Propriedades:

- `size`: Tamanho do espaçamento. Opcional
- `onlyHorizontal`: Aplica somente espaçamento horizontal. Opcional
- `onlyVertical`: Aplica somente espaçamento vertical. Opcional

```tsx
<Space onlyHorizontal />
```

Aqui está a documentação para os componentes `Row` e `Column`, seguindo o padrão estabelecido:

---

## Row

O componente `Row` organiza seus elementos filhos em uma linha horizontal. Ele utiliza o layout flexível do CSS (`flexbox`) para alinhar e distribuir os itens.

### Propriedades:

- **mainAlign**: Define o alinhamento principal dos itens ao longo do eixo horizontal. Os valores possíveis são:

  - `"flex-start"`: Alinha os itens no início do contêiner.
  - `"flex-end"`: Alinha os itens no final do contêiner.
  - `"center"`: Centraliza os itens no contêiner.
  - `"space-between"`: Distribui os itens uniformemente, com o primeiro item no início e o último no final.
  - `"space-around"`: Distribui os itens uniformemente, com espaços iguais ao redor de cada item.
  - `"space-evenly"`: Distribui os itens uniformemente, com espaços iguais entre eles e nas extremidades.

- **crossAlign**: Define o alinhamento dos itens ao longo do eixo vertical. Assume `center` como padrão e os outros valores possíveis são:
  - `"flex-start"`: Alinha os itens no topo do contêiner.
  - `"flex-end"`: Alinha os itens na base do contêiner.
  - `"center"`: Centraliza os itens verticalmente no contêiner.
  - `"stretch"`: Estica os itens para preencher a altura do contêiner.
  - `"baseline"`: Alinha os itens pela linha de base do texto.

### Exemplo de uso:

```tsx
<Row mainAlign="space-between" crossAlign="center">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Row>
```

---

## Column

O componente `Column` organiza seus elementos filhos em uma coluna vertical. Assim como o `Row`, ele utiliza o layout flexível do CSS (`flexbox`) para alinhar e distribuir os itens.

### Propriedades:

- **mainAlign**: Define o alinhamento principal dos itens ao longo do eixo vertical. Os valores possíveis são:

  - `"flex-start"`: Alinha os itens no topo do contêiner.
  - `"flex-end"`: Alinha os itens na base do contêiner.
  - `"center"`: Centraliza os itens no contêiner.
  - `"space-between"`: Distribui os itens uniformemente, com o primeiro item no topo e o último na base.
  - `"space-around"`: Distribui os itens uniformemente, com espaços iguais ao redor de cada item.
  - `"space-evenly"`: Distribui os itens uniformemente, com espaços iguais entre eles e nas extremidades.

- **crossAlign**: Define o alinhamento dos itens ao longo do eixo horizontal. Assume `center` como padrão e os outros valores possíveis são:
  - `"flex-start"`: Alinha os itens à esquerda do contêiner.
  - `"flex-end"`: Alinha os itens à direita do contêiner.
  - `"center"`: Centraliza os itens horizontalmente no contêiner.
  - `"stretch"`: Estica os itens para preencher a largura do contêiner.
  - `"baseline"`: Alinha os itens pela linha de base do texto.

### Exemplo de uso:

```tsx
<Column mainAlign="center" crossAlign="stretch">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Column>
```

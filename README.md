# Credifit Frontend - Next.js

Este é um projeto [Next.js](https://nextjs.org) inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Iniciando o Projeto

Primeiro, instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

Em seguida, rode o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

---

## ⚙️ Fluxo de Testagem Manual

Este fluxo de teste manual é projetado para verificar a funcionalidade de **criação de um novo empréstimo** pelo frontend, consumindo a API do backend.

### Passo 1: Selecionar usuário no dropdown

Na página inicial de solicitação de empréstimo, há um **menu dropdown** que lista todos os usuários cadastrados (dados obtidos pelo endpoint `GET /user`).  
Selecione um usuário para carregar automaticamente suas informações de funcionário.

---

### Passo 2: Visualizar informações do funcionário

Ao selecionar o usuário, o sistema faz uma chamada à rota:

`GET /employee/user/:userId`

Isso retorna os detalhes do funcionário (salário, empresa e id). Essas informações aparecem automaticamente na interface.

---

### Passo 3: Criar um novo empréstimo

Com o funcionário já selecionado, preencha os campos de **valor do empréstimo** e **número de parcelas** no formulário.  
O frontend então envia uma requisição para a API:

`POST /loan`

**Exemplo de corpo da requisição:**

```json
{
  "amount": 1000,
  "parcelAmount": 2,
  "employeeId": "c1f7a1b9-3d8c-4a1e-8e6f-7b5c3b9d0e2f"
}
```

**Exemplo de resposta:**

```json
{
  "id": "a9d7b4c2-9e5d-4f8a-9c7b-6b0a1d9f8c5e",
  "amount": 1000,
  "dueDate": "2025-09-14T22:30:00.000Z",
  "parcelAmount": 2,
  "approved": true,
  "employeeId": "c1f7a1b9-3d8c-4a1e-8e6f-7b5c3b9d0e2f"
}
```

---

## 👤 Usuários de Testagem

O banco de dados vem populado com usuários para facilitar cenários de teste no frontend:

- **Alice Ballice** e **Bobbie Goods**  
  Funcionários da empresa **TechTechy**, com salários de `1500` e `2500`.

- **Charlie Brown** e **Dionysus**  
  Funcionários da empresa **HealthHealthy**, com salários de `3800` e `8200`.

- **Mellinöe** e **Frankie Ocean**  
  Funcionários da empresa **TimeTimey**, com salários de `12000` e `4000`.

- **Hollow Knight** e **Silk Song**  
  Funcionários com salários de `5000` e `2200`, **sem empresa associada**, úteis para testar cenários especiais.

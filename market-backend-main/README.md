# Sistema de supermercado 
Autor:  Alberto Porto

## Variáveis de Ambiente
* Para que seja feita a conexão com o banco de dados e os tokens de acesso sejam gerados corretamente, é necessário preencheer essas duas variávels de ambiente através do arquivos .env na raiz do projeto
```env
DATABASE_URL="[SUA CHAVE AQUI]"
JWT_SECRET="[SEU SEGREDO AQUI]"
```

## Instalação Local
```shell
// Instalar dependências do projeto
npm install

// Conectar o ORM Prisma ao banco de dados
npx prisma generate

// Rodar o projeto localmente
npm start
```

## Documentação das rotas
### Rotas de Produtos

> **POST** /api/product

Cria um novo produto
```json
// Exemplo de body
 {
	"name": "Escovas de dente",
	"price": 15,
	"category": "higiene pessoal",
	"description": "99% dos dentistas recomendam",
	"expiration": "2023-02-14T13:15:03-08:00"
} 
```

> **GET** /api/product/:id

Resgata um produto pelo id

> **PUT** /api/product/:id

Atualiza um produto passando um id na URL e um corpo com os campos a serem atualizados
```json
// Exemplo de body
 {
	"name": "Escovas de dente automática",
	"price": 35,
} 
```

> **DELETE** /api/product/:id

Delete um produto pelo id

> **GET** /api/products

Resgata todos os produtos na base de dados

### Rotas de usuários

> **POST** /api/user

Cria um novo usuário
```json
// Exemplo de body
{
	"name": "Alberto Porto",
	"email": "albertoporto@teste.com",
	"password": "teste1234"
}
```

> **POST** /api/login

Faz o login do usuário e retorna o token de autenticação (Bearer Token)
```json
// Exemplo de body
{
	"email": "albertoporto@teste.com",
	"password": "teste1234"
}
```

> **GET** /api/user/:id

Resgata um usuário pelo id

> **PUT** /api/user/:id

Atualiza um usuário passando um id na URL e um corpo com os campos a serem atualizados
```json
// Exemplo de body
 {
	"name": "Alberto Porto J",
	"paswword": teste12345,
} 
```

> **DELETE** /api/user/:id

Delete um usuário pelo id

> **GET** /api/users

Resgata todos os usuários na base de dados

### Rotas de Checkout

> **POST** /api/checkout

Cria uma nova compra de um usuário (checkout). Para esta rota é necessário criar 10 Checkouts para visualizar um desconto de 10% sendo aplicado nos produtos daquela categoria. Exemplo: Comprando 10 vezes o produto Alcatra da categoria "carnes", no décimo primeiro em diante e pelos próximos 7 dias, será aplicado um desconto de 10% na categoria "carnes"
```json
// Exemplo de body
 {
	"items": [
		{
			"productId": "64f9d88d6c9512823fc5bf68",
			"quantity": 7
		},
		{
			"productId": "64f8d4015a7bf023968057eb",
			"quantity": 2
		}
	]
}
```

### Rotas de Promoção

> **POST** /api/promotion

Cria uma nova promoção. Neste exemplo cria-se uma promoção que dura até o dia escolhido (expiration). Atente-se para o fato de que a promoção nesta rota será aplicada apenas ao usuário referente ao token de acesso passado 

```json
// Exemplo de body
{
	 "expiration": "2023-10-14T13:15:03-08:00",
	 "category": "higiene pessoal",
	 "value": 0.1
}
```

> **POST** /api/promotion/create-to-all-users

Cria uma nova promoção de uma categoria para todos os usuários

```json
// Exemplo de body
{
	 "expiration": "2023-10-14T13:15:03-08:00",
	 "category": "higiene pessoal",
	 "value": 0.1
}
```



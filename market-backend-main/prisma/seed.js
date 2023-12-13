const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    name: "Arroz Cereal",
    price: 12.9,
    thumbnail_url:
      "https://www.natashopping.com.br/lojas/supermercadonata/produtos/23976/imagens/arroz-cereal-5kg-100x100.jpg",
    quantity: 6,
  },
  {
    name: "Feijão Preto",
    price: 13.99,
    thumbnail_url:
      "https://carrefourbrfood.vtexassets.com/arquivos/ids/16593093/feijao-preto-tipo-1-broto-legal-1-kg-1.jpg?v=637552305041900000",
    quantity: 3,
  },
  {
    name: "Carne moída",
    price: 22.89,
    thumbnail_url:
      "https://images-food.ifcshop.com.br/produto/30854_0_20200617153134.jpg",
    quantity: 12,
  },
  {
    name: "Papel higiênico",
    price: 8.99,
    thumbnail_url:
      "https://coopsp.vtexassets.com/arquivos/ids/215242-800-auto?v=637919526243230000&width=800&height=auto&aspect=true",
    quantity: 16,
  },
  {
    name: "Nutella Tradicional",
    price: 99.99,
    thumbnail_url:
      "https://media.cotabest.com.br/media/sku/creme-de-avela-pote-140g-nutella-pote-9bf7de53b9.jpg",
    quantity: 19,
  },
];

prisma.product
  .createMany({
    data: products,
  })
  .catch((err) => console.log(err));

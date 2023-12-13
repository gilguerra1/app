const { productRepository } = require("../repositories/ProductRepository");

class ProductService {
  async create(createProductInfo) {
    const {
      name,
      price,
      category,
      thumbnail_url,
      description,
      expiration,
      quantity,
    } = createProductInfo;

    try {
      const createdProduct = await productRepository.create({
        name,
        price,
        category,
        thumbnail_url,
        description,
        expiration,
        quantity,
      });

      return {
        data: createdProduct,
        status: 201,
      };
    } catch (error) {
      return {
        messages: ["Não foi possível criar o produto na base de dados"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async findById(productId) {
    try {
      const product = await productRepository.findById(productId);

      return {
        data: product,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Produto não encontrado"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async update(toUpdateProduct) {
    const {
      productId,
      data: { name, price, quantity, thumbnail_url },
    } = toUpdateProduct;

    try {
      const newProduct = await productRepository.update({
        productId,
        data: { name, price, quantity: parseFloat(quantity), thumbnail_url },
      });
      return {
        data: newProduct,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        messages: ["Não foi possível atualizar o produto"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async deleteById(productId) {
    try {
      const deleteProduct = await productRepository.deleteById(productId);

      return {
        data: deleteProduct,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Produto não deletado"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async listAll() {
    try {
      const allProducts = await productRepository.listAll();

      return {
        data: allProducts,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Não foi possível listar todos os produtos"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async updateMany(productsList) {
    const updatedProductsList = await Promise.all(
      productsList.map(async (product) => {
        console.log("produtooo", product);

        return await productRepository.update({
          productId: product.productId,
          data: product.data,
        });
      })
    );

    return {
      data: updatedProductsList,
      status: 200,
    };
  }
}

exports.productService = new ProductService();

const { prisma } = require("../lib/prisma");

class ProductRepository {
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

    const createdProduct = await prisma.product.create({
      data: {
        name,
        price,
        category,
        thumbnail_url,
        description,
        expiration,
        quantity,
      },
    });

    return createdProduct;
  }

  async findById(productId) {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    return product;
  }

  async update(toUpdateProduct) {
    const { productId, data: newData } = toUpdateProduct;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: newData,
    });
    return updatedProduct;
  }

  async deleteById(productId) {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return deletedProduct;
  }

  async listAll() {
    const allProducts = await prisma.product.findMany();

    return allProducts;
  }

  /*  async updateMany(productsList) {
    const updatedProducts = await prisma.product.updateMany({
      data: productsList,
    });

    return updatedProducts;
  } */
}

exports.productRepository = new ProductRepository();

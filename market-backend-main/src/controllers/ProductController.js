const { productService } = require("../services/ProductService");

class ProductController {
  async create(req, res) {
    const {
      name,
      price,
      category,
      thumbnail_url,
      description,
      expiration,
      quantity,
    } = req.body;
    const createdProduct = await productService.create({
      name,
      price,
      category,
      thumbnail_url,
      description,
      expiration,
      quantity,
    });

    return res.status(createdProduct.status).json(createdProduct);
  }

  async findById(req, res) {
    const productId = req.params.id;

    const product = await productService.findById(productId);

    return res.status(product.status).json(product);
  }

  async updateById(req, res) {
    const productId = req.params.id;
    const { name, price, quantity, thumbnail_url } = req.body;

    const newProduct = await productService.update({
      productId,
      data: { name, price, quantity, thumbnail_url },
    });

    return res.status(newProduct.status).json(newProduct);
  }

  async deleteById(req, res) {
    const productId = req.params.id;

    const deletedProduct = await productService.deleteById(productId);

    return res.status(deletedProduct.status).json(deletedProduct);
  }

  async listAll(_, res) {
    const allProducts = await productService.listAll();
    console.log(allProducts);

    return res.status(allProducts.status).json(allProducts);
  }

  async updateMany(req, res) {
    const { productsList } = req.body;

    const updatedProductsList = await productService.updateMany(productsList);

    return res.status(updatedProductsList.status).json(updatedProductsList);
  }
}

exports.productController = new ProductController();

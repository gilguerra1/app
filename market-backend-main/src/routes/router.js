const express = require("express");
const { productController } = require("../controllers/ProductController");
const { userController } = require("../controllers/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const { checkoutController } = require("../controllers/CheckoutController");
const { promotionController } = require("../controllers/PromotionController");

const router = express.Router();

/* Rotas dos Produtos */
router.post("/product", AuthMiddleware.execute, productController.create);
router.get("/product/:id", AuthMiddleware.execute, productController.findById);
router.put(
  "/product/:id",
  AuthMiddleware.execute,
  productController.updateById
);
router.delete(
  "/product/:id",
  AuthMiddleware.execute,
  productController.deleteById
);
router.get("/products", AuthMiddleware.execute, productController.listAll);
router.put(
  "/products/update-many",
  AuthMiddleware.execute,
  productController.updateMany
);

/* Rotas dos Usuários */
router.post("/user", userController.create);
router.post("/login", userController.login);
router.get("/user/:id", AuthMiddleware.execute, userController.findById);
router.put("/user/:id", AuthMiddleware.execute, userController.updateById);
router.delete("/user/:id", AuthMiddleware.execute, userController.deleteById);
router.get("/users", AuthMiddleware.execute, userController.listAll);

/* Rotas de Compras */
router.post("/checkout", AuthMiddleware.execute, checkoutController.create);

/* Rotas de Promoções */
router.post("/promotion", AuthMiddleware.execute, promotionController.create);
router.post(
  "/promotion/create-to-all-users",
  AuthMiddleware.execute,
  promotionController.createPromotionToAllUsersByCategory
);

module.exports = router;

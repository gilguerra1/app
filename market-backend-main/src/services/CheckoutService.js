const { checkoutRepository } = require("../repositories/CheckoutRepository");
const { productRepository } = require("../repositories/ProductRepository");
const { promotionRepository } = require("../repositories/PromotionRepository");

class CheckoutService {
  async checkout({ items, userId }) {
    try {
      const userPromotions = await promotionRepository.findAllByUserId(userId);

      const checkoutItems = await Promise.all(
        items.map(async (item) => {
          const product = await productRepository.findById(item.productId);
          const productHavePromotionToUser = userPromotions.find(
            (userPromotion) => {
              if (
                product.category === userPromotion.category &&
                new Date() < userPromotion.expiration
              ) {
                return true;
              }
            }
          );

          let salePrice = product.price;

          if (productHavePromotionToUser) {
            salePrice =
              product.price - product.price * productHavePromotionToUser.value;
          }

          return {
            quantity: item.quantity,
            productId: item.productId,
            salePrice,
          };
        })
      );

      const checkout = await checkoutRepository.create({
        userId,
        checkoutItems,
      });

      const userCheckoutsLast7Days =
        await checkoutRepository.findCheckoutsLast7Days(userId);

      const userCheckoutsCategoryCounter = {};

      userCheckoutsLast7Days.forEach((userCheckout) => {
        userCheckout.checkoutItems.forEach((checkoutItem) => {
          if (userCheckoutsCategoryCounter[checkoutItem.Product.category]) {
            userCheckoutsCategoryCounter[checkoutItem.Product.category] =
              userCheckoutsCategoryCounter[checkoutItem.Product.category] + 1;
          } else {
            userCheckoutsCategoryCounter[checkoutItem.Product.category] = 1;
          }
        });
      });

      for (const key in userCheckoutsCategoryCounter) {
        if (Object.hasOwnProperty.call(userCheckoutsCategoryCounter, key)) {
          const categoryCount = userCheckoutsCategoryCounter[key];

          if (categoryCount >= 10) {
            const dataAtual = new Date();
            const promotionExpirationDate = new Date(dataAtual);
            promotionExpirationDate.setDate(dataAtual.getDate() + 7);
            await promotionRepository.create({
              userId,
              promotion: {
                expiration: promotionExpirationDate,
                category: key,
                value: 0.1,
              },
            });
          }
        }
      }

      return { data: checkout, status: 201 };
    } catch (error) {
      return {
        messages: ["Ocorreu um erro na criação do checkout"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }
}

exports.checkoutService = new CheckoutService();

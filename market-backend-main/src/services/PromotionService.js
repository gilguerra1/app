const { promotionRepository } = require("../repositories/PromotionRepository");
const { userRepository } = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
class PromotionService {
  async create({ userId, promotion, access_token }) {
    try {
      const createdPromotion = await promotionRepository.create({
        userId,
        promotion,
        access_token,
      });

      const token = jwt.sign({ userId }, "suaChaveSecreta");

      const response = {
        data: {
          ...createdPromotion,
          access_token: token,
        },
        status: 201,
      };

      console.log("Token gerado:", token);

      return response;
    } catch (error) {
      return {
        messages: ["Não foi possível criar a promoção"],
        stackTrace: [error.message],
        status: 500,
      };
    }
  }

  async createPromotionToAllUsersByCategory({ category, value, expiration }) {
    try {
      const allUsers = await userRepository.listAll();

      const allUsersIds = allUsers.map((user) => user.id);

      const createPromotionsArr = allUsersIds.map((userId) => {
        return {
          value,
          expiration,
          category,
          userId,
        };
      });

      const createdPromotions = await promotionRepository.createMany(
        createPromotionsArr
      );

      console.log(createdPromotions);

      return {
        status: 201,
      };
    } catch (error) {
      return {
        message: ["Não foi possível aplicar a promoção"],
        stackTrace: [error.message],
        status: 500,
      };
    }
  }
}

exports.promotionService = new PromotionService();

const { prisma } = require("../lib/prisma");

class PromotionRepository {
  async create(createPromotion) {
    const {
      userId,
      promotion: { expiration, category, value },
    } = createPromotion;

    const promotion = await prisma.promotion.create({
      data: {
        expiration,
        category,
        value,
        userId,
      },
    });

    return promotion;
  }

  async createMany(createPromotionsArr) {
    const promotions = await prisma.promotion.createMany({
      data: createPromotionsArr,
    });

    return promotions;
  }

  async findAllByUserId(userId) {
    const promotion = await prisma.promotion.findMany({
      where: {
        userId,
      },
    });

    return promotion;
  }
}

exports.promotionRepository = new PromotionRepository();

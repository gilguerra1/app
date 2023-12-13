const { promotionService } = require("../services/PromotionService");

class PromotionController {
  async create(req, res) {
    const { expiration, category, value } = req.body;

    const promotion = await promotionService.create({
      userId: req.user.id,
      promotion: {
        expiration,
        category,
        value,
      },
    });

    return res.status(promotion.status).json(promotion);
  }

  async createPromotionToAllUsersByCategory(req, res) {
    const { category, expiration, value } = req.body;

    const promotionApplyed =
      await promotionService.createPromotionToAllUsersByCategory({
        category,
        expiration,
        value,
      });

    return res.status(promotionApplyed.status).json();
  }
}

exports.promotionController = new PromotionController();

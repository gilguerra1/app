const { checkoutService } = require("../services/CheckoutService");

class CheckoutController {
  async create(req, res) {
    const { items } = req.body;

    const checkout = await checkoutService.checkout({
      items,
      userId: req.user.id,
    });

    return res.status(checkout.status).json(checkout);
  }
}

exports.checkoutController = new CheckoutController();

const { prisma } = require("../lib/prisma");

class CheckoutRepository {
  async create({ checkoutItems, userId }) {
    const checkout = await prisma.checkout.create({
      data: {
        userId,
        checkoutItems: {
          create: checkoutItems,
        },
      },
      include: {
        checkoutItems: true,
      },
    });

    return checkout;
  }

  async findCheckoutsLast7Days(userId) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const checkouts = await prisma.checkout.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: sevenDaysAgo.toISOString(),
        },
      },
      include: {
        checkoutItems: {
          include: {
            Product: true,
          },
        },
      },
    });

    return checkouts;
  }
}

exports.checkoutRepository = new CheckoutRepository();

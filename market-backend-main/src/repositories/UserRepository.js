const { prisma } = require("../lib/prisma");

class UserRepository {
  async create(createUserInfo) {
    const { name, email, password } = createUserInfo;
    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return createUser;
  }

  async findById(userId) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async update(toUpdateUser) {
    const { userId, data: newData } = toUpdateUser;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: newData,
    });

    return updatedUser;
  }

  async deleteById(userId) {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return deletedUser;
  }

  async listAll() {
    const allUsers = await prisma.user.findMany();

    return allUsers;
  }

  async findByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}

exports.userRepository = new UserRepository();

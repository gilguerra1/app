const Config = require("../config/Config");
const { userRepository } = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");

class UserService {
  async create(createUserInfo) {
    const { name, email, password } = createUserInfo;

    try {
      const createdUser = await userRepository.create({
        name,
        email,
        password,
      });

      return {
        data: createdUser,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Não foi possível criar o Usuário"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async findById(userId) {
    try {
      const user = await userRepository.findById(userId);

      return {
        data: user,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Usuário não encontrado"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async update(toUpdateUser) {
    const {
      userId,
      data: { name, email, password },
    } = toUpdateUser;

    try {
      const newUser = await userRepository.update({
        userId,
        data: { name, email, password },
      });

      return {
        data: newUser,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Não foi possível atualizar o usuário"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async deleteById(userId) {
    try {
      const deleteUser = await userRepository.deleteById(userId);

      return {
        data: deleteUser,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Usuário não deletado"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async listAll() {
    try {
      const allUsers = await userRepository.listAll();

      return {
        data: allUsers,
        status: 200,
      };
    } catch (error) {
      return {
        messages: ["Não foi possível listar todos os usuários"],
        status: 500,
        stackTrace: [error.message],
      };
    }
  }

  async login(userInfo) {
    const { email, password } = userInfo;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      console.log(!!user);
      return {
        messages: ["Email ou senha incorretos"],
        status: 401,
        stackTrace: [],
      };
    }

    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      console.log(user.password, password);
      return {
        messages: ["Email ou senha incorretos"],
        status: 401,
        stackTrace: [],
      };
    }

    const expiresIn = "24h";

    const access_token = jwt.sign(user, Config.jwtSecret, { expiresIn });

    return {
      data: {
        user,
        access_token,
      },
      status: 200,
    };
  }
}

exports.userService = new UserService();

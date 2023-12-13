const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/prisma");
const Config = require("../config/Config");

class AuthMiddleware {
  static async execute(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");

      if (!token) {
        return res
          .status(401)
          .json({ messages: ["É necessário um token de acesso"], status: 401 });
      }

      const decoded = jwt.verify(token, Config.jwtSecret);

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return res.status(404).json({
          messages: ["Não foi possível encontrar o usuário na base de dados"],
          status: 404,
          stackTrace: [],
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).send({
        messages: ["Não autorizado, faça login para realizar esta ação"],
        status: 401,
        stackTrace: [],
      });
    }
  }
}

module.exports = AuthMiddleware;

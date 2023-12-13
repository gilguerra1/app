const { userService } = require("../services/UserService");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const createdUser = await userService.create({ name, email, password });

    return res.status(createdUser.status).json(createdUser);

  }

  async findById(req, res) {
    const userId = req.params.id;

    const user = await userService.findById(userId);

    return res.status(user.status).json(user);
  }

  async updateById(req, res) {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const newUser = await userService.update({
      userId,
      data: { name, email, password },
    });

    return res.status(newUser.status).json(newUser);
  }

  async deleteById(req, res) {
    const userId = req.params.id;

    const deletedUser = await productService.deleteById(userId);

    return res.status(deletedUser.status).json(deletedUser);
  }

  async listAll(_, res) {
    const allUsers = await userService.listAll();

    return res.status(allUsers.status).json(allUsers);
  }

  async login(req, res) {
    const { email, password } = req.body;

    const loggedUser = await userService.login({ email, password });

    return res.status(loggedUser.status).json(loggedUser.data);
  }
}

exports.userController = new UserController();

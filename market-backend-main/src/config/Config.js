class Config {
  static get jwtSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("Variável de ambiente JWT_SECRET não definida");
    }

    return secret;
  }
}

module.exports = Config;

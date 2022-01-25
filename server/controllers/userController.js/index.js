/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

class UserController {
  checkAuth(req, res) {
    if (req.session.user) {
      return res.json(req.session.user);
    }
    return res.status(400).json({ message: 'Ошибка' });
  }

  async authUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Пользователь с такой почтой не существует' });
      }
      if (email === user.email && await bcrypt.compare(password, user.password)) {
        req.session.user = {
          name: user.name,
          email,
          id: user.id,
        };
        return res.json(req.session.user);
      }
      return res.status(400).json({ message: 'Пользователь с такой почтой не существует' });
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка' });
    }
  }

  async registerUser(req, res) {
    try {
      const { userName, password, email } = req.body;
      if (userName && password && email) {
        const user = await User.findOne({ where: { email } });
        if (user) {
          return res.status(400).json({ message: 'Пользователь с такой почтой существует' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name: userName, password: passwordHash, email });
        req.session.user = {
          name: newUser.name,
          email: newUser.email,
          id: newUser.id,
        };
        return res.json(req.session.user);
      }
      throw new Error();
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка' });
    }
  }

  async logoutUser(req, res) {
    try {
      req.session.destroy();
      res.clearCookie('sid');
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

module.exports = UserController;

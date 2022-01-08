/* eslint-disable no-unused-vars */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router
  .route('/')
  .get((req, res) => {
    if (req.session.user) {
      return res.json(req.session.user);
    }
    return res.status(400).json({ message: 'Ошибка' });
  });

router
  .route('/login')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = db.users.find((item) => item.email === email);
      if (!user) {
        return res.status(400).json({ message: 'Пользователь с такой почтой не существует' });
      }
      if (email === user.email && await bcrypt.compare(password, user.password)) {
        req.session.user = {
          name: user.userName,
          email,
        };
        return res.json(req.session.user);
      }
      return res.status(400).json({ message: 'Пользователь с такой почтой не существует' });
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка' });
    }
  });

router
  .route('/register')
  .post(async (req, res) => {
    try {
      const { userName, password, email } = req.body;
      if (userName && password && email) {
        const user = db.users.find((item) => item.email === email);
        if (user) {
          return res.status(400).json({ message: 'Пользователь с такой почтой существует' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        db.users.push({ userName, password: passwordHash, email });
        req.session.user = {
          name: userName,
          email,
        };
        return res.json(req.session.user);
      }
      throw new Error();
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка' });
    }
  });

router
  .route('/logout')
  .get((req, res) => {
    try {
      req.session.destroy();
      res.clearCookie('sid');
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;

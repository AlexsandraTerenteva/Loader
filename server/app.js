require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const FileStore = require('session-file-store')(session);
const { connectToDB } = require('./db');

const sessionConfig = {
  store: new FileStore(), // Эту папку нужно добавить в файл .gitignore
  name: 'sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? ['keyboard cat', 'old keyword'], // Секретное слово для шифрования, может быть любым (первый элемент в массиве для шифрования, остальные для дешифры)
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    // 1 сутки --Срок истечения годности куки в миллисекундах
  },
};
const loginRouter = require('./routes/authLogin');
const filesRouter = require('./routes/filesRouter');

const app = express();

const { PORT } = process.env;

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors({ origin: true, credentials: true }));

app.use('/api/auth', loginRouter);
app.use('/files', filesRouter);

function connectToServer() {
  app.listen(PORT, () => console.log(`Connected to server ${PORT}`));
}

connectToDB()
  .then(connectToServer)
  .catch(process.exit);

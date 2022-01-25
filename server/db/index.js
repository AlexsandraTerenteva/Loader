const { sequelize } = require('./models');

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой прошло успешно');
  } catch (error) {
    console.log('Произошла ошибка соединения с базой: \n%o', error);
    throw new Error(error);
  }
}
module.exports = { connectToDB };

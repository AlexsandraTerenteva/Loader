const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  File.init({
    title: {
      type: DataTypes.STRING,
    },
    img_src: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};

/* eslint-disable class-methods-use-this */
const { File } = require('../../db/models');

function transformDate(size) {
  return `${Math.floor(size / 1024)}КБ`;
}

class FilesController {
  async renderFiles(req, res) {
    try {
      const allFiles = await File.findAll(
        {
          where:
          { user_id: req.session.user.id },
          include: { all: true },
        },
      );
      res.json(allFiles);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка' });
    }
  }

  async editFile(req, res) {
    try {
      const file = await File.update({ title: req.body.fileName }, {
        where: {
          id: Number(req.params.id),
        },
        returning: true,
      });
      if (file[0] === 1) {
        return res.json({ fileName: req.body.fileName });
      }
      throw Error();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async deleteFile(req, res) {
    try {
      await File.destroy({ where: { id: Number(req.params.id) } });
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async addFile(req, res) {
    console.log(req.file);
    try {
      if (req.file) {
        const newFile = await File.create({
          user_id: req.session.user.id,
          title: req.file.originalname,
          size: transformDate(req.file.size),
          img_src: `http://localhost:5000/${req.file.destination}${req.file.filename}`,
        });
        res.json(newFile);
      }
    } catch (error) {
      res.status(400).json({ message: 'Не удалось загрузить файл' });
    }
  }
}

module.exports = FilesController;

const multer = require('multer');
const sharp = require('sharp');

const fs = require('fs');

const UploadController = {
    uploadImage: async (req, res) => {
        // nome da imagem
        const imageName = req.file.originalName;

        // dados da imagem
        const imageData = req.file.buffer;

        // salvar a imagem original do disco
        await sharp(imageData).toFile(`uploads/${imageName}`);

        res.status(200).json({
            msg: 'Imagem salva com sucesso!',
            status: 200
        });
    },

    listImages: async (req, res) => {

        fs.readdir('uploads/', (err, files) => {
            if (err) {
                return res.status(500), json({
                    msg: 'Erro ao listar imagens'
                });
            }

            const images = files.filter(
                (file) =>
                    file.endsWith('.jpg') ||
                    file.endsWith('.png') ||
                    file.endsWith('.jpeg')
            );
            res.send(images);
        });


    }

}
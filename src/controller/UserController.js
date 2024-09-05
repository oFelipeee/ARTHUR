const User = require("../models/User");
const bcrypt = require('bcryptjs');

const UserController = {

    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            const user = await User.findOne({ whre: { email } })

            if (!user) {
                return res.status(400).json({
                    msg: 'Email ou senha incorretos'
                });
            };

            const isValida = await bcrypt.compare(senha, user.senha);
            if (!isValida) {
                return res.status(400).json({
                    msg: "Email ou senha incorretos"
                });
            };

            const token = jwt.sing({ email: user.email, nome: user.nome },
                process.env.SECRET, { expiresIn: '1h' }
            );

            return res.status(200).json({
                msg: 'Login realizado',
                token
            })


        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Acione o suporte" });
        }
    },


    // Criando o user
    create: async (req, res) => {
        try {
            const { nome, senha, email } = req.body;

            const hashSenha = await bcrypt.hash(senha, 10);

            const userCriado = await User.create({ nome, senha: hashSenha, email });

            return res.status(200).json({
                msg: 'Usuario criado com sucesso!',
                user: userCriado
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Acione o suporte' });
        }
    },


    // Atualizar o user
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, senha, email } = req.body;

            console.log("Atualizando o objeto");
            console.log({ id });
            console.log({ nome, senha, email });

            const userUpadate = await User.findByPk(id);

            if (userUpadate == null) {
                return res.status(404).json({
                    msg: "Usuario não enontrado"
                })
            }

            const updated = await userUpadate.update({
                nome, senha, email
            });

            if (updated) {
                return res.status(200).json({
                    msg: "Usuário atualizado com sucesso!",
                });
            }

            return res.status(500).json({
                msg: "Erro ao atualizar o Usuário"
            });


        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Acione o suporte' });
        }
    },


    // Listando todo os users
    getAll: async (req, res) => {
        try {

            //    Listar todos
            const allUser = await User.findAll();

            return res.status(200).json({
                msg: 'Usuarios encontrados!!',
                usuarios: allUser
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Acione o suporte' });
        }
    },


    // Listando um user específico
    getOne: async (req, res) => {
        try {

            const { id } = req.params;
            const usuarioEncontrado = await User.findByPk(id);

            if (usuarioEncontrado == null) {
                return res.status(404).json({
                    msg: "Usuário encontrado"
                })
            }

            return res.status(200).json({
                masg: 'Usuario encontrado com sucesso!!',
                usuarios: usuarioEncontrado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Acione o suporte' });
        }
    },


    // Deletando o user
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const userFinded = await User.findByPk(id);

            if (userFinded == null) {
                return res.status(404).json({
                    msg: "User não encontrado"
                })
            }

            await userFinded.destroy();

            return res.status(200).json({
                masg: 'Usuario deletado com sucesso!!',
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Acione o suporte' });
        }
    }

}

module.exports = UserController;
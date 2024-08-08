const User = require("../models/User");

const UserController = {
    // Criando o user
    create: async (req, res) =>{
        try {
            const{ nome, senha, email} = req.body;           

           const userCriado = await User.create({nome, senha, email});



            return res.status(200).json({
                msg: 'Usuario criado com sucesso!',
                user: userCriado
            })
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    },
    // Atualizar o user
    update: async (req, res) =>{
        try {
            const { id }  = req.params;
            const{ nome, senha, email} = req.body;

            console.log("Atualizando o objeto");
            console.log({ id });
            console.log({nome, senha, email });


            return res.status(200).json({
                msg: 'Usuario atualizado com sucesso!'
            })
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    },
    // Listando todo os users
    getAll: async (req, res) =>{
        try {

//    Listar todos
            const allUser = await User.findAll();
    
            return res.status(200).json({
                msg: 'Usuarios encontrados!!',
                usuarios: allUser
            });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    },
    // Listando um user específico
    getOne: async (req, res) =>{
        try {

            const { id }  = req.params;
            const usuarioEncontrado = await User.findByPk(id);

            if(usuarioEncontrado == null){
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
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    },
    // Deletando o user
    delete: async (req, res) =>{
        try {
            return res.status(200).json({
                masg: 'Usuario deletado com sucesso!!',
            });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    }

}

module.exports = UserController;
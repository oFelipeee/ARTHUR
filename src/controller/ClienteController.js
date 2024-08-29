const Cliente = require("../models/Cliente");

const ClienteController = {
    // Criando o cliente
    create: async (req, res) =>{
        try{
            const { nome, idade, email, CPF, telefone} = req.body;

            const clienteCriado = await Cliente.create({nome, idade, email, CPF, telefone});

            return res.status(200).json({
                msg: 'Cliente criado com sucesso!',
                cliente: clienteCriado
            })
        }catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'})
        }
    },


    // atualizar o cliente
    update: async (req, res) =>{
        try {
            const { id }  = req.params;
            const{ nome, idade, CPF, email, telefone} = req.body;

            console.log("Atualizando o objeto");
            console.log({ id });
            console.log({nome, idade, CPF, email, telefone });

            const clienteUpdate = await User.findByPk(id);

            if(clienteUpdate == null) {
                return res.status(404).json({
                    msg: "Cliente não enontrado"
                })
            }

            const updated = await clienteUpdate.update({
                nome, idade, CPF, email, telefone
            });

            if(updated) {
                return res.status(200).json({
                msg: "Cliente atualizado com sucesso!",
                });
            }

            return res.status(500).json({
                msg: "Erro ao atualizar o Usuário"
            });  

 
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    },


    // Listando todo os users
    getAll: async (req, res) =>{
        try {

//    Listar todos
            const allClientes = await User.findAll();
    
            return res.status(200).json({
                msg: 'Usuarios encontrados!!',
                usuarios: allUser
            });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    },

    getOne: async (req, res) =>{
        try{
            const { id } = req.params;
            const clienteEncontrado = await Cliente.findByPk(id);

            if(clienteEncontrado == null){
                return res.status(404).json({
                    msg: "Cliente encontrado"
                })
            }

            return res.status(200).json({
                msg: "Cliente encontrado com sucesso!!",
                clientes: clienteEncontrado
            });
        }catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    },

    // Deletando o cliente
    delete: async (req, res) =>{
        try{
            const { id } = req.params;
            const clienteFinded = await Cliente.findByPk(id);

            if(clienteFinded== null){
                return res.status(404).json({
                    msg: "Cliente não encontrado"
                })
            }

            await clienteFinded.destroy();

            return res.status(200).json({
                msg: 'Cliente deletado com sucesso!!',
            });
        }catch (error){
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }
    }
}

module.exports = ClienteController;
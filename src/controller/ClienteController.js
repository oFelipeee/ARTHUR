const Cliente = require("../models/Cliente");

const ClienteController = {
  // Criando o cliente
  create: async (req, res) => {
    try {
      //formulário com method POST

      const { nome, cpf, rg, nasc } = req.body;

      const userCriado = await User.create({ nome, cpf, rg, nasc });

      return res.status(200).json({
        msg: "Cliente criado com sucesso",

        user: userCriado,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { nome, cpf, rg, nasc } = req.body;

      await User.update(
        {
          nome: nome,
          cpf: cpf,
          rg: rg,
          nasc: nasc,
        },

        {
          where: { id: id },
        }
      );

      return res.status(200).json({ msg: "Cliente atualizado com sucesso!0-" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  getAll: async (req, res) => {
    try {
      const clientes = await User.findAll();

      return res.status(200).json({
        msg: "Clientes encontrados",

        clientes,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await User.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      return res.status(200).json({
        msg: "Usuário encontrado com sucesso",

        usuario: usuario,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const usuario = await User.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      // Destruindo -> Deletando o usuário

      await usuario.destroy();

      return res.status(200).json({ msg: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
};

module.exports = ClienteController;
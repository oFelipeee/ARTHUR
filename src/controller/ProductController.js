const Products = require("../models/Products");
const Product = require("../models/Products");
const { update } = require("./UserController");

const ProductController = {
  // cadastrando o produto
  create: async (req, res) => {
    try {
      //formulário com method POST

      const { name, price, qtt } = req.body;

      const productCriado = await Product.create({ name, price, qtt });

      return res.status(200).json({
        msg: "Produto criado com sucesso",

        product: productCriado,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { name, qtt, price } = req.body;

      await Product.update(
        {
          name: name,

          price: price,

          qtt: qtt,
        },

        {
          where: { id: id },
        }
      );

      return res.status(200).json({ msg: "Produto atualizado com sucesso" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  getAll: async (req, res) => {
    try {
      const Produtos = await Product.findAll();

      return res.status(200).json({
        msg: "Produtos encontrados",

        Produtos,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;

      // ta vindo do parametros, /api/product/ID

      //SELECT * FROM products WHERE id={3212}

      const Produto = await Product.findByPk(id);

      if (!Produto) {
        return res.status(404).json({ msg: "Produto não encontrado" });
      }

      return res.status(200).json({
        msg: "Produto encontrado com sucesso",

        Produto: Produto,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const Produto = await Product.findByPk(id);

      if (!Produto) {
        return res.status(404).json({ msg: "Produto não encontrado" });
      }

      //Destruindo -> Deletando o produto

      await Produto.destroy();

      return res.status(200).json({ msg: "Produto deletado com sucesso" });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ msg: "Acione o Suporte" });
    }
  },
};
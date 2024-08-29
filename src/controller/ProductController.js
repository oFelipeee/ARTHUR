const Products = require("../models/Products");
const Product = require("../models/Products");
const { update } = require("./UserController");

const ProductController = {
    // cadastrando o produto
    create: async (req, res) =>{
        try {
            const{ nome, prec, quantidade} = req.body;

            const productCriado = await Products.create({nome, preco, quantidade});

            return res.status(200).json({
                msg: 'Produto cadastrado com sucesso!',
                product: productCriado
            })
        }catch (error) {
            console.error(error);
            return res.status(500).json({msg: 'Acione o suporte'});
        }    
    },
// Atualizando o produto
    update: async (req, res) => {
        const { id } = req.params;
        const {nome, prec, quantidade} = req.body;

        console.log("Atualizando o objeto");
        console.log({ id });
        console.log({nome, preco, quantidade});

        const productUpdate = await Product.findByPk(id);

        if(productUpdate == null) {
            return res.status(404).json({
                msg: "Produto não encontrado"
            })
        }


    }

}
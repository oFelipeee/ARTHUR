const validateProducts = (req, res, next) =>{

    if(!nome || !prec || !quantidade){
        return res.status(400).json({
            msg: "Campos inválidos, revise meu caro amigo"
        });
    }
    return next();
};

const validateProductsId = (req, res, next) => {
    const { id } = req.params;

    if(!id){
        return res.status(400).json({
            msg: "Faltando parametro"
        });
    }
    return next();
};

module.exports = {validateProducts, validateProductsId};
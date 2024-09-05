const validateCliente = (req, res, next) => {
    const { nome, idade, email, CPF, telefone } = req.body;

    if (!nome || !idade || !email || !CPF || !telefone) {
        return res.status(400).json({
            msg: "Campos invalidos, revise caro amigo"
        });
    }

    return next();
};

const validateClienteId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            msg: "Parametro faltando"
        });
    }
    return next();
};

module.exports = { validateCliente, validateClienteId };
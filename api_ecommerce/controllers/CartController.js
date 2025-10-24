import models from '../models/index.js'
import resource from '../resources/index.js'
export default {
    list: async (req, res) => {
        try {
            let user_id = req.query.user_id;
            let CARTS = await models.Cart.find({
                user: user_id,
            }).populate('variedad').populate({
                path: 'product',
                populate: {
                        path: 'categorie'
                },
            });

            CARTS = CARTS.map((cart) => {
                return resource.Cart.cart_list(cart);
            });
            res.status(200).json({
                carts: CARTS,
            })
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN ERROR'
            });
            console.log(error);
        }
    },
    register: async (req, res) => {
        try {
            let data = req.body;
            // PRIMERO VANOS A VALIDAR SI EL PRODUCTO EXISTE EN EL EL CARRITO DE COMPRA
            if(data.variedad){
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    variedad: data.variedad,
                    product: data.product,
                });
                if(valid_cart){
                    res.status(200).json({
                        message: 403,
                        message_text: 'EL PRODUCTO CON LA VARIEDAD YA EXISTE EN EL CARRITO DE COMPRA',
                    })
                    return;
                }
            }else{
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    product: data.product,
                });
                if(valid_cart){
                    res.status(200).json({
                        message: 403,
                        message_text: 'EL PRODUCTO YA EXISTE EN EL CARRITO DE COMPRA',
                    })
                    return;
                }
            }

            //SEGUNDO VAMOS A VALIDAD SI EL STOCK ESTA DISPONIBLE
            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    _id: data.variedad,
                });
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: 'EL STOCK NO ESTA DISPONBLE',
                    })
                    return;
                }
            }else{
                let valid_product = await models.Product.findOne({
                    _id: data.product,
                });
                if(valid_product.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: 'EL STOCK NO ESTA DISPONBLE',
                    });
                    return;
                }
            }
            let CART = await models.Cart.create(data);

            let NEWCART = await models.Cart.findById({_id: CART._id}).populate('variedad').populate({
                path: 'product',
                populate: {
                    path: 'categorie'
                },
            });
            res.status(200).json({
                cart: resource.Cart.cart_list(NEWCART),
                message_text: 'EL CARRITO SE REGISTRO CON EXITO',
            })
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN ERROR'
            });
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {
            let data = req.body;

            //SEGUNDO VAMOS A VALIDAD SI EL STOCK ESTA DISPONIBLE
            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    _id: data.variedad,
                });
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: 'EL STOCK NO ESTA DISPONBLE',
                    })
                    return;
                }
            }else{
                let valid_product = await models.Product.findOne({
                    _id: data.product,
                });
                if(valid_product.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: 'EL STOCK NO ESTA DISPONBLE',
                    });
                    return;
                }
            }
            let CART = await models.Cart.findByIdAndUpdate({_id: data._id}, data);

            let NEWCART = await models.Cart.findById({_id: CART._id}).populate('variedad').populate({
                path: 'product',
                populate: {
                        path: 'categorie'
                },
            });
            res.status(200).json({
                cart: resource.Cart.cart_list(NEWCART),
                message_text: 'EL CARRITO SE ACTUALIZO CON EXITO',
            })
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN ERROR'
            });
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            let _id = req.params.id;
            let CART = await models.Cart.findByIdAndDelete({_id: id});
            res.status(200).json({
                message_text: 'EL CARRITO SE ELIMINO CON EXITO',
            });
        } catch (error) {
            res.status(500).send({
                message: 'OCURRIO UN ERROR'
            });
            console.log(error);
        }
    },
} 
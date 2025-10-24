import routerx from 'express-promise-router'
import User from './User.js'
import Categorie from './Categorie.js'
import Product from './Product.js'
import Slider from './Slider.js';
import Cupone from './Cupone.js';
import Discount from './Discount.js';
import Home from './Home.js';
import Cart from './Cart.js';

const router = routerx();
router.use('/users', User);
router.use('/categories', Categorie);
router.use('/products', Product);
router.use('/sliders', Slider);
router.use('/cupones', Cupone);
router.use('/discount', Discount);
router.use('/home', Home);
router.use('/cart', Cart);


export default router;
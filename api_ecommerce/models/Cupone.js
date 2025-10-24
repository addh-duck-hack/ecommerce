import mongoose, {Schema} from 'mongoose';

const CuponeSchema = new Schema({
    code : {type: String,maxlenght:50, required:true},
    type_discount : {type: Number,required:true,default: 1}, // por moneda 1 o por porcentaje 2
    discount : {type: Number,required:true},// por modeneda o por porcentaje
    type_count : {type: Number,required:true,default: 1}, // limitado 1 o limitado 2
    num_use: {type: Number,required:false},
    type_segment: {type: Number,required:false,default: 1}, // 1 es cupon por producto y 2 seria por categoria
    state: {type: Number,required:false,default: 1}, // 1 activo 2 inactivo
    products: [{type:Object}], // [{_id: asdsdas},{_id: asdggdas}]
    categories: [{type:Object}] 
},{
    timestamps: true,
})

const Cupone = mongoose.model("cupones",CuponeSchema);
export default Cupone;


import mongoose from "mongoose"

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        
    },
    categoria: {
        type: String,
        
    },
    precio: {
        type: Number,
       
    },
    stock: {
        type: Number,
        
    },
    owner: {
        type: String,
        
    },
})

const Product = mongoose.model('products', productoSchema)

export default Product
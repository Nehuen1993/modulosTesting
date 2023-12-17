import mongoose from "mongoose";
import config from "../config/config.js";

let Users;

switch (config.persistence) { 
    case "MONGO":
       
        mongoose.connect('mongodb+srv://nehuengiannone:Lz7n3cS0vO7ulfvk@cluster0.s1deur4.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        
        const { default: UsersMongo } = await import('./mongo/user.mongo.js');
        Users = UsersMongo;
        break;

        
    case "OTRO":
        const { default: UsersOtro } = await import('./otro/user.otro.js');
        Users = UsersOtro;
        break;

    default:
}

export { Users };



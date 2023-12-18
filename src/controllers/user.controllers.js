import { isValidatePassword } from '../../utils.js';
import productos from '../dao/mongo/models/Product.js';
import bcrypt from 'bcrypt';
import  { Users } from '../dao/factory.js';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';


const userServices = new Users();

export const getLogin = (req, res) => {
    res.render("login")
}

export const getRegister = (req, res) => {
    res.render("register")
}

export const getrecupero = (req, res) => {
    res.render("recupero")
}


export const getNuevaClave = (req, res) => {
    const token = req.params.token
    res.render("nuevaClave", { token })
}

export const postLogin = async (req, res) => {
        const { email, password } = req.body;
    if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" });
   console.log (userServices)
   
    const user = await userServices.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1 , isAdmin: 1, telefono: 1, _id: 1, isPremium: 1 });
    
        let products= await productos.find()
        req.session.products = products
        console.log (products)

    if (!user) {
        return res.status(400).render("login", { error: "Usuario no encontrado" });
    }

    if (!isValidatePassword(user, password)) {
        return res.status(401).render("login", { error: "Error en password" });
    }
    

    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        isAdmin: user.isAdmin,
        isPremium: user.isPremium,
        telefono: user.telefono,
        id: user._id
    };

    console.log (user)

    if (user.isAdmin == true || user.isPremium == true) {
        res.redirect("/api/sessions/admin");
        
    } else {
        res.redirect("/api/sessions/producto");
        
    }
    
}
    
export const getLogout = (req, res) => {
    delete req.session.user
    res.redirect("/api/sessions/login")
}



export const postRegister = async (req, res) => {
    const { first_name, last_name, email, age, password, telefono } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userServices.create({
        first_name,
        last_name,
        email,
        age,
        telefono,
        password: hashedPassword
  });

    console.log('Usuario registrado con éxito.' + user);
    res.status(200).send({ status: 'success', message: 'Producto actualizado con éxito'}).redirect('/api/sessions/login')

    
}



export const getFailRegister = (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
}



export const getFailLogin = (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
}

export const postRecupero = async (req, res) => {
    try {
      const { email } = req.body;
        
      const user = await userServices.findOne({ email });
  
      if (!user) {
        return res.render('recupero', { error: 'Correo electrónico no encontrado' });
      }
  
      const generateRecoveryToken = () => {
        return uuidv4();
      };

      console.log ("este es el toke" + generateRecoveryToken ())
  

    const recoveryToken = generateRecoveryToken();
    await userServices.updateOneByEmail(email, { $set: { recoveryToken, recoveryTokenExpire: Date.now() + 3600000 } });

  
     
      const recoveryLink = `http://localhost:8080/api/sessions/nuevaClave/${recoveryToken}`;
      await sendRecoveryEmail(email, recoveryLink);
      res.send ("Se ha enviado un enlace de recuperación a tu correo electrónico")
    
    } catch (error) {
      console.error(error);
      res.send ("Error al enviar el enlace de recuperación");
    }
  };

 const sendRecoveryEmail = async (email, recoveryLink) => {

  const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user:"nehuengiannone@gmail.com",
            pass:"akyh jumo zwqb etjg"
        }
    })
  

    const mailOptions = {
      from: 'nehuengiannone@gmail.com',
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${recoveryLink}`,
    };
  
    await transporter.sendMail(mailOptions);
  };

  export const postNuevaClave = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

   
        const user = await userServices.findOne({ recoveryToken: token });


        if (!user) {
            return res.redirect("/api/sessions/recupero");
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.send("La nueva contraseña no puede ser igual a la anterior");
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userServices.updateOne({ _id: user._id }, { $set: { password: hashedPassword, recoveryToken: null } });
        

        res.redirect("/api/sessions/login");
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).render('error', { message: 'Error al cambiar la contraseña. Por favor, inténtelo de nuevo más tarde.' });
    }
};
export const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("esto es el id" + id)
        const usuario = await userServices.findOne({ _id: id });
        console.log ("esto es el usuario" + usuario)

        if (!usuario) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }

      
        const nuevoEstadoPremium = !usuario.isPremium;
        await userServices.updateOne({ _id: id }, { $set: { isPremium: nuevoEstadoPremium } });

        res.status(200).json({ status: 'success', isPremium: nuevoEstadoPremium });
    } catch (error) {
        console.error('Error al cambiar el estado isPremium:', error);
        res.status(500).json({ status: 'error', message: 'Error al cambiar el estado isPremium' });
    }
};
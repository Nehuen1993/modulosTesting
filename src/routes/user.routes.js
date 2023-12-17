import { Router } from 'express';
import  { Users } from '../dao/factory.js';
import { getLogin, getRegister, postLogin, getLogout, postRegister, getFailRegister, getFailLogin, getrecupero, getNuevaClave, postRecupero, postNuevaClave, cambiarEstado } from '../controllers/user.controllers.js';


const router = Router();
const userServices = new Users();

router.get("/login", getLogin);
router.get ("/register", getRegister);
router.post ("/login", postLogin);
router.get ("/logout", getLogout)
router.post ("/register", postRegister)
router.get ("/failregister", getFailRegister)
router.get ("/faillogin", getFailLogin)
router.get ("/recupero", getrecupero);
router.post ("/recupero", postRecupero)
router.get ("/nuevaClave/:token", getNuevaClave);
router.post ("/nuevaClave/:token", postNuevaClave);
router.post('/premium/:id', cambiarEstado);


export default router
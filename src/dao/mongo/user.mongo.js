import usersModel from './models/Users.js'

export default class Users {
    constructor() {}

    async findOne(query, projection) {
        try {
            return await usersModel.findOne(query, projection);
        } catch (error) {
            throw new Error(`Error en la búsqueda del usuario: ${error}`);
        }
    }


async create(userData) {
    try {
        return await usersModel.create(userData);
    } catch (error) {
        throw new Error(`Error al crear un usuario: ${error}`);
    }
}
async updateOneByEmail(email, update) {
    try {
      return await usersModel.updateOne({ email }, update);
    } catch (error) {
      throw new Error(`Error al actualizar el usuario por correo electrónico: ${error}`);
    }
  }

async updateOne(query, update) {
    try {
      return await usersModel.updateOne(query, update);
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error}`);
    }

  }
}




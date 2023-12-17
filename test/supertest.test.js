import chai from "chai";
import supertest from "supertest";


const expect = chai.expect
const requester = supertest("http://localhost:8080")

describe("Test de integración", () => {
    describe ("actualizar produtos", () => {
        it ("/update", async () => {
            const mockProducto ={
                nombre: "prueba",
                categoria: "prueba",
                precio: 100,
                stock: 100,
                imagen: "prueba",
                id: "655005fb4c6fdbf9d7469fa1"
            } 
            
            const {
                statusCode,
                ok,
                _body
            } = await requester.put("/api/sessions/update").send(mockProducto)
            console.log(statusCode, ok, _body);
            })
        })
        
        describe('Test de integración', () => {
          it('/correo', async() => {
            const userData = {
              first_name: 'John',
              last_name: 'Doe',
              email: 'john.doe@example.com',
              telefono: '123456789',
            };
        
            const {
                statusCode,
                ok,
                _body
            }
        
            = await requester.put("/api/sessions/correo").send(userData)
            console.log(statusCode, ok, _body);
           
             
          });
        });
        
})



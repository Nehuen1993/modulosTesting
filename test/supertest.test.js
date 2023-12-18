import chai from "chai";
import supertest from "supertest";


const expect = chai.expect
const requester = supertest("http://localhost:8080")

describe("Test de integración", () => {
    describe ("actualizar produtos", () => {
        it ("prueba de /update ", async () => {
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
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
           
            })
        })

    describe('Get login', () => {
        it('prueba de /login', async() => {
          
            const {
                  statusCode,
                  ok,
                  _body
              }
          
            = await requester.get("/api/sessions/login")
              console.log(statusCode)
              console.log(ok)
              console.log(_body)
             
               
            });
        });
    
    describe('Post registro', () => {
        it('prueba de /postregistro', async() => {
              const userData = {
                first_name: 'user',
                last_name: 'test',
                email: "usertest@yopmail.com",
                age: "25",
                telefono:"1161081208",
                password: "1564896",
              };
          
              const {
                  statusCode,
                  ok,
                  _body
              }
          
              = await requester.post("/api/sessions/register").send(userData)
              console.log(statusCode)
              console.log(ok)
              console.log(_body)
             
               
            });
          });

    // describe('Post login', () => {
    //       it('prueba de /postlogin', async() => {
    //         const userData = {
    //             email: 'usertest@yopmail.com',  
    //             password: '1564896',
    //         };
        
    //         const {
    //             statusCode,
    //             ok,
    //             _body
    //         }
        
    //         = await requester.post("/api/sessions/login").send(userData)
    //         console.log(statusCode)
    //         console.log(ok)
    //         console.log(_body)
           
             
    //       });
    //     });
        
    // describe('Envio de mail', () => {
    //       it('prueba de /correo', async() => {
    //         const userData = {
    //           first_name: 'user',
    //           last_name: 'owner',
    //           email: "owner@yopmail.com",
    //           telefono: '1161081208'
    //         };
        
    //         const {
    //             statusCode,
    //             ok,
    //             _body
    //         }
        
    //         = await requester.post("/api/sessions/correo").send(userData)
    //         console.log(statusCode)
    //         console.log(ok)
    //         console.log(_body)
           
             
    //       });
    //     });

        // describe ("recupero de clave", () => {
        //     it ("prueba de /recupero", async () => {
        //         const mockmail ={
        //             email: "n.giannone@hotmail.com",
                  
        //         } 
                
        //         const {
        //             statusCode,
        //             ok,
        //             _body
        //         } = await requester.put("/api/sessions/recupero").send(mockmail)
        //         console.log(statusCode, ok, _body);
        //         })
        //     })
        //     describe ("agregar al carrito", () => {
        //         it ("prueba de /agregarCarrito ", async () => {
        //             this.timeout(5000)
        //             const mockProducto ={
        //                 id: "655005fb4c6fdbf9d7469fa1"
        //             } 
                    
        //             const {
        //                 statusCode,
        //                 ok,
        //                 _body
        //             } = await requester.post("/api/sessions/agregarCarrito").send(mockProducto)
        //             console.log(statusCode)
        //             console.log(ok)
        //             console.log(_body)
                   
        //             })
        //         })


              
        
})



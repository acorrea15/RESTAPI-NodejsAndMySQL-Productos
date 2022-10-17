import {Router} from 'express'; //Para poder crear toda una sección de rutas es como agrupar todas las rutas y colocarles un nombre
import {getProductos, createProducto, updateProducto, deleteProductos, getProducto} from '../controllers/Productos.controllers.js'
//Le digo a Express que tengo una especie de grupos de routers
const router = Router(); // Creo un enrutador que viene a partir de la ejecución del Router()

//router tiene todos los métodos: GET, PUT, POST, DELETE
 
//Endpoints para consultarlos desde la aplicación cliente (COA através del bot de ICF24)
router.get('/productos', getProductos);  

router.get('/productos/:id', getProducto);

router.post('/productos', createProducto);

/* router.put('/productos/:id', updateProducto); */
router.patch('/productos/:id', updateProducto);

router.delete('/productos/:id', deleteProductos);



//Ya terminé de escribir el código, entonces voy a exportarlo
export default router;
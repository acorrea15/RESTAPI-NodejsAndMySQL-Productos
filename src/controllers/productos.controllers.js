import {pool} from '../db.js'

//export const getProductos = (req, res) => res.send("Obteniendo los productos solicitados.");
export const getProductos = async (req, res) => { 
    try {
        /* throw new Error('DB ERROR!!') */
        const [rows] = await pool.query('SELECT * FROM t_productos  ORDER BY nombreProducto')
        res.json(rows);  
    } catch (error) {
        return res.status(500).json({
            message: 'Error. Reporte a Alfredo Correa para que adapte la API!'
        })
    }
};




export const getProducto = async (req, res) => { 
   try {
        const [rows] = await pool.query('SELECT * FROM t_productos WHERE id=? ORDER BY nombreProducto', [req.params.id]);
        
        if(rows.length <= 0){
            return res.status(404).json({"message": "No se encontró el Producto solicitado"})
        }
        res.json(rows[0]); //Los id deberían ser únicos  
   } catch (error) {
        return res.status(500).json({
            message: 'Error. Reporte a Alfredo para que adapte la API!'
        })
   }
};





//Toda operación con la base de dato es una consulta asíncrona
export const createProducto = async (req, res) => {
    /* res.send("Creando Producto...") */
    
    /* console.log(req.body) */ //En body tengo los datos que el cliente me envía al hacer la petición
    const {nombreProducto,descripcionProducto,marcaProducto,modeloProducto,categoriaProducto,precioProducto,nombreVendedor,estadoProducto,imagenProducto,stockDisponible} = req.body;

    console.log(nombreProducto, "<<<---nombreProducto")    
    
    try {
        if (nombreProducto.trim() === "" || precioProducto <= 0 || stockDisponible > 9999){
            res.status(500).json({error: 'There was an error.'});
        }
 
        const fechaAltaProducto = new Date();
        console.log(fechaAltaProducto, "<<<---fechaAltaProducto")    
    
        //Solo quiero las filas insertadas del objeto grande que devuelve el pool.query()

        const [rows] = await  pool.query(`INSERT INTO t_productos 
                                            (fechaAltaProducto,
                                            nombreProducto,
                                            descripcionProducto,
                                            marcaProducto,
                                            modeloProducto,
                                            categoriaProducto,
                                            precioProducto,
                                            nombreVendedor,
                                            estadoProducto,
                                            imagenProducto,
                                            stockDisponible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                                                fechaAltaProducto,
                                                nombreProducto,
                                                descripcionProducto,
                                                marcaProducto,
                                                modeloProducto,
                                                categoriaProducto,
                                                precioProducto,
                                                nombreVendedor,
                                                estadoProducto,
                                                imagenProducto,
                                                stockDisponible])
        /* res.send({rows}); */ //Coloco entre llaves para que pueda devolverlo como un objeto json
        res.send({
                 id: rows.insertId,
                 fechaAltaProducto,
                 nombreProducto,
                 descripcionProducto,
                 marcaProducto,
                 modeloProducto,
                 categoriaProducto,
                 precioProducto,
                 nombreVendedor,
                 estadoProducto,
                 imagenProducto,
                 stockDisponible});
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la inserción del producto en t_productos. Reporte a Alfredo!!!!'
        })
    }
    
};

export const updateProducto = async (req, res) => {
    /* res.send("Actualizando Productos...") */

    const {nombreProducto,
        descripcionProducto,
        marcaProducto,
        modeloProducto,
        categoriaProducto,
        precioProducto,
        nombreVendedor,
        estadoProducto,
        imagenProducto,
        stockDisponible} = req.body;
    
    try {
        const [result] = await pool.query(` UPDATE t_productos 
                                            SET nombreProducto = IfNull(?, nombreProducto),
                                                descripcionProducto =IfNull(?, descripcionProducto),
                                                marcaProducto = IfNull(?, marcaProducto),
                                                modeloProducto = IfNull(?, modeloProducto),
                                                categoriaProducto = IfNull(?, categoriaProducto),
                                                precioProducto = IfNull(?, precioProducto),
                                                nombreVendedor = IfNull(?, nombreVendedor),
                                                estadoProducto = IfNull(?, estadoProducto),
                                                imagenProducto = IfNull(?, imagenProducto),
                                                stockDisponible =IfNull(?, stockDisponible)  WHERE id = ?`, 
            [nombreProducto,
            descripcionProducto,
            marcaProducto,
            modeloProducto,
            categoriaProducto,
            precioProducto,
            nombreVendedor,
            estadoProducto,
            imagenProducto,
            stockDisponible, 
            req.params.id]);

        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Producto no encontrado. No se actualizó nada!'})
        }

        //Devuelvo el resultado modificado
        const [resultUpdated] = await pool.query('SELECT * FROM t_productos WHERE id = ?', [req.params.id])
        res.json(resultUpdated[0]); //Los id deberían ser únicos  

    } catch (error) {
        return res.status(500).json({
            message: 'Error en la actualización del producto. Reporte a Alfredo para adaptar la API!'
        })
    }
    
    
};


export const deleteProductos = async (req, res) => {
    try {
        /* res.send("Eliminando Productos."); */
        const [result] = await pool.query('DELETE FROM t_productos WHERE id=?', [req.params.id]);

        if (result.affectedRows <= 0){
            return res.status(404).json({message: 'Producto no encontrado. No se eliminó nada!'})
        }

        res.sendStatus(204); // Te envío tan solo un estado. El 204 significa que tdoo fue bien, pero no estoy respondiendo nada al cliente --> El cliente entenderá que sí pudo eliminar, pero no devuelve nada.

    } catch (error) {
        return res.status(500).json({
            message: 'Error en el delete. Reporte a Alfredo para adaptar la API!'
        })
    }   
 
}
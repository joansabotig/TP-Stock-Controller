var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();
var bodyparcer = require('body-parser');
app.use(bodyparcer.json());
app.use(bodyparcer.urlencoded({extended:true}));
app.use(upload.array());

var Sequelize = require('sequelize');
var sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/Stock");

app.listen(3000,function() 
{ 
    console.log('servidor funcionando!');
})

//evitar errores de XML policy

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
       next();
 });

 //Crear las entidades/clases





 //------------------------- R U B R O -----------------------------------

 var Rubro = sequelize.define("rubro", {
   nombre: {
       type: Sequelize.STRING
   },
   descripcion: {
       type: Sequelize.STRING
   }
})


app.get("/rubro/:id", function(req,res){
    Rubro.findById(req.params.id).then((rub)=>{
        res.send(rub)
    })
})

app.get("/rubro",function(req,res){
    Rubro.findAll().then(rub=>{
        res.send(rub.map(us=>us.get({plain:true})))
    })
})

app.post("/rubro",function(req,res){
    
    Rubro.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }).then( (result)=>{
        res.send(null);
    })
})

app.put("/rubro/:id",function(req,res){
    Rubro.update({
        nombre:req.body.nombre,
        descripcion:req.body.descripcion},
        {where:{id:req.params.id}})
        .then(result=>{
        res.send(null);
    })
})

app.patch("/rubro/:id",function(req,res){
    Rubro.update({
        nombre:req.body.nombre,
        descripcion:req.body.descripcion},
        {where:{id:req.params.id}})
        .then(result=>{
        res.send(null);
    })
})

app.delete("/rubro/:id",function(req,res){
    Rubro.destroy({where: {id:req.params.id}})
    .then(result=>{
    res.send(null);})
    
})

 //------------------------- A R T I C U L O -----------------------------------


 var Articulo = sequelize.define("articulo", {
    codigo: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    precio_compra: {
        type: Sequelize.DECIMAL
    },
    precio_venta: {
        type: Sequelize.DECIMAL
    },
    stock: {
        type: Sequelize.INTEGER
    },
    porc_iva: {
        type: Sequelize.DECIMAL
    },
    rubroId:{
        type: Sequelize.INTEGER
    }
})

Articulo.belongsTo(Rubro)

app.get("/articulo/:id", function(req,res){
    Articulo.findById(req.params.id,{atributes: ['id','nombre','descripcion','precio_compra','precio_venta','stock','porc_iva','rubroId']}).then((art)=>{
        res.send(art)
    })
})

app.get("/articulo",function(req,res){
    Articulo.findAll({atributes: ['id','nombre','descripcion','precio_compra','precio_venta','stock','porc_iva','rubroId']}).then(art=>{
        res.send(art)
    })
})

app.post("/articulo",function(req,res){
    
    Articulo.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio_compra: req.body.precio_compra,
        precio_venta: req.body.precio_venta,
        stock: req.body.stock,
        porc_iva: req.body.porc_iva
    }).then( (result)=>{
        Rubro.findById(req.body.rubroId).then( rub =>{
            result.setRubro(rub);
        })
        res.send(null);
    })
})

app.put("/articulo/:id",function(req,res){
    Articulo.update({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio_compra: req.body.precio_compra,
        precio_venta: req.body.precio_venta,
        stock: req.body.stock,
        porc_iva: req.body.porc_iva
    },
        {where:{id:req.params.id}})
        .then(result=>{
            Rubro.findById(req.body.rubroId).then( rub =>{
                result.setRubro(rub);
            })
        res.send(null);
    })
})

app.patch("/articulo/:id",function(req,res){
    Articulo.update({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio_compra: req.body.precio_compra,
        precio_venta: req.body.precio_venta,
        stock: req.body.stock,
        porc_iva: req.body.porc_iva
    },
        {where:{id:req.params.id}})
        .then(result=>{
            Rubro.findById(req.body.rubroId).then( rub =>{
                result.setRubro(rub);
            })
        res.send(null);
    })
})

app.delete("/articulo/:id",function(req,res){
    Articulo.destroy({where: {id:req.params.id}})
    .then(result=>{})
    res.send(null);
})

 //------------------------- C L I E N T E -----------------------------------

var Cliente = sequelize.define("cliente", {
    nombre: {
        type: Sequelize.STRING
    },
    cuenta: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    localidad: {
        type: Sequelize.STRING
    }
})

app.get("/cliente/:id", function(req,res){
    Cliente.findById(req.params.id).then((result)=>{
        res.send(result)
    })
})

app.get("/cliente",function(req,res){
    Cliente.findAll().then(result=>{
        res.send(result.map(re=>re.get({plain:true})))
    })
})

app.post("/cliente",function(req,res){
    
    Cliente.create({
        nombre: req.body.nombre,
        cuenta: req.body.cuenta,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        localidad: req.body.localidad
    }).then( (result)=>{
        res.send(null);
    })
})

app.put("/cliente/:id",function(req,res){
    Cliente.update({
        nombre: req.body.nombre,
        cuenta: req.body.cuenta,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        localidad: res.body.localidad
    },
        {where:{id:req.params.id}
    })
        .then(result=>{
        res.send(null);
    })
})

app.patch("/cliente/:id",function(req,res){
    Cliente.update({
        nombre: req.body.nombre,
        cuenta: req.body.cuenta,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        localidad: res.body.localidad
    },
        {where:{id:req.params.id}
    })
        .then(result=>{
        res.send(null);
    })
})

app.delete("/cliente/:id",function(req,res){
    Cliente.destroy({where: {id:req.params.id}})
    .then(result=>{
    res.send(null);})
    
})

 //------------------------- P R O V E E D O R -----------------------------------


var Proveedor = sequelize.define("proveedor", {
    numero_sucursal:{
        type: Sequelize.INTEGER
    },
    nombre: {
        type: Sequelize.STRING
    },
    cuenta: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    localidad: {
        type: Sequelize.STRING
    }
})

app.get("/proveedor/:id", function(req,res){
    Proveedor.findById(req.params.id).then((result)=>{
        res.send(result)
    })
})

app.get("/proveedor",function(req,res){
    Proveedor.findAll().then(result=>{
        res.send(result.map(re=>re.get({plain:true})))
    })
})

app.post("/proveedor",function(req,res){
    console.log(req)
    Proveedor.create({
        numero_sucursal: req.body.numero_sucursal,
        nombre: req.body.nombre,
        cuenta: req.body.cuenta,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        localidad: req.body.localidad
    }).then( (result)=>{
        res.send(null);
    })
})

app.put("/proveedor/:id",function(req,res){
    Proveedor.update({
        numero_sucursal: req.body.numero_sucursal,
        nombre: req.body.nombre,
        cuenta: req.body.cuenta,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        localidad: res.body.localidad
    },
        {where:{id:req.params.id}
    })
        .then(result=>{
        res.send(null);
    })
})

app.patch("/proveedor/:id",function(req,res){
    Proveedor.update({
        numero_sucursal: req.body.numero_sucursal,
        nombre: req.body.nombre,
        cuenta: req.body.cuenta,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        localidad: res.body.localidad
    },
        {where:{id:req.params.id}
    })
        .then(result=>{
        res.send(null);
    })
})

app.delete("/proveedor/:id",function(req,res){
    Proveedor.destroy({where: {id:req.params.id}})
    .then(result=>{
    res.send(null);})
    
})

 //------------------------- A R T I C U L O - - A G R E G A D O -----------------------------------



var ArticuloAgregado = sequelize.define("articulo_agregado",{
    cantidad:{
        type: Sequelize.INTEGER       
    },
    facturaId:
    {
        type: Sequelize.INTEGER
    },
    facturaCompraId:
    {
        type: Sequelize.INTEGER
    },
    nombre:
    {
        type: Sequelize.STRING
    },
    descripcion:
    {
        type: Sequelize.STRING
    },
    porc_iva:
    {
        type: Sequelize.DECIMAL
    },
    precio_compra:
    {
        type: Sequelize.DECIMAL
    },
    precio_venta:
    {
        type: Sequelize.DECIMAL
    },
    rubroId:
    {
        type:Sequelize.INTEGER
    },
    articuloId:
    {
        type: Sequelize.INTEGER
    }

})

ArticuloAgregado.belongsTo(Articulo,Factura,FacturaCompra)
// ArticuloAgregado.belongsTo(Factura)
// ArticuloAgregado.belongsTo(FacturaCompra)

app.get("/articulo_agregado/:id", function(req,res){
    ArticuloAgregado.findById(req.params.id).then((art)=>{
        res.send(art)
    })
})

app.get("/articulo_agregado",function(req,res){
    ArticuloAgregado.findAll().then(art=>{
        res.send(art)
    })
})

app.post("/articulo_agregado",function(req,res){
    
    ArticuloAgregado.create({
        cantidad: req.body.cantidad,
        facturaId: req.body.facturaId,//se puede quitar
        facturaCompraId: req.body.facturaCompraId,//se puede quitar
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        porc_iva: req.body.porc_iva,
        precio_compra: req.body.precio_compra,
        precio_venta: req.body.precio_venta,
        rubroId: req.body.rubroId,//se podria sacar con un  belongs To
        articuloId: req.body.articuloId //se podria sacar con un  belongs To
    }).then( (result)=>{
        Factura.findById(req.body.facturaId).then( fac =>{
            result.setFactura(fac);
        })
        FacturaCompra.findById(req.body.facturaCompraId).then( faccom =>{
            result.setFacturaCompra(faccom);
        })
        res.send(null);
    })
})

// app.put("/articulo_agregado/:id",function(req,res){
//     ArticuloAgregado.update({
//         cantidad: req.body.cantidad
//     },
//         {where:{id:req.params.id}})
//         .then(result=>{
//             Articulo.findById(req.body.articuloId).then( art =>{
//                 result.setArticulo(art);
//             })
//             Factura.findById(req.body.facturaId).then( fac =>{
//                 result.setFactura(fac);
//             })
//             FacturaCompra.findById(req.body.facturaCompraId).then( faccom =>{
//                 result.setFactura(faccom);
//             })
//         res.send(null);
//     })
// })

// app.patch("/articulo_agregado/:id",function(req,res){
//     ArticuloAgregado.update({
//         cantidad: req.body.cantidad
//     },
//         {where:{id:req.params.id}})
//         .then(result=>{
//             Articulo.findById(req.body.articuloId).then( art =>{
//                 result.setArticulo(art);
//             })
//             Factura.findById(req.body.facturaId).then( fac =>{
//                 result.setFactura(fac);
//             })
//             FacturaCompra.findById(req.body.facturaCompraId).then( faccom =>{
//                 result.setFactura(faccom);
//             })
//         res.send(null);
//     })
// })

app.delete("/articulo_agregado/:id",function(req,res){
    ArticuloAgregado.destroy({where: {id:req.params.id}})
    .then(result=>{})
    res.send(null);
})


 //------------------------- F A C T U R A -----------------------------------


var Factura = sequelize.define("factura",{
    numero_sucursal: {
        type: Sequelize.INTEGER
    },
    numero_factura: {
        type: Sequelize.INTEGER
    },
    total: {
        type: Sequelize.DECIMAL
    },
    iva: {
        type: Sequelize.DECIMAL
    },
    subtotal: {
        type: Sequelize.DECIMAL
    },
    fecha: {
        type: Sequelize.DATE
    },
    tipo:{
        type: Sequelize.STRING
    },
    clienteId:
    {
        type: Sequelize.INTEGER
    }
})
Factura.belongsTo(Cliente)


app.get("/factura/:id", function(req,res){
    Factura.findById(req.params.id,{atributes: ['id','numero_sucursal','numero_factura','total','iva','subtotal','fecha','tipo','clienteId']}).then((art)=>{
        res.send(art)
    })
})

app.get("/factura",function(req,res){
    Factura.findAll({atributes: ['id','numero_sucursal','numero_factura','total','iva','subtotal','fecha','tipo','clienteId']}).then(art=>{
        res.send(art)
    })
})

app.post("/factura",function(req,res){
    
    Factura.create({
        numero_sucursal:req.body.numero_sucursal,
        numero_factura: req.body.numero_factura,
        total:req.body.total,
        iva: req.body.iva,
        subtotal: req.body.subtotal,
        fecha: req.body.fecha,
        tipo: req.body.tipo
    }).then( (result)=>{
        Cliente.findById(req.body.clienteId).then( cli =>{
            result.setCliente(cli);
        })
        res.send(null);
    })
})


app.put("/factura/:id",function(req,res){
    Factura.update({
        numero_sucursal:req.body.numero_sucursal,
        numero_factura: req.body.numero_factura,
        total:req.body.total,
        iva: req.body.iva,
        subtotal: req.body.subtotal,
        fecha: req.body.fecha,
        tipo: req.body.tipo,
        clienteId:req.body.clienteId
    },
        {where:{id:req.params.id}})
        .then(result=>{
            Cliente.findById(req.body.clienteId).then( cli =>{
                result.setCliente(cli);
            })
        res.send(null);
    })
})

app.patch("/factura/:id",function(req,res){
    Factura.update({
        numero_sucursal:req.body.numero_sucursal,
        numero_factura: req.body.numero_factura,
        total:req.body.total,
        iva: req.body.iva,
        subtotal: req.body.subtotal,
        fecha: req.body.fecha,
        tipo: req.body.tipo,
        clienteId:req.body.clienteId
    },
        {where:{id:req.params.id}})
        .then(result=>{
            Cliente.findById(req.body.clienteId).then( cli =>{
                result.setCliente(cli);
            })
        res.send(null);
    })
})

app.delete("/factura/:id",function(req,res){
    Factura.destroy({where: {id:req.params.id}})
    .then(result=>{})
    res.send(null);
})



 //------------------------- F A C T U R A - - C O M P R A-----------------------------------



var FacturaCompra = sequelize.define("factura_compra",{
    fecha_factura: {
        type: Sequelize.DATE
    },
    numero_sucursal: {
        type: Sequelize.INTEGER
    },
    numero_factura: {
        type: Sequelize.INTEGER
    },
    total: {
        type: Sequelize.DECIMAL
    },
    iva: {
        type: Sequelize.DECIMAL
    },
    subtotal: {
        type: Sequelize.DECIMAL
    },
    fecha: {
        type: Sequelize.DATE
    },
    tipo:{
        type: Sequelize.STRING
    },
    proveedorId:
    {
        type: Sequelize.INTEGER
    }
})
FacturaCompra.belongsTo(Proveedor)


app.get("/factura_compra/:id", function(req,res){
    FacturaCompra.findById(req.params.id,{atributes: ['id','fecha_factura','numero_sucursal','numero_factura','total','iva','subtotal','fecha','tipo','proveedorId']}).then((fac)=>{
        res.send(fac)
    })
})

app.get("/factura_compra",function(req,res){
    FacturaCompra.findAll({atributes: ['id','fecha_factura','numero_sucursal','numero_factura','total','iva','subtotal','fecha','tipo','proveedorId']}).then(fac=>{
        res.send(fac)
    })
})

app.post("/factura_compra",function(req,res){
    
    FacturaCompra.create({
        fecha_factura:req.body.fecha_factura,
        numero_sucursal:req.body.numero_sucursal,
        numero_factura: req.body.numero_factura,
        total:req.body.total,
        iva: req.body.iva,
        subtotal: req.body.subtotal,
        fecha: req.body.fecha,
        tipo: req.body.tipo
    }).then( (result)=>{
        Proveedor.findById(req.body.proveedorId).then( pro =>{
            result.setProveedor(pro);
        })
        res.send(null);
    })
})


app.put("/factura_compra/:id",function(req,res){
    FacturaCompra.update({
        fecha_factura:req.body.fecha_factura,
        numero_sucursal:req.body.numero_sucursal,
        numero_factura: req.body.numero_factura,
        total:req.body.total,
        iva: req.body.iva,
        subtotal: req.body.subtotal,
        fecha: req.body.fecha,
        tipo: req.body.tipo,
        proveedorId:req.body.proveedorId
    },
        {where:{id:req.params.id}})
        .then(result=>{
            Proveedor.findById(req.body.proveedorId).then( pro =>{
                //result.setProveedor(pro);
            })
        res.send(null);
    })
})

app.patch("/factura_compra/:id",function(req,res){
    FacturaCompra.update({
        fecha_factura:req.body.fecha_factura,
        numero_sucursal:req.body.numero_sucursal,
        numero_factura: req.body.numero_factura,
        total:req.body.total,
        iva: req.body.iva,
        subtotal: req.body.subtotal,
        fecha: req.body.fecha,
        tipo: req.body.tipo,
        proveedorId:req.body.proveedorId
    },
        {where:{id:req.params.id}})
        .then(result=>{
            Proveedor.findById(req.body.proveedorId).then( pro =>{
                //result.setProveedor(pro);
            })
        res.send(null);
    })
})

app.delete("/factura_compra/:id",function(req,res){
    FacturaCompra.destroy({where: {id:req.params.id}})
    .then(result=>{})
    res.send(null);
})


sequelize.sync().then(()=>console.log('todas las tablas creadas'));


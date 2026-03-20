const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("productos.db");

db.prepare(`CREATE TABLE IF NOT EXISTS productos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
stock INTEGER,
precio REAL
)`).run();

if (db.prepare("SELECT COUNT(*) c FROM productos").get().c === 0) {
db.prepare("INSERT INTO productos(nombre,stock,precio) VALUES ('Teclado',10,15000),('Mouse',20,8000),('Monitor',5,120000)").run();
}

app.get("/productos",(req,res)=>{
res.json(db.prepare("SELECT * FROM productos").all());
});

app.get("/productos/:id",(req,res)=>{
const p=db.prepare("SELECT * FROM productos WHERE id=?").get(req.params.id);
res.json(p || {mensaje:"Producto no encontrado"});
});

app.listen(3000,()=>console.log("Servidor en puerto 3000"));
const { Router } = require("express");
const router = Router();
const {unlink} = require('fs-extra');
const path=require('path');

const db = require("../database"); //db hace referencia a la BBDD

router.get("/", async (req, res) => {
  const imagenes = await db.query("SELECT * FROM imagenes");
  res.render("index", { imagenes });
});

router.get("/upload", (req, res) => {
  res.render("upload", { layout: "main" });
});
router.post("/upload", async (req, res) => {
  var imagen = {};
  titulo = req.body.title;
  imagen.uuid = req.file.filename.split(".").shift();
  imagen.title = req.body.title;
  imagen.description = req.body.description;
  imagen.path = "/img/uploads/" + req.file.filename;
  imagen.filename = req.file.filename;
  imagen.originalname = req.file.originalname;
  imagen.mimetype = req.file.mimetype;
  imagen.size = req.file.size;
  console.log(imagen);
  await db.query("INSERT INTO imagenes set ?", [imagen]);
  res.redirect("/");
});
router.get("/imagen/:id",async (req, res) => {
    const uuid =req.params.id;
    const imag =  await db.query("SELECT * FROM imagenes where uuid = ?",uuid);
    //console.log(imag);
    res.render("profile",imag[0] );
});
router.get("/imagen/:id/delete", async(req, res) => {
    const id = req.params.id;
    console.log("=>"+id);
    const imagen =  await db.query("SELECT * FROM imagenes where uuid = ?",id);
    const rows =  await db.query("delete FROM imagenes where uuid = ?",id);
    console.log(imagen[0].path);
    //console.log(imagen);
    await unlink(path.resolve('src/public/'+imagen[0].path));
    res.redirect("/");
});


module.exports = router;

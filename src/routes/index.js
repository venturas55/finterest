const {Router}= require('express');
const router = Router();

const db = require("../database"); //db hace referencia a la BBDD

router.get('/',(req,res)=>{
    res.render('index');
} );

router.get('/upload',(req,res)=>{
    res.render('upload',{layout: 'main'});
});
router.post('/upload',async (req,res)=>{
    var imagen={};
    
titulo=req.body.title;
console.log("=>"+titulo);
    imagen.uuid=req.file.filename.split('.').shift();
    imagen.title=req.body.title;
    imagen.description=req.body.description;
    imagen.path=req.file.path;
    imagen.filename=req.file.filename;
    imagen.originalname=req.file.originalname;
    imagen.mimetype=req.file.mimetype;
    imagen.size=req.file.size;

    console.log(imagen);

    await db.query("INSERT INTO imagenes set ?", [imagen]);
    res.redirect("/"); 
});
router.get('/imagen/:id',(req,res)=>{
    res.render('upload',{layout: 'main'});
});

router.get("/image/:id/delete",(req,res)=>{
         // res.redirect("/profile");
   });

/*   router.post("/uploadprofile/:user",(req,res)=>{
    const { user } = req.params;
    console.log(req.file);
    res.redirect("/profile");
  }); */

module.exports=router;
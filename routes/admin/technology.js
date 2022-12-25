const { Router } = require("express");
const router = Router();
const multer = require("multer")
const Technologys = require("../../models/Technologys")
const path = require("path");
const fs = require("fs")

// GET METHOD TECHNOLOGYS
router.get("/technologys", async (req, res) => {
    const technologys = await Technologys.find({});
    res.render("admin/technology", {title: "Technology", technologys})
})

// GET METHOD ADD-TECHNOLOGY
router.get("/addEditTechnology", (req, res) => {
    res.render("admin/addEdit-technology", {title: "New instrument", technology: "Создать новый", editTech: false})
})

const image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/technologys/")
    },

    filename: function (req, file, cb) {
        const image_filename = Date.now() + file.originalname.split(" ").join("-");
        cb(null, image_filename)
    }
})

const upload = multer({storage: image_storage})

// POST METHOD ADD-TECHNOLOGY
router.post("/addTechnology", upload.single("technologyImg"), (req, res) => {
    
    if(!req.file) {
        req.flash("danger", "Не удалось загрузить изображение");
        res.render("admin/addEdit-technology", {title: "Произошла ошибка при вводе ваших данных", technology: "Создать новый"})
    } else {
        const technology = new Technologys({
            technologyImg: req.file
        })

        technology.save((err) => {
            if(err) console.log(err);
            else {
                req.flash("success", "Ваши данные успешно созданы")
                res.redirect("/admin/technologys")
            }
        })
    }
})

// GET METHOD DELETE-TECHNOLOGY
router.get("/deleteTechnology/:id", async (req, res) => {
    const tech = await Technologys.findById(req.params.id);
    if(tech.technologyImg) {
        let pathh = path.join(__dirname, `../../public/images/technologys/${tech.technologyImg.filename}`);
        if(fs.existsSync(pathh)) {
            fs.unlink(path.join(pathh), (err) => {
                if(err) console.log(err);
                else console.log("Ваша фотография успешна удалена");
            })
        }
    }
    await Technologys.findByIdAndDelete(req.params.id);
    req.flash("success", "Ваша фотография успешна удалена");
    res.redirect("/admin/technologys")
})

// GET METHOD EDIT-TECHNOLOGY
router.get("/editTechnology/:id", async (req, res) => {
    const techId = await Technologys.findById(req.params.id);
    res.render("admin/addEdit-technology", {title: "Edit instrument", technology: "Изменить", editTech: true, techId})
})


// POST METHOD EDIT-TECHNOLOGY
router.post("/editTechnology/:id", upload.single("technologyImg"), async (req, res) => {
    const techId = await Technologys.findById(req.params.id);
    if(req.file) {
        let pathh = path.join(__dirname, `../../public/images/technologys/${techId.technologyImg.filename}`);
        if(fs.existsSync(pathh)) {
            fs.unlink(path.join(pathh), err => {
                if(err) console.log(err);
                console.log("Изображение было удалено из базы данных");
            })
        }

        techId.technologyImg.filename = req.file;
        const techEdit = {};
        techEdit.technologyImg = req.file;
        await Technologys.findByIdAndUpdate(req.params.id, techEdit)
        req.flash("success", "Ваша фотография была успешно изменена");
        res.redirect("/admin/technologys")
    } else {
        res.redirect("/admin/technologys")
    }
})

// GET METHOD INFO-TECHNOLOGY
router.get("/technologyInfo/:id", async (req, res) => {
    const techId = await Technologys.findById(req.params.id);
    res.render("admin/technology-info", {title: "Info", techId})
})


module.exports = router;
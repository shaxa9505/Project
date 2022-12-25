const { Router } = require("express");
const router = Router();
const multer = require("multer");
const Skills = require("../../models/Skills");
const path = require("path");
const fs = require("fs")


// GET METHOD SKILLS
router.get("/skills", async (req, res) => {
    const skills = await Skills.find({});
    res.render("admin/skills", {title: "My skills", skills})
})

// GET METHOD SKILLS-ADD
router.get("/skillsAdd", async (req, res) => {
    res.render("admin/skills-add", {title: "New Skill", editSkill: false, skillTitle: "Создать новый"})
})

const image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/skills/")
    },

    filename: function (req, file, cb) {
        const image_filename = Date.now() + file.originalname.split(" ").join("-");
        cb(null, image_filename)
    }
})

const upload = multer({storage: image_storage});

// POST METHOD SKILLS-ADD
router.post("/skillsAdd", upload.single("skillImg"),  (req, res) => {
        
        if(!req.file) {
            req.flash("danger", "Не удалось загрузить изображение")
            res.render("admin/skills-add", {title: "Произошла ошибка при вводе ваших данных", skillTitle: "Создать новый"})
        } else {

            const skills = new Skills({
                skillsImg: req.file
            })
    
            skills.save((err) => {
                if(err) {
                    console.log(err);
                } 
                else {
                    req.flash("success", "Ваши данные успешно созданы")
                    res.redirect("/admin/skills")
                }
            })
        }

})

// GET METHOD SKILLS-INFO
router.get("/skillsInfo/:id", async (req, res) => {
    const skills = await Skills.findById(req.params.id);
    res.render("admin/skills-info", {title: "Info", skills})
})


// GET METHOD SKILLS-EDIT
router.get("/editSkill/:id", async (req, res) => { 
    const skillsId = await Skills.findById(req.params.id);
    console.log({skillsId: skillsId});
    res.render("admin/skills-add", {title: "Edit Skill", editSkill: true, skillTitle: "Изменить", skillsId})
})

router.post("/skillsEdit/:id", upload.single("skillImg"), async (req, res) => {
    const skills = await Skills.findById(req.params.id);
    
    if(req.file) {
        let pathh = path.join(__dirname, `../../public/images/skills/${skills.skillsImg.filename}`);
        if(fs.existsSync(pathh)) {
            fs.unlink(path.join(pathh), err => {
                if(err) console.log(err);
                console.log("Изображение было удалено из базы данных");
            })
        }

        skills.skillsImg.filename = req.file;
        const skillEdit = {};
        skillEdit.skillsImg = req.file;
        await Skills.findByIdAndUpdate(req.params.id, skillEdit)
        req.flash("success", "Ваша фотография была успешно изменена");
        res.redirect("/admin/skills")
    } else {
        res.redirect("/admin/skills")
    }


})

// GET METHOD SKILLS-DELETE
router.get("/deleteSkill/:id", async (req, res) => {
    const skill = await Skills.findById(req.params.id);
    
    if(skill.skillsImg) {
        let pathh = path.join(__dirname, `../../public/images/skills/${skill.skillsImg.filename}`)
        if(fs.existsSync(pathh)) {
            fs.unlink(path.join(pathh), err => {
                if(err) console.log(err);
                else console.log("Ваши фотографии успешны удален");
            })
        }
    }

    await Skills.findByIdAndDelete(req.params.id);
    req.flash("success", "Ваши данные успешно удалены");
    res.redirect("/admin/skills")
})

module.exports = router;
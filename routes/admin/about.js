const { Router } = require("express");
const router = Router();
const About = require("../../models/About")
const multer = require("multer");
const { check, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs")


const image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/about/")
    },

    filename: function (req, file, cb) {
        const image_filename = Date.now() + file.originalname.split(" ").join("-")
        cb(null, image_filename)
    }
})

const upload = multer({ storage: image_storage });
const multiUpload = upload.fields([
    { name: "filefon", maxCount: 1 }
])

router.get("/about", async (req, res) => {
    const abouts = await About.find({});
    res.render("admin/about", { title: "About", abouts});
})

router.get("/info/:id", async (req, res) => {
    const about = await About.findById(req.params.id);
    const abouts = [about];
    res.render("admin/about-info", { title: "Info", abouts })
})

router.get("/newAddAbout", (req, res) => {
    res.render("admin/about-add", { title: "New About", edit: "Создать новый" })
})

router.post("/newAddAbout",
    multiUpload,
    [
        check("titleru").isLength({ min: 3, max: 50 }).withMessage("Ваш заголовок должен содержать от 3 до 50 символов"),
        check("titleen").isLength({ min: 3, max: 50 }).withMessage("Your title must be between 3 and 50 characters long"),
        check("textru").isLength({ min: 10 }).withMessage("Информация о вас должна быть не менее 10 слов"),
        check("texten").isLength({ min: 10 }).withMessage("Information about you must be at least 10 words")
    ],
    async (req, res) => {
        const { titleru, titleen, textru, texten } = req.body;

        let errors = validationResult(req);

        let handleError = !errors.isEmpty();

        const aboutImages = [];
        if (req.files["filefon"]) aboutImages.push(req.files["filefon"][0])

        if (aboutImages.length === 0) {
            let errImg = {
                value: undefined,
                msg: 'Не удалось загрузить изображение',
                param: 'filefon',
                location: 'body'
            };
            errors.errors.push(errImg);
        }

        if (handleError || aboutImages.length === 0) {

            if(aboutImages) {
                aboutImages.forEach(item => {
                    let pathh = path.join(__dirname, `../../public/images/about/${item.filename}`);
                    if(fs.existsSync(pathh)) {
                        fs.unlink(path.join(pathh), (err) => {
                            if(err) console.log(err);
                            console.log("Изображение удалено");
                        })
                    }
                })
            }
            res.render("admin/about-add", { errors: errors.errors, title: "Произошла ошибка при вводе ваших данных", titleru, titleen, textru, texten, edit: "Создать новый" })
        } else {
            const about = new About({
                aboutTitle: { ru: titleru, en: titleen },
                aboutMe: { ru: textru, en: texten },
                aboutImg: aboutImages   
            })

            about.save((err) => {
                if (err) console.log(err);
                else 
                    req.flash("success", "Ваши данные успешно созданы");
                    res.redirect("/admin/about");
                
            })
        }
})

router.get("/edit/:id", async (req, res) => {
    const abouts = await About.findById(req.params.id);
    res.render("admin/about-add", {title: "Edit", edit: "Изменить", editActive: true, abouts})
})

router.post("/edit/:id",
    multiUpload,
    [
        check("titleru").isLength({ min: 3, max: 50 }).withMessage("Ваш заголовок должен содержать от 3 до 50 символов"),
        check("titleen").isLength({ min: 3, max: 50 }).withMessage("Your title must be between 3 and 50 characters long"),
        check("textru").isLength({ min: 10 }).withMessage("Информация о вас должна быть не менее 10 слов"),
        check("texten").isLength({ min: 10 }).withMessage("Information about you must be at least 10 words")
    ],
    async (req, res) => {
        const { titleru, titleen, textru, texten } = req.body;

        let errors = validationResult(req);
        let handleError = !errors.isEmpty();

        const about = await About.findById(req.params.id);
        const aboutImages = [...about["aboutImg"]];

        for(let i = 0; i < 1; i++) {
            if(req.files["filefon"]) {
                if(aboutImages.length >= i) {
                    const pathh = path.join(__dirname, `../../public/images/about/${about["aboutImg"][i].filename}`)
                    if(fs.existsSync(pathh)) {
                        fs.unlink(path.join(pathh), (err) => {
                            if(err) console.log(err);
                            console.log("Изображение было удалено из базы данных.");
                        })
                    }
                    
                    aboutImages[i] = req.files["filefon"]["0"];
                } else {
                    aboutImages.push(req.files["filefon"]["0"])
                }
            }
        }

        if (handleError) {
            if(aboutImages) {
                aboutImages.forEach(item => {
                    let pathh = path.join(__dirname, `../../public/images/about/${item.filename}`);
                    if(fs.existsSync(pathh)) {
                        fs.unlink(path.join(pathh), (err) => {
                            if(err) console.log(err);
                            console.log("Изображение удалено");
                        })
                    }
                })
            }
            res.render("admin/about-add", { errors: errors.errors, title: "Произошла ошибка при вводе ваших данных", edit: "Изменить", editActive: true, titleru, titleen, textru, texten })
        } else {

            const aboutEdit = {};
            aboutEdit.aboutTitle = { ru: titleru, en: titleen };
            aboutEdit.aboutMe = { ru: textru, en: texten };
            aboutEdit.aboutImg = aboutImages;

            await About.findOneAndUpdate(req.params.id, aboutEdit)
            req.flash("success", "Ваша информация была успешно изменена");
            res.redirect("/admin/about");
        }
})

router.get("/delete/:id", async (req, res) => {
    const about = await About.findById(req.params.id);
    
    if(about.aboutImg) {
        about.aboutImg.forEach(item => {
            let pathh = path.join(__dirname, `../../public/images/about/${item.filename}`);
            if(fs.existsSync(pathh)) {
                fs.unlink(path.join(pathh), (err) => {
                    if(err) console.log(err);
                    else console.log("Ваши фотографии успешны удален"); 
                })
            }
        })
    }

    await About.findByIdAndDelete(req.params.id)
    req.flash("success","Ваши данные успешно удалены");
    res.redirect("/admin/about");
})


module.exports = router;
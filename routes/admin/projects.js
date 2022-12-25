const { Router } = require("express");
const router = Router();
const Projects = require("../../models/Projects")
const multer = require("multer");
const { check, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

router.get("/projects", async (req, res) => {
    const projects = await Projects.find({});
    res.render("admin/projects", { title: "Projects", projects })
})

router.get("/projectAdd", (req, res) => {
    res.render("admin/project-add-edit", { title: "New Project", projectTitle: "Создать новый", editProject: false })
})


const image_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/projects/")
    },
    filename: function (req, file, cb) {
        const image_filename = Date.now() + file.originalname.split(" ").join("-");
        cb(null, image_filename)
    }
})

const upload = multer({ storage: image_storage })

router.post("/projectAdd", upload.single("projectImg"),
    [
        check("titleSite").isLength({ min: 5, max: 50 }).withMessage("Название вашего веб-сайта должно содержать от 5 до 50 символов"),
        check("link").isLength({ min: 5, max: 50 }).withMessage("Ссылка вашего веб-сайта должна содержать от 5 до 50 символов"),
    ], async (req, res) => {

        const { titleSite, link } = req.body;

        let errors = validationResult(req);

        let handleError = !errors.isEmpty();

        if (!req.file) {
            let errImg = {
                value: undefined,
                msg: 'Не удалось загрузить изображение',
                param: 'projectImg',
                location: 'body'
            }
            errors.errors.push(errImg)
        }

        if (handleError || !req.file) {
            if (req.file) {
                let pathh = path.join(__dirname, `../../public/images/projects/${req.file.filename}`);
                if (fs.existsSync(pathh)) {
                    fs.unlink(path.join(pathh), err => {
                        if (err) console.log(err);
                        console.log("Изображение удалено");
                    })
                }
            }

            res.render("admin/project-add-edit", { title: "Произошла ошибка при вводе ваших данных", errors: errors.errors, projectTitle: "Создать новый", titleSite, link })
        } else {
            const projects = new Projects({
                projectTitle: titleSite,
                projectLink: link,
                projectImg: req.file
            })

            projects.save(err => {
                if (err) console.log(err);
                else {
                    req.flash("success", "Ваши данные успешно созданы");
                    res.redirect("/admin/projects")
                }
            })
        }
})

router.get("/projectInfo/:id", async (req, res) => {
    const projectId = await Projects.findById(req.params.id);
    const projects = [projectId];
    res.render("admin/projectInfo", { title: "Info", projects })
})

router.get("/deleteProject/:id", async (req, res) => {
    const deleteProject = await Projects.findById(req.params.id);

    if (deleteProject.projectImg) {
        let pathh = path.join(__dirname, `../../public/images/projects/${deleteProject.projectImg.filename}`);
        if (fs.existsSync(pathh)) {
            fs.unlink(path.join(pathh), err => {
                if (err) console.log(err);
                else {
                    console.log("Ваши фотографии успешны удален");
                }
            })
        }
    }

    await Projects.findByIdAndDelete(req.params.id);
    req.flash("success", "Ваши данные успешно удалены")
    res.redirect("/admin/projects");
})

router.get("/editProject/:id", async (req, res) => {
    const projectId = await Projects.findById(req.params.id)
    res.render("admin/project-add-edit", { title: "Edit Project", projectTitle: "Изменить", editProject: true, projectId })
})

router.post("/editProject/:id", upload.single("projectImg"),
    [
        check("titleSite").isLength({ min: 5, max: 50 }).withMessage("Название вашего веб-сайта должно содержать от 5 до 50 символов"),
        check("link").isLength({ min: 5, max: 50 }).withMessage("Ссылка вашего веб-сайта должна содержать от 5 до 50 символов")
    ],
    async (req, res) => {
        
        
        let errors = validationResult(req);
        let handleError = !errors.isEmpty();
        
        const projectId = await Projects.findById(req.params.id);

        if(req.file && !handleError) {
            let pathh = path.join(__dirname, `../../public/images/projects/${projectId.projectImg.filename}`);
            if(fs.existsSync(pathh)) {
                fs.unlink(path.join(pathh), err => {
                    if(err) console.log(err);
                    console.log("Изображение было удалено из базы данных");
                })
            }

            projectId.projectImg.filename = req.file;
        }

        if(handleError) {
            if(req.file) {
                let pathh = path.join(__dirname, `../../public/images/projects/${req.file.filename}`);
                if(fs.existsSync(pathh)) {
                    fs.unlink(path.join(pathh), err => {
                        if(err) console.log(err);
                        console.log("Изображение удалено");
                    })
                }
            }
            res.render("admin/project-add-edit", { errors: errors.errors, title: "Произошла ошибка при вводе ваших данных", projectTitle: "Изменить", editProject: true, projectId })
        } else {
            const { titleSite, link } = req.body;
            const editProject = {};
            editProject.projectTitle = titleSite;
            editProject.projectLink = link;
            editProject.projectImg = req.file;

            await Projects.findByIdAndUpdate(req.params.id, editProject);
            req.flash("success", "Ваша информация была успешно изменена");
            res.redirect("/admin/projects")
        }
    })


module.exports = router;
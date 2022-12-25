const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();
const Networks = require("../../models/Networks")

router.get("/networks", async (req, res) => {
    const networks = await Networks.find({});
    res.render("admin/networks", { title: "Networks", networks })
})

router.get("/networkAdd", (req, res) => {
    res.render("admin/network-add-edit", { title: "Create new", networkTitle: "Создать новый", networkEdit: false })
})

router.post("/networkAdd",
    [
        check("networkIcon").isLength({ min: 5, max: 30 }).withMessage("Символ вашей социальной сети должен быть от 5 до 30 символов"),
        check("networkLink").isLength({ min: 10, max: 70 }).withMessage("Ссылка на социальную сеть должна быть от 10 до 70 символов."),
    ], (req, res) => {
        const { networkIcon, networkLink } = req.body;

        let errors = validationResult(req);
        let handleError = !errors.isEmpty();

        if (handleError) {
            res.render("admin/network-add-edit", { title: "Произошла ошибка при вводе ваших данных", errors: errors.errors, networkTitle: "Создать новый", networkIcon, networkLink, networkEdit: false })
        } else {
            const networks = new Networks({
                networkIcon,
                networkLink
            })

            networks.save(err => {
                if (err) console.log(err);
                else {
                    req.flash("success", "Ваши данные успешно созданы")
                    res.redirect("/admin/networks")
                }
            })
        }
    })
// networkEdit: false
router.get("/editNetwork/:id", async (req, res) => {
    const networks = await Networks.findById(req.params.id);
    res.render("admin/network-add-edit", { title: "Edit Network", networkEdit: true, networkTitle: "Изменить", networks })
})

router.post("/editNetwork/:id",
    [
        check("networkIcon").isLength({ min: 5, max: 30 }).withMessage("Символ вашей социальной сети должен быть от 5 до 30 символов"),
        check("networkLink").isLength({ min: 10, max: 70 }).withMessage("Ссылка на социальную сеть должна быть от 10 до 70 символов.")
    ],
    async (req, res) => {
        const networks = await Networks.findById(req.params.id)
        let errors = validationResult(req);
        let handleError = !errors.isEmpty();
        
        if (handleError) {
            res.render("admin/network-add-edit", { title: "Произошла ошибка при вводе ваших данных", errors: errors.errors, networkEdit: true, networkTitle: "Изменить", networks })
        } else {
            const { networkIcon, networkLink } = req.body;
            const editNetwork = {};
            editNetwork.networkIcon = networkIcon;
            editNetwork.networkLink = networkLink;

            await Networks.findByIdAndUpdate(req.params.id, editNetwork);
            req.flash("success", "Ваши данные успешно изменены")
            res.redirect("/admin/networks")
        }
    })

router.get("/deleteNetwork/:id", async (req, res) => {
    await Networks.findByIdAndDelete(req.params.id);
    req.flash("success", "Ваши данные успешно удалены")
    res.redirect("/admin/networks");
})

router.get("/networkInfo/:id", async (req, res) => {
    const networkId = await Networks.findById(req.params.id);
    const networks = [networkId];
    res.render("admin/networkInfo", { title: "Info", networks })
})

module.exports = router;
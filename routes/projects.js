const { Router } = require("express");
const router = Router();
const Projects = require("../models/Projects")
const Networks = require("../models/Networks")


router.get("/portfolio", async (req, res) => {
    const projects = await Projects.find({});
    const networks = await Networks.find({});
    res.render("projects", {title: "Projects", projects, networks, headerNavbar: true, footerStyle: false})
})


module.exports = router;
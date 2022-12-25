const { Router } = require("express");
const About = require("../../models/About");
const Projects = require("../../models/Projects");
const Skills = require("../../models/Skills");
const Technologys = require("../../models/Technologys");
const Networks = require("../../models/Networks");
const router = Router();


router.get("/", async (req, res) => {
    const aboutsCount = await About.find().countDocuments();
    const skillsCount = await Skills.find().countDocuments();
    const techsCount = await Technologys.find().countDocuments();
    const projectsCount = await Projects.find().countDocuments();
    const networksCount = await Networks.find().countDocuments();
    res.render("admin/index", {title: "Admin Panel", aboutsCount, skillsCount, techsCount, projectsCount, networksCount});
})


module.exports = router;
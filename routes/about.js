const express = require('express');
const router = express.Router();
const About = require("../models/About")
const Skills = require("../models/Skills");
const Technologys = require('../models/Technologys');
const Networks = require('../models/Networks');

router.get("/about", async (req, res) => {
    const abouts = await About.find({});
    const skills = await Skills.find({});
    const techs = await Technologys.find({});
    const networks = await Networks.find({});
    res.render("about", {title: "About me", abouts, skills, techs, networks, headerNavbar: true, footerStyle: false})
})


module.exports = router;
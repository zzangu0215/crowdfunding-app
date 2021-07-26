const router = require("express").Router();
const { User, Project } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll();
    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      projects,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/project/:id", (req, res) => {
  // If user logged they are redirected to homepage

  res.render("project");
});

router.get("/profile", (req, res) => {
  // If user logged they are redirected to homepage

  res.render("profile");
});

router.get("/login", (req, res) => {
  // If user logged they are redirected to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;

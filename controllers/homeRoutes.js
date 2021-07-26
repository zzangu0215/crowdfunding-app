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
router.get("/project/:id", withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with that id!" });
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }

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

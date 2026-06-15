const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsBySubcategory,
} = require("../controllers/projectController");

// CREATE
router.post("/", upload.single("file"), createProject);

// GET ALL
router.get("/", getProjects);

// CATEGORY + SUBCATEGORY
router.get("/:category/:subcategory", getProjectsBySubcategory);

// GET SINGLE
router.get("/:id", getProjectById);

// UPDATE
router.put("/:id", upload.single("file"), updateProject);

// DELETE
router.delete("/:id", deleteProject);

module.exports = router;
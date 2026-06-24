const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createProject,
  getProjects,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsBySubcategory,
} = require("../controllers/projectController");

// Public — with pagination
router.get("/", getProjects);

// Admin — no pagination (sab projects)
router.get("/all", getAllProjects);

// Subcategory filter — with pagination
router.get("/:category/:subcategory", getProjectsBySubcategory);

// Single project
router.get("/:id", getProjectById);

router.post("/", upload.single("file"), createProject);
router.put("/:id", upload.single("file"), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
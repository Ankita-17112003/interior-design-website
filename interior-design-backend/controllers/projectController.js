const Project = require("../models/Project");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");

// Helper — Cloudinary URL se public_id nikalo
// e.g. https://res.cloudinary.com/demo/image/upload/v123/interior-projects/abc.jpg
// → interior-projects/abc
const getPublicId = (url) => {
  if (!url) return null;
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;
    // version skip karo (v1234567)
    const afterUpload = parts.slice(uploadIndex + 1);
    if (afterUpload[0]?.startsWith("v")) afterUpload.shift();
    // extension remove karo (.jpg, .png etc)
    const last = afterUpload[afterUpload.length - 1];
    afterUpload[afterUpload.length - 1] = last.replace(/\.[^/.]+$/, "");
    return afterUpload.join("/");
  } catch (e) {
    return null;
  }
};

// CREATE
const createProject = async (req, res) => {
  try {
    const { title, location, category, subcategory, youtubeUrl } = req.body;

    // ── YouTube project ──
    if (youtubeUrl && youtubeUrl.trim() !== "") {
      const project = await Project.create({
        title,
        location,
        category: slugify(category, { lower: true }),
        subcategory: slugify(subcategory, { lower: true }),
        youtubeUrl: youtubeUrl.trim(),
        src: "",
        type: "youtube",
      });
      return res.status(201).json(project);
    }

    // ── Image project (Cloudinary) ──
    if (!req.file) {
      return res.status(400).json({ message: "Image file ya YouTube URL required hai" });
    }

    const project = await Project.create({
      title,
      location,
      category: slugify(category, { lower: true }),
      subcategory: slugify(subcategory, { lower: true }),
      src: req.file.path,
      type: "image",
      youtubeUrl: "",
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const { title, location, category, subcategory, youtubeUrl } = req.body;

    project.title = title || project.title;
    project.location = location || project.location;
    project.category = slugify(category || project.category, { lower: true });
    project.subcategory = slugify(subcategory || project.subcategory, { lower: true });

    // Update to YouTube
    if (youtubeUrl && youtubeUrl.trim() !== "") {
      project.youtubeUrl = youtubeUrl.trim();
      project.type = "youtube";
      project.src = "";
    }
    // Update to image
    else if (req.file) {
      project.src = req.file.path;
      project.type = "image";
      project.youtubeUrl = "";
    }

    const updated = await project.save();
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Cloudinary se image delete karo (sirf image type ke liye)
    if (project.type === "image" && project.src) {
      const publicId = getPublicId(project.src);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary image deleted:", publicId);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUBCATEGORY FILTER
const getProjectsBySubcategory = async (req, res) => {
  try {
    const projects = await Project.find({
      category: req.params.category,
      subcategory: req.params.subcategory,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsBySubcategory,
};
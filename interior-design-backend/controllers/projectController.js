const Project = require("../models/Project");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");

const getPublicId = (url) => {
  if (!url) return null;
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;
    const afterUpload = parts.slice(uploadIndex + 1);
    if (afterUpload[0]?.startsWith("v")) afterUpload.shift();
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

    if (youtubeUrl && youtubeUrl.trim() !== "") {
      const project = await Project.create({
        title, location,
        category: slugify(category, { lower: true }),
        subcategory: slugify(subcategory, { lower: true }),
        youtubeUrl: youtubeUrl.trim(),
        src: "", type: "youtube",
      });
      return res.status(201).json(project);
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file ya YouTube URL required hai" });
    }

    const project = await Project.create({
      title, location,
      category: slugify(category, { lower: true }),
      subcategory: slugify(subcategory, { lower: true }),
      src: req.file.path,
      type: "image", youtubeUrl: "",
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL — with pagination
const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const total = await Project.countDocuments();
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      projects,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
      hasMore: page < Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL — no pagination (admin ke liye)
const getAllProjects = async (req, res) => {
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

    if (youtubeUrl && youtubeUrl.trim() !== "") {
      project.youtubeUrl = youtubeUrl.trim();
      project.type = "youtube";
      project.src = "";
    } else if (req.file) {
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

// SUBCATEGORY FILTER — with pagination
const getProjectsBySubcategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const query = {
      category: req.params.category,
      subcategory: req.params.subcategory,
    };

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      projects,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
      hasMore: page < Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsBySubcategory,
};
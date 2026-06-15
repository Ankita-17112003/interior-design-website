const Service = require("../models/Service");
const slugify = require("slugify");

// GET ALL SERVICES
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE SERVICE BY SLUG
const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE SERVICE (Admin)
const createService = async (req, res) => {
  try {
    const { name, description, icon, order, subServices } = req.body;

    const slug = slugify(name, { lower: true });

    // parse subServices if sent as JSON string
    let parsedSubServices = [];
    if (subServices) {
      parsedSubServices = typeof subServices === "string"
        ? JSON.parse(subServices)
        : subServices;

      // auto-generate slug for each subservice
      parsedSubServices = parsedSubServices.map((s) => ({
        ...s,
        slug: slugify(s.name, { lower: true }),
      }));
    }

    const service = await Service.create({
      name,
      slug,
      description,
      icon,
      order,
      image: req.file ? req.file.path : "",
      subServices: parsedSubServices,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE SERVICE (Admin)
const updateService = async (req, res) => {
  try {
    const { name, description, icon, order, isActive, subServices } = req.body;

    const updateData = { description, icon, order, isActive };

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name, { lower: true });
    }

    if (subServices) {
      let parsed = typeof subServices === "string"
        ? JSON.parse(subServices)
        : subServices;

      updateData.subServices = parsed.map((s) => ({
        ...s,
        slug: slugify(s.name, { lower: true }),
      }));
    }

    if (req.file) updateData.image = req.file.path;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE SERVICE (Admin)
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
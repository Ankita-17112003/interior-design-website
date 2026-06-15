const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");

router.post("/", submitContact);                              // public
router.get("/", protect, getContacts);                       // admin
router.put("/:id", protect, updateContactStatus);            // admin
router.delete("/:id", protect, deleteContact);               // admin

module.exports = router;
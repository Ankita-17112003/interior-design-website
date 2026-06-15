const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// SUBMIT CONTACT FORM
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Save to DB
    const contact = await Contact.create({ name, email, phone, service, message });

    // ── Email to CLIENT (business owner) ──
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.CLIENT_EMAIL,
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9922a; border-bottom: 2px solid #c9922a; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; width: 30%;">Name</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold;">Email</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Phone</td>
              <td style="padding: 10px;">${phone || "Not provided"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold;">Service</td>
              <td style="padding: 10px;">${service || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Message</td>
              <td style="padding: 10px;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // ── Confirmation email to USER ──
   try {
  await transporter.sendMail({
    from: `"Chandak And Associates" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank you for contacting us!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c9922a;">Thank You, ${name}!</h2>
        <p>We have received your enquiry and will get back to you as soon as possible.</p>
        <div style="background: #fff8f0; padding: 16px; border-left: 4px solid #c9922a; margin: 20px 0;">
          <p><strong>Your message:</strong></p>
          <p>${message}</p>
        </div>
        <p>Best regards,<br/><strong>Chandak And Associates</strong></p>
      </div>
    `,
  });
} catch (err) {
  console.log("Confirmation email failed:", err.message);
}

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: contact,
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL CONTACTS (Admin)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE STATUS (Admin)
const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE CONTACT (Admin)
const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
transporter.verify((error, success) => {
  if (error) {
    console.log("EMAIL ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY");
  }
});

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
};
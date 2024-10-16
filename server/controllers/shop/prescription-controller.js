const { imageUploadUtil } = require("../../helpers/cloudinary");
const Prescription = require("../../models/Prescription");

const handlePrescriptionUpload = async (req, res) => {
    //   console.log(
    //     `handle prescription upload  access user in controleer ${req.body}`
    //   );

  try {
    const { name, mobile, address, userId } = req.body;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    

    // Create a new prescription linked to the authenticated user (assumed to be req.user._id)
    const prescription = new Prescription({
      userId: userId, // Link the prescription to the logged-in user
      name,
      mobile,
      address,
      prescriptionImage: result.secure_url,
    });

    await prescription.save();

    res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while processing the prescription",
    });
  }
};

// Get all prescriptions associated with the logged-in user
const getPrescriptions = async (req, res) => {
    const { id } = req.params
    try {
        console.log(req.params);
        
    // Find all prescriptions related to the logged-in user
        const prescriptions = await Prescription.find({userId: id});

    res.json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching prescriptions",
    });
  }
};

// Update prescription status
const updatePrescriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the prescription by id and ensure it belongs to the logged-in user
    const prescription = await Prescription.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // Ensure only the owner's prescription is updated
      { status },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found or unauthorized",
      });
    }

    res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating prescription status",
    });
  }
};

module.exports = {
  handlePrescriptionUpload,
  getPrescriptions,
  updatePrescriptionStatus,
};

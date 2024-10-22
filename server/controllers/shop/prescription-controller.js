const { imageUploadUtil } = require("../../helpers/cloudinary");
const User = require("../../models/User");
const Prescription = require("../../models/Prescription");

const handlePrescriptionUpload = async (req, res) => {
  try {
    const id = req?.user?.id
    const { name, mobile, address, userId } = req.body;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    console.log(req.user);
    

    // Create a new prescription linked to the authenticated user (assumed to be req.user._id)
    const prescription = new Prescription({
      userId: id, // Link the prescription to the logged-in user
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

const getPrescriptions = async (req, res) => {
 
  try {
     const id = req?.user?.id;
    console.log(req.user);

    // Find the user by ID to check their role
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If the user is an admin, fetch all prescriptions
    let prescriptions;
    if (user.role === "admin") {
      prescriptions = await Prescription.find(); // Fetch all records
    } else {
      // If the user is not an admin, fetch only their prescriptions
      prescriptions = await Prescription.find({ userId: id });
    }

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
    const { status } = req.body;

    // Validate input
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Retrieve the prescription ID from req.user (assuming the user object has the prescriptionId)
    const {prescriptionId} = req?.params; // Adjust based on how you're storing it in the user object

    console.log({ prescriptionId, asd: req?.user?.id });
    
    // Update prescription if it belongs to the logged-in user
    const prescription = await Prescription.findByIdAndUpdate(
      prescriptionId , // Ensure only the owner's prescription is updated
      { status },
      { new: true }
    );
    console.log({prescription});
    

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found or unauthorized",
      });
    }

    return res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error(error);
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

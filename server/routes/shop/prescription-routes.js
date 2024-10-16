const express = require("express");
const { upload } = require("../../helpers/cloudinary");
const {
  handlePrescriptionUpload,
  getPrescriptions,
  updatePrescriptionStatus,
} = require("../../controllers/shop/prescription-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post(
  "/upload",
  upload.single("prescriptionImage"),
  handlePrescriptionUpload
);
router.get("/get/:id", getPrescriptions);
router.put("/update-status/:id", updatePrescriptionStatus);

module.exports = router;

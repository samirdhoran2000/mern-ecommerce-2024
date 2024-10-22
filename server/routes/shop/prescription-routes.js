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
  "/upload",authMiddleware,
  upload.single("prescriptionImage"),
  handlePrescriptionUpload
);
router.get("/get",authMiddleware, getPrescriptions);
router.patch(
  "/update-status/:prescriptionId",
  authMiddleware,
  updatePrescriptionStatus
);

module.exports = router;

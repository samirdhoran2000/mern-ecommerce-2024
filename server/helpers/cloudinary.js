const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configuration
    cloudinary.config({
      cloud_name: "dzkzywu6j",
      api_key: "331758619627831",
      api_secret: "oI-m_bq_W2LWygEHp09qROgpejQ", // Click 'View API Keys' above to copy your API secret
    });

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };

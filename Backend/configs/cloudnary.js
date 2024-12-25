const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "drc93v1ry",
  api_key: "541117841367735",
  api_secret: "IwMcgzJl-Uh-92YQQE37HHjiKfk",
});

const storage = new multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

module.exports = { upload, imageUploadUtil };

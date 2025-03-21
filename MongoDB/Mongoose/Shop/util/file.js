const fs = require("fs");

const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteFile = deleteFile
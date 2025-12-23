const router = require("express").Router();
const { verifyDocument } = require("../controllers/documentController");
router.get("/:hash", verifyDocument);
module.exports = router;

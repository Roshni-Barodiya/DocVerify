const router = require("express").Router();
const { addDocument } = require("../controllers/documentController");
router.post("/", addDocument);
module.exports = router;

const { getContract } = require("../utils/web3");

exports.addDocument = async (req, res) => {
  const { hash } = req.body;
  const contract = await getContract();
  const tx = await contract.addDocument(hash);
  await tx.wait();
  res.json({ success: true });
};

exports.verifyDocument = async (req, res) => {
  const contract = await getContract();
  const result = await contract.verifyDocument(req.params.hash);
  res.json(result);
};

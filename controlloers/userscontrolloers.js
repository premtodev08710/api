exports.index =  (req, res, next) => {
  res.status(200).json({ messgn: "hi users" });
};
exports.login =  (req, res, next) => {
  res.status(200).json({ messgn: "hi users login" });
};

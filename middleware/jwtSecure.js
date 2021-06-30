import jwt from "jsonwebtoken";
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).send("Not Authorized Token Failed");
    }
  }
  if (!token) {
    res.status(401).send("Not Authorized Method Failed");
  }
};

//error handle
const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(500).json({ message: "This user is not authorized" });
  }
  if (err.name === "ValidationError") {
    return res.status(500).json({ message: "The user is not authorized" });
  }
  return res.status(500).json({ message: err });
  next();
};
export { protect, errorHandler };

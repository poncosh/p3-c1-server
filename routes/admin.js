const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const authorized = require("../middlewares/authorized");

router
  .post("/register", adminController.register)
  .post("/login", adminController.login)
  .get("/categories", adminController.readCategory)
  .get("/posts", adminController.readPost)
  .use(auth)
  .post("/categories", adminController.postCategory)
  .post("/posts", adminController.postPost)
  .put("/categories/:categoryId", authorized, adminController.putCategory)
  .delete("/categories/:categoryId", authorized, adminController.deleteCategory)
  .put("/posts/:postId", authorized, adminController.putPost)
  .delete("/posts/:postId", authorized, adminController.deletePost);

module.exports = router;

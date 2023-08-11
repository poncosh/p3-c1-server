const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");

router
  .post("/register", adminController.register)
  .post("/login", adminController.login)
  .get("/categories", adminController.readCategory)
  .get("/posts", adminController.readPost)
  .use(auth)
  .post("/categories", adminController.postCategory)
  .post("/posts", adminController.postPost)
  .put("/categories/:categoryId", adminController.putCategory)
  .delete("/categories/:categoryId", adminController.deleteCategory)
  .put("/posts/:postId", adminController.putPost)
  .delete("/posts/:postId", adminController.deletePost);

module.exports = router;

import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router.get("/protected", (req, res) => {
  if (req.cookies.userJwtToken) {
    return res.send({ message: req.cookies.userJwtToken });
  }
  return res.send({ error: "User not signed" });
});

router.route("/api/users/").post(userCtrl.create);

router
  .route("/api/users/updateUserPassword/:userId")
  .put(userCtrl.updateUserPassword);

router
  .route("/api/users/:userId")
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;

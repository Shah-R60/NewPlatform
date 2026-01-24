import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { uploadMusic, getLatestMusic, deleteMusic } from "../controller/music.controller.js";

const router = Router();

router.route("/uploadMusic").post(
     upload.single("musicFile"),
     verifyJWT,
     admin,
     uploadMusic
);

router.route("/latest").get(getLatestMusic);

router.route("/:id").delete(verifyJWT, admin, deleteMusic);

export default router;

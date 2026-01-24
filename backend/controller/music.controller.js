import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { Music } from "../model/music.models.js";

const uploadMusic = asyncHandler(async (req, res) => {
     const { title, artist } = req.body;

     if (!title || title.trim() === "") {
          throw new ApiError(400, "Title is required");
     }

     const musicFile = req.file?.path;
     if (!musicFile) {
          throw new ApiError(400, "Music file is required");
     }

     const uploaded = await uploadoncloudinary(musicFile);
     if (!uploaded || !uploaded.url) {
          throw new ApiError(500, "Error uploading music to cloudinary");
     }

     const music = await Music.create({
          title: title.trim(),
          artist: artist?.trim(),
          url: uploaded.url
     });

     return res.status(201).json(
          new ApiResponse(201, music, "Music uploaded successfully")
     );
});

const getLatestMusic = asyncHandler(async (req, res) => {
     const latest = await Music.findOne().sort({ createdAt: -1 });

     if (!latest) {
          throw new ApiError(404, "No music found");
     }

     return res.status(200).json(
          new ApiResponse(200, latest, "Latest music retrieved successfully")
     );
});

const deleteMusic = asyncHandler(async (req, res) => {
     const { id } = req.params;

     const music = await Music.findById(id);

     if (!music) {
          throw new ApiError(404, "Music not found");
     }

     await music.deleteOne();

     return res.status(200).json(
          new ApiResponse(200, null, "Music deleted successfully")
     );
});

export { uploadMusic, getLatestMusic, deleteMusic };

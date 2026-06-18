const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Action",
      "Horror",
      "Science Fiction",
      "Thriller",
      "Animation",
      "Documentary",
    ],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  actors: [
    {
      name: String,
      character: String,
    },
  ],
  director: String,
  videoUrl: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

// Index for better query performance
movieSchema.index({ category: 1, releaseDate: -1 });
movieSchema.index({ title: "text", description: "text" });
module.exports = mongoose.model("Movie", movieSchema);

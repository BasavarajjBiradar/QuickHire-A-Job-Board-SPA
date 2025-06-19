const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    jobid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobpostdb",
      required: [true, "Job ID is required"],
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    collection: "applied",
  }
);

module.exports = mongoose.model("Application", applicationSchema);

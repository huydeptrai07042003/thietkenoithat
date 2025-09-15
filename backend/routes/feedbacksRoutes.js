const Feedbacks = require("../models/Feedbacks");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = require("express").Router();

// route UPDATE /api/feedbacks/:id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStatusFeedbacks = await Feedbacks.findByIdAndUpdate(
      id,
      { approved: req.body.approved },
      { new: true, runValidators: true }
    );
    if (!updatedStatusFeedbacks) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ approved: updatedStatusFeedbacks.approved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route DELETE /api/feedbacks/
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedbacks.findByIdAndDelete(id);
    if (!feedback) {
      res.status(404).json({ message: "Feedback not Founded" });
    } else {
      res.status(200).json({ message: "Delete Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//route GET /api/feedbacks
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedbacks.find({});
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// route POST /api/feedbacks/
router.post("/", async (req, res) => {
  try {
    const { rate, description } = req.body;
    const feedback = new Feedbacks({
      rate,
      description,
    });
    const newFeedback = await feedback.save();
    res.status(200).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

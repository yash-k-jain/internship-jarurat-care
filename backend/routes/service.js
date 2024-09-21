const express = require("express");
const Services = require("../models/Services");
const fetchUser = require("../middlewares/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// @route GET /api/services/allServices
// @desc Get all the services
router.get("/allServices", async (req, res) => {
  try {
    const services = await Services.find();
    return res.json(services);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error occurred" });
  }
});

// @route GET /api/services/getService/:id
// @desc Get a service
router.get("/getService/:id", async (req, res) => {
  try {
    const service = await Services.find({ user: req.params.id });
    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error occurred" });
  }
});

// @route POST /api/services/addService
// @desc Add a service
router.post(
  "/addService",
  fetchUser,
  [
    body("title", "Enter a valid title.").isLength({ min: 7 }),
    body("description", "Enter a valid description.").isLength({ min: 7 }),
    body("price", "Enter a valid price.").notEmpty(),
  ],
  async (req, res) => {
    try {
      const { title, description, price } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Add a service to database
      const newService = new Services({
        title,
        description,
        price,
        user: req.user.id,
      });
      await newService.save();

      console.log(newService);
      res.status(200).json(newService);
    } catch (error) {
      return res.status(500).json({ error: "Internal error occurred" });
    }
  }
);

// @route PATCH /api/services/updateService/:id
// @desc Update a service
router.patch("/updateService/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Find service in database
    let service = await Services.findById(req.params.id);
    if (!service) {
      return res
        .status(400)
        .json({ error: "Please enter correct service id." });
    }

    // Check for correct user
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    // Update the service
    const newService = {};
    if (title) newService.title = title;
    if (description) newService.description = description;
    if (price) newService.price = price;

    service = await Services.findByIdAndUpdate(
      req.params.id,
      { $set: newService },
      { new: true }
    );
    res.json(service);
  } catch (error) {
    return res.status(500).json({ error: "Internal error occurred" });
  }
});

// @route DELETE /api/services/deleteService/:id
// @desc Delete a service
router.delete("/deleteService/:id", fetchUser, async (req, res) => {
  try {
    // Find service in database
    let service = await Services.findById(req.params.id);
    if (!service) {
      return res
        .status(400)
        .json({ error: "Please enter correct service id." });
    }

    // Check for correct user
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    // Delete service
    await Services.findByIdAndDelete(req.params.id);
    res.json({ success: "Service has been deleted." });
  } catch (error) {
    return res.status(500).json({ error: "Internal error occurred" });
  }
});

module.exports = router;

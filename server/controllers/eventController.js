import Event from "../models/eventModel.js"; 

// Create an event for the current user
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      eventType,
      visibility,
      coHosts = [],
      additionalSettings,
      details
    } = req.body;

    // Get the user ID from the request (set by authentication middleware)
    const userId = req.user._id; 

    // Create the new event
    const event = new Event({
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      eventType,
      visibility,
      host: { user: userId, profile: "User Profile Information" }, 
      coHosts,
      additionalSettings,
      details
    });

    await event.save();

    res.status(201).json({
      status: true,
      message: "Event Created Successfully..!!",
      event
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch events created by the current user
export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ 'host.user': userId })
      .populate('host.user', 'firstName lastName')
      .populate('coHosts.user', 'firstName lastName');

    res.status(200).json({
      status: true,
      message: "User Events Fetched Successfully..!!",
      events
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a specific event by its ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id)
      .populate('host.user', 'firstName lastName')
      .populate('coHosts.user', 'firstName lastName');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      status: true,
      message: "Event Fetched Successfully..!!",
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific event by its ID
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const event = await Event.findByIdAndUpdate(id, updateData, { new: true })
      .populate('host.user', 'firstName lastName')
      .populate('coHosts.user', 'firstName lastName');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      status: true,
      message: "Event Updated Successfully..!!",
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific event by its ID
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      status: true,
      message: "Event Deleted Successfully..!!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

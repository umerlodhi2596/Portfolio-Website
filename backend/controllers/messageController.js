import Message from "../models/Message.js";

// POST /api/messages
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/messages

// GET /api/messages?page=1&limit=10
export const getMessages = async (req, res) => {
  try {
    const page = Math.max(
      parseInt(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      parseInt(req.query.limit) || 10,
      100
    );

    const search = req.query.search?.trim() || "";

    const skip = (page - 1) * limit;

    const filter = {};

    // Search only by name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const totalMessages =
      await Message.countDocuments(filter);

    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(
      totalMessages / limit
    );

    res.status(200).json({
      success: true,

      data: messages,

      pagination: {
        currentPage: page,
        limit,
        totalMessages,
        totalPages,

        hasNextPage:
          page < totalPages,

        hasPreviousPage:
          page > 1,
      },
    });
  } catch (error) {
    console.error(
      "Get messages error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

// DELETE /api/messages/:id
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
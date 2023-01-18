import chatModal from '../Modals/chatModal.js';

export const createChat = async (req, res) => {
    const newChat = new chatModal({
        members: [req.body.senderId, req.body.receiverId]
    });

    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const userChat = async (req, res) => {
    try {
        const chat = await chatModal.find({
            members: { $in: [req.params.userID] }
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findChat = async (req, res) => {
    try {
        const chat = await chatModal.findOne({
            members: { $all: [req.params.firstID, req.params.secondID] },
        });
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

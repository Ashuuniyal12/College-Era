import messageModal from "../Modals/messageModal.js";

export const addMessage = async (req, res) => {
    const {chatId , senderId, text} = req.body;
    const newMessage = new messageModal({
        chatId,
        senderId,
        text
    })
    try {
        const result = await newMessage.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
}

export const getMessages = async (req, res) => {
    const {chatID} = req.params;
    try {
        const messages = await messageModal.find({chatID: req.params.chatID});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
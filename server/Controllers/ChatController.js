import chatModal from '../Modals/chatModal.js';
import UserModal from '../Modals/userModal.js';

export const createChat = async (req, res) => {

    req.body.receiverId.map(async (eachreq) => {
        console.log("eachreq", eachreq)
        const newChat = new chatModal({
            members: [req.body.senderId, eachreq]
        });

        try {
            console.log("req data ", req.body.senderId, eachreq)
            const chat = await chatModal.find({
                members: { $all: [req.body.senderId, eachreq] },
            });
            console.log("find in db", chat)
            if (chat.length === 0) {
                console.log("new chat")
                const result = await newChat.save();
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
}

export const userChat = async (req, res) => {

    //find all following of the user 
    const user = await UserModal.findById(req.params.userID);
    const following = user.following;
    const chat = [];
    //for each id check if a chat exists then send those chats
    try {
        let promises = await following.map(async (eachfollowing) => {
            console.log("eachfollowing", eachfollowing)
            const value = await chatModal.find({
                members: { $all: [eachfollowing, req.params.userID] }
            });
            //console.log("value", value)
            chat.push(value[0]);
            //console.log("chat in map", chat)
        })
        await Promise.all(promises);
      //console.log("chat", chat)
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

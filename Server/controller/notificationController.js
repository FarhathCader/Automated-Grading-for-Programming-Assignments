const Notification = require("../models/notifications");


const getAllNotifications = async (req, res) => {
    try {
        const {usertype} = req.query;
        console.log("usetyppe",usertype);

        const notifications = await Notification.find({usertype}).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTotalUnreadNotifications = async (req, res) => {
    try {
        const {usertype} = req.query;
        console.log("usetyppe",usertype);
        const totalUnread = await Notification.countDocuments({ read: false , usertype });
        res.status(200).json({ totalUnread });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAllNotifications = async (req, res) => {
    try {
        const {usertype} = req.query;
        await Notification.deleteMany({usertype});
        res.status(200).json({ message: 'All notifications deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const readAllNotifications = async (req, res) => {
    try {
        // Extract the usertype from the query parameters
        const { usertype } = req.query;

        // Update all notifications for the given usertype to mark them as read
        await Notification.updateMany({ usertype }, { $set: { read: true } });

        // Send a success response
        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
        // Handle any errors and send a failure response
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllNotifications,
    getTotalUnreadNotifications,
    markAsRead,
    deleteNotification,
    deleteAllNotifications,
    readAllNotifications,
};
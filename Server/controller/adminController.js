const Admin = require('../models/admin');
const User = require('../models/user');

const getAdmin = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the student with the provided userId
        const admin = await Admin.findOne({ userId });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Return the student
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        const { email } = req.body;
        const existingUser = await User.findOne({ email : email.toLowerCase() });
        if (existingUser && existingUser._id.toString() !== admin.userId.toString()) {
           // If email exists and belongs to a different user, return an error
            return res.status(400).json({ error: 'Email already exists' });
        }
        const updatedUser = await User.findByIdAndUpdate(admin.userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        // Return both updated user and student

        res.status(200).json({ updatedUser, updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { getAdmin
    , updateAdmin
};
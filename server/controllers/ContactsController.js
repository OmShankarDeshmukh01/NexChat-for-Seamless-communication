import User from "../models/UserModel.js";

export const searchContacts = async (req, res) => {
    try {
        const { searchTerm } = req.body;

        if (!searchTerm) {
            return res.status(400).send("Search term is required");
        }

        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );
        const regex = new RegExp(sanitizedSearchTerm, "i");
        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [
                        { firstName: regex },
                        { lastName: regex },
                        { email: regex }
                    ]
                }
            ]
        });

        return res.status(200).json({ contacts });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

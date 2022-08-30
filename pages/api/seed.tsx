import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = async (req: any, res: any) => {
    await db.connect();
    await User.deleteMany();
    //將data 的 user into db
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({ message: "seeded successfully" });
};

export default handler;

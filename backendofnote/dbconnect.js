import mongoose from "mongoose";
const mongoUrl =
	"mongodb+srv://prantibanda:cluster0pw@cluster0.yj9d3vo.mongodb.net/noteDB";

const mongoConnect = async () => {
	await mongoose.connect(mongoUrl).then(() => {
		console.log("Connected successfully");
	});
};

export default mongoConnect;

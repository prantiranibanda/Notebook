import jwt from "jsonwebtoken";
const JWT_SECRET = "Prantiispranti";

const fetchuser = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ error: "hijininij" });
	}
	try {
		const data = jwt.verify(token, JWT_SECRET);
		req.abc = data.user; //add Jakhushi(here, abc) to req which adds user id
		//    console.log(data);
		next();
	} catch (error) {
		res.status(401).send({ error: "hijininij" });
	}
};

export default fetchuser;

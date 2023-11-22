import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

// import jwt from "jsonwebtoken";

const s3Client = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "family-gift-exchange-app-data";
const FILE_NAME = "users.json";
// const JWT_SECRET = "your-secret-key"; // Keep this secret and secure

export const handler = async (event) => {
	try {
		// Parse the input data
		const { name, password } = JSON.parse(event.body);

		//TODO: Hash the password
		const hashedPassword = password;

		const getObjectParams = { Bucket: BUCKET_NAME, Key: FILE_NAME };
		const getCommand = new GetObjectCommand(getObjectParams);
		const s3Data = await s3Client.send(getCommand);

		// Convert the stream to a buffer
		const streamToString = (stream) =>
			new Promise((resolve, reject) => {
				const chunks = [];
				stream.on("data", (chunk) => chunks.push(chunk));
				stream.once("end", () => resolve(Buffer.concat(chunks)));
				stream.once("error", reject);
			});

		// Assuming the S3 object's body is in JSON format
		let userData;
		if (s3Data.Body) {
			const bodyContents = await streamToString(s3Data.Body);
			userData = JSON.parse(bodyContents.toString("utf-8"));
		} else {
			// Handle the case where Body is undefined or null
			console.error("S3 Data Body is undefined or null");
			return {
				statusCode: 500,
				body: JSON.stringify({ message: "S3 Data Error" }),
			};
		}

		const user = userData.users.find((u) => u.name === name);
		if (!user) {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: "User not found" }),
			};
		}

		// TODO: use bcrpyt to unhash
		// const passwordIsValid = bcrypt.compareSync(hashedPassword, user.password);
		const passwordIsEmpty = user.password === "";
		const passwordIsValid = hashedPassword === user.password;
		if (passwordIsEmpty) {
			return {
				statusCode: 401,
				body: JSON.stringify({ message: "Password not set" }),
			};
		} else {
			if (!passwordIsValid) {
				return {
					statusCode: 401,
					body: JSON.stringify({ message: "Password invalid" }),
				};
			}
		}

		// TODO: Generate a JWT and return it to the client
		// const token = jwt.sign({ name: user.name }, JWT_SECRET, {
		// 	expiresIn: "1h",
		// });

		// user.giftee is the id of the user's giftee
		const gifteeName = userData.users.find(
			(u) => u.id === user.giftee
		).name;
		const gifteeWishListUrl = userData.users.find(
			(u) => u.id === user.giftee
		).wishListUrl;

		return {
			statusCode: 200,
			body: JSON.stringify({
				wishListUrl: gifteeWishListUrl,
				giftee: gifteeName,
			}),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Internal Server Error" }),
		};
	}
};

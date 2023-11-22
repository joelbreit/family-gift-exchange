import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "family-gift-exchange-app-data";
const FILE_NAME = "users.json";

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

		// Check if user already exists
		if (userData.users.some((user) => user.name === name)) {
            // Get the user
            const user = userData.users.find((user) => user.name === name);
            // Check if password is already set
            if (user.password !== "") {
                // Password already set, report error
                console.error("Password already set");
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: "Password already set" }),
                };
            }
			userData.users.forEach((user) => {
				if (user.name === name) {
					user.password = hashedPassword;
				}
			});
		} else {
            // User not found, report error
            console.error("User not found");
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "User not found" }),
            };
		}

		// Write the updated user data back to S3
		const putObjectParams = {
			Bucket: BUCKET_NAME,
			Key: FILE_NAME,
			Body: JSON.stringify(userData),
			ContentType: "application/json",
		};
		const putCommand = new PutObjectCommand(putObjectParams);
		await s3Client.send(putCommand);
		const user = userData.users.find((u) => u.name === name);

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

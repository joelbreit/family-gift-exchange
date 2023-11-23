import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = "family-gift-exchange-app-data";
const FILE_NAME = "users.json";

export const handler = async (event) => {
	try {
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

		// Extract the required data
		const users = userData.users.map((user) => ({
			name: user.name,
			wishListUrl: user.wishListUrl,
		}));

		const others = userData.others.map((other) => ({
			name: other.name,
			wishListUrl: other.wishListUrl,
		}));

		const directoryData = [...users, ...others];

		return {
			statusCode: 200,
			body: JSON.stringify(directoryData),
			headers: {
				"Content-Type": "application/json",
			},
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Error processing your request" }),
		};
	}
};

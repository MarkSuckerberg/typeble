import { accessTumblrAPI } from "../src";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

it("should error on invalid path", async () => {
	const response = await accessTumblrAPI(token, "invalid/path");
	expect(response.meta.status).toBe(404);
});

import { accessTumblrAPI } from "../src";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

it("should error on invalid path", async () => {
	const error = await accessTumblrAPI(token, "invalid/path").catch<Error>(e => e);
	expect(error instanceof Error).toBe(true);
});

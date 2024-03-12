import { accessTumblrAPI, TumblrAPIError } from "../src";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

it("should error on invalid path", async () => {
	const error = await accessTumblrAPI(token, "invalid/path").catch<Error>(e => e);
	expect(error instanceof TumblrAPIError).toBe(true);
	if (error instanceof TumblrAPIError) {
		expect(error.response.meta.status).toBe(404);
		expect(error.response.meta.msg).toBe("Not Found");
		expect(error.queryURL).toBe("https://api.tumblr.com/v2/invalid/path?");
	}
});

import { getUserInfo, getUserFollowing, getBlogBlocks, TumblrFollowerBlog } from "../src/index";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

it("gets blog blocks", async () => {
	const blogBlocks = await getBlogBlocks(token, "marksuckerbird");
	expect(blogBlocks).toBeDefined();
});



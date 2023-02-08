import {
	getBlogBlocks,
	blockBlog,
	unblockBlog,
	TumblrFollowerBlog,
	getBlogFollowers,
	getBlogFollowing,
} from "../src/index";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

it("blocks a blog", async () => {
	const blocked = await blockBlog(token, "typeblr-bot", "marksuckerbird");
	expect(blocked).toBe(true);
});

it("gets blog blocks", async () => {
	const blogBlocks = await getBlogBlocks(token, "typeblr-bot");
	expect(blogBlocks).toBeDefined();
	expect(
		blogBlocks.find((blog: TumblrFollowerBlog) => blog.name === "marksuckerbird")
	).toBeDefined();
});

it("unblocks a blog", async () => {
	const blocked = await unblockBlog(token, "typeblr-bot", "marksuckerbird");
	expect(blocked).toBe(true);
});

it("actually unblocks a blog", async () => {
	const blogBlocks = await getBlogBlocks(token, "typeblr-bot");
	expect(blogBlocks).toBeDefined();
	expect(
		blogBlocks.find((blog: TumblrFollowerBlog) => blog.name === "marksuckerbird")
	).toBeUndefined();
});

it("gets blog followers", async () => {
	const blogFollowers = await getBlogFollowers(token, "typeblr-bot");
	expect(blogFollowers).toBeDefined();
});

it("gets blog following", async () => {
	const blogFollowing = await getBlogFollowing(token, "typeblr-bot");
	expect(blogFollowing).toBeDefined();
});

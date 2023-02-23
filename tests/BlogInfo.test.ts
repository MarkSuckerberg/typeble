import {
	blockBlog,
	getBlogBlocks,
	getBlogFollowers,
	getBlogFollowing,
	getBlogInfo,
	TumblrFollowerBlog,
	unblockBlog,
} from "../src/index";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

it("gets blog info", async () => {
	const blogInfo = await getBlogInfo(token, "typeble-bot", ["title", "description"]);
	expect(blogInfo["title"]).toBeDefined();
	expect(blogInfo["description"]).toBeDefined();
});

it("gets blog info without response fields", async () => {
	const blogInfo = await getBlogInfo(token, "typeble-bot");
	expect(blogInfo["likes"]).toBeDefined();
});

it("blocks a blog", async () => {
	const blocked = await blockBlog(token, "typeble-bot", "marksuckerbird");
	expect(blocked).toBe(true);
});

it("gets blog blocks", async () => {
	const blogBlocks = await getBlogBlocks(token, "typeble-bot");
	expect(blogBlocks).toBeDefined();
	expect(
		blogBlocks.find((blog: TumblrFollowerBlog) => blog.name === "marksuckerbird")
	).toBeDefined();
});

it("unblocks a blog", async () => {
	const blocked = await unblockBlog(token, "typeble-bot", "marksuckerbird");
	expect(blocked).toBe(true);
});

it("actually unblocks a blog", async () => {
	const blogBlocks = await getBlogBlocks(token, "typeble-bot");
	expect(blogBlocks).toBeDefined();
	expect(
		blogBlocks.find((blog: TumblrFollowerBlog) => blog.name === "marksuckerbird")
	).toBeUndefined();
});

it("gets blog followers", async () => {
	const blogFollowers = await getBlogFollowers(token, "typeble-bot");
	expect(blogFollowers).toBeDefined();
});

it("gets blog following", async () => {
	const blogFollowing = await getBlogFollowing(token, "typeble-bot");
	expect(blogFollowing).toBeDefined();
});

it("follows a blog", async () => {
	const followed = await followBlog(token, "marksuckerbird");
	expect(followed).toBe(true);
});

it("gets blog followed by", async () => {
	const blogFollowedBy = await getBlogFollowedBy(token, "marksuckerbird", "typeble-bot");
	expect(blogFollowedBy).toBe(true);
});

it("unfollows a blog", async () => {
	const followed = await unfollowBlog(token, "marksuckerbird");
	expect(followed).toBe(true);
});

it("actually unfollows a blog", async () => {
	const blogFollowedBy = await getBlogFollowedBy(token, "marksuckerbird", "typeble-bot");
	expect(blogFollowedBy).toBe(false);
});

import {
	blockBlog,
	followBlog,
	getBlogBlocks,
	getBlogFollowedBy,
	getBlogFollowers,
	getBlogFollowing,
	getBlogInfo,
	TumblrFollowerBlog,
	unblockBlog,
	unfollowBlog,
} from "../src";

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

	// Ensure it's actually unblocked
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

/* See todo in BlogInfo.ts
it("gets blog avatar", async () => {
	const blogAvatar = await getBlogAvatar(token, "typeble-bot", 128);
	expect(blogAvatar).toBe(
		"https://assets.tumblr.com/images/default_avatar/pyramid_closed_128.png"
	);
});
*/

it("follows a blog", async () => {
	const followed = await followBlog(token, "https://tumblr.suckerberg.gay/");
	expect(followed.url).toBe("https://tumblr.suckerberg.gay/");

	// Ensure it's actually followed
	const blogsFollowed = await getBlogFollowing(token, "typeble-bot");
	expect(
		blogsFollowed.find((blog: TumblrFollowerBlog) => blog.name === "marksuckerbird")
	).toBeDefined();
});

it("gets blog followed by", async () => {
	const blogFollowedBy = await getBlogFollowedBy(token, "typeble-bot", "marksuckerbird");
	expect(blogFollowedBy).toBe(false);
});

it("unfollows a blog", async () => {
	const followed = await unfollowBlog(token, "https://tumblr.suckerberg.gay/");
	expect(followed).toBe(true);

	// Ensure it's actually unfollowed
	const blogsFollowed = await getBlogFollowing(token, "typeble-bot");
	expect(
		blogsFollowed.find((blog: TumblrFollowerBlog) => blog.name === "marksuckerbird")
	).toBeUndefined();
});

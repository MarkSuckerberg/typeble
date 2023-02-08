import { getUserInfo, getUserFollowing, getBlogBlocks, TumblrFollowerBlog } from "../src/index";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

it("gets user info", async () => {
	const userInfo = await getUserInfo(token);
	expect(userInfo).toBeDefined();
});

it("gets user following", async () => {
	const userFollowing = await getUserFollowing(token);
	expect(userFollowing).toBeDefined();
});

it("gets user following with limit", async () => {
	// Get the first blog the user is following
	const userFollowing = await getUserFollowing(token, 1);
	expect(userFollowing.length).toBe(1);
});

it("gets user following with offset", async () => {
	// Get the first two blogs the user is following
	const userFollowing = await getUserFollowing(token, 2);
	// Get the second blog the user is following, using the offset, and compare it to the first blog from the first request (should be the same, it's sent in reverse order)
	const userFollowingOffset = await getUserFollowing(token, 1, 1);
	expect(userFollowingOffset[0]).toEqual(userFollowing[0]);
});

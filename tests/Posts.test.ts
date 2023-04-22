import {
	CreatePost,
	DeletePost,
	EditPost,
	FetchPost,
	FetchPosts,
	NewPostDetails,
	TumblrBlocksPost,
} from "../src";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

let postID: string | undefined;

it("should post a text post", async () => {
	const postDetails: NewPostDetails = {
		content: [
			{ type: "text", text: "Hello, world!", subtype: "heading1" },
			{ type: "text", text: "This is a test post." },
		],
		tags: "test,typeble",
	};

	postID = await CreatePost(token, "typeble-bot", postDetails);
	expect(postID).toBeDefined();
});

it("should edit the post", async () => {
	const postDetails: NewPostDetails = {
		content: [
			{ type: "text", text: "Hello, world!", subtype: "heading1" },
			{ type: "text", text: "This is a test post. It has been edited!" },
		],
		tags: "test,typeble,edit",
	};

	if (!postID) throw new Error("No post ID provided");
	const returnedID = await EditPost(token, "typeble-bot", postID, postDetails);
	expect(returnedID).toBe(postID);
});

it("should fetch the post", async () => {
	if (!postID) throw new Error("No post ID provided");
	const post = (await FetchPost(token, "typeble-bot", postID)) as TumblrBlocksPost;
	expect(post.content).toEqual([
		{ type: "text", text: "Hello, world!", subtype: "heading1" },
		{ type: "text", text: "This is a test post. It has been edited!" },
	]);
	expect(post.tags).toEqual(["test", "typeble", "edit"]);
	expect(post).toBeDefined();
});

it("should fetch the blog's posts", async () => {
	const posts = await FetchPosts(token, "typeble-bot");
	const post = posts.find(post => post.id_string === postID);
	expect(post).toBeDefined();
});

it("should delete the post", async () => {
	if (!postID) throw new Error("No post ID provided");
	expect(await DeletePost(token, "typeble-bot", postID)).toBe(true);
	await expect(FetchPost(token, "typeble-bot", postID)).rejects.toThrow();
});

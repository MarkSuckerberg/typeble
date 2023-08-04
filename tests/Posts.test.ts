import {
	CreatePost,
	DeletePost,
	EditPost,
	FetchPost,
	FetchPostNeue,
	FetchPosts,
	GetNotes,
	LikePost,
	NewPostDetails,
	TumblrBlocksPost,
	UnlikePost,
} from "../src";

const token = process.env.TUMBLR_TOKEN;
const consumerID = process.env.CONSUMER_ID;
const testBlog = "typeble-bot";

if (!token) throw new Error("No token provided");
if (!consumerID) throw new Error("No consumer ID provided");

let postID: string | undefined;
let post: TumblrBlocksPost | undefined;

it("should post a text post", async () => {
	const postDetails: NewPostDetails = {
		content: [
			{ type: "text", text: "Hello, world!", subtype: "heading1" },
			{ type: "text", text: "This is a test post." },
		],
		tags: "test,typeble",
	};

	postID = await CreatePost(token, testBlog, postDetails);
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
	const returnedID = await EditPost(token, testBlog, postID, postDetails);
	expect(returnedID).toBe(postID);
});

it("should fetch the post", async () => {
	if (!postID) throw new Error("No post ID provided");
	post = (await FetchPostNeue(token, testBlog, postID)) as TumblrBlocksPost;
	expect(post.content).toEqual([
		{ type: "text", text: "Hello, world!", subtype: "heading1" },
		{ type: "text", text: "This is a test post. It has been edited!" },
	]);
	expect(post.tags).toEqual(["test", "typeble", "edit"]);
	expect(post).toBeDefined();
});

it("should fetch the post with a consumer ID only", async () => {
	if (!postID) throw new Error("No post ID provided");
	const post = await FetchPost<TumblrBlocksPost>(
		consumerID,
		testBlog,
		postID,
		undefined,
		undefined,
		undefined,
		true,
		true
	);
	expect(post.content).toEqual([
		{ type: "text", text: "Hello, world!", subtype: "heading1" },
		{ type: "text", text: "This is a test post. It has been edited!" },
	]);
	expect(post.tags).toEqual(["test", "typeble", "edit"]);
	expect(post).toBeDefined();
});

it("should fetch the blog's posts", async () => {
	const posts = await FetchPosts(token, testBlog);
	const post = posts.find(post => post.id_string === postID);
	expect(post).toBeDefined();
});

it("should like the post", async () => {
	if (!post) throw new Error("No post object retrieved");
	expect(await LikePost(token, post.id_string, post.reblog_key)).toBe(true);
});

it("should retrieve the notes count", async () => {
	if (!post) throw new Error("No post object retrieved");
	const response = await GetNotes(token, testBlog, post.id_string);
	expect(response).toBeDefined();
	expect(response.total_notes).toBeGreaterThan(0);
	expect(response.notes.find(note => note.blog_name == testBlog)).toBeDefined();
});

it("should unlike the post", async () => {
	if (!post) throw new Error("No post object retrieved");
	expect(await UnlikePost(token, post.id_string, post.reblog_key)).toBe(true);
});

it("should delete the post", async () => {
	if (!postID) throw new Error("No post ID provided");
	expect(await DeletePost(token, testBlog, postID)).toBe(true);
	await expect(FetchPost(token, testBlog, postID)).rejects.toThrow();
});

import { CreatePost, DeletePost, EditPost, FetchPost, NewPostDetails } from "../src";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

let postID: string | undefined;

it("should post a text post", async () => {
	const postDetails: NewPostDetails = {
		content: [
			{ type: "text", text: "Hello, world!", subtype: "heading1" },
			{ type: "text", text: "This is a test post." },
		],
		tags: "test,typeblr",
	};

	postID = await CreatePost(token, "typeblr-bot", postDetails);
	expect(postID).toBeDefined();
});

it("should edit the post", async () => {
	const postDetails: NewPostDetails = {
		content: [
			{ type: "text", text: "Hello, world!", subtype: "heading1" },
			{ type: "text", text: "This is a test post. It has been edited!" },
		],
		tags: "test,typeblr,edit",
	};

	if (!postID) throw new Error("No post ID provided");
	await EditPost(token, "typeblr-bot", postID, postDetails);
});

it("should fetch the post", async () => {
	if (!postID) throw new Error("No post ID provided");
	const post = await FetchPost(token, "typeblr-bot", postID);
	console.log(JSON.stringify(post, null, 2));
	expect(post.content).toStrictEqual([
		{ type: "text", text: "Hello, world!", subtype: "heading1" },
		{ type: "text", text: "This is a test post." },
	]);
	expect(post).toBeDefined();
});

/*it("should delete the post", async () => {
	if (!postID) throw new Error("No post ID provided");
	await DeletePost(token, "typeblr-bot", postID);
});*/

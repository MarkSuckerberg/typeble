import { CreatePost, EditPost, NewPostDetails } from "../src";

const token = process.env.TUMBLR_TOKEN;

if (!token) throw new Error("No token provided");

let postID: string | undefined;

it("should post a text post", async () => {
	const postDetails: NewPostDetails = {
		content: [
			{ type: "text", text: "Hello, world!", subtype: "heading1" },
			{ type: "text", text: "This is a test post." },
		],
		layout: [],
		state: "published",
		tags: ["test", "typelr"],
		isPrivate: true,
		interactabilityReblog: "noone",
	};

	postID = await CreatePost(token, "typelr-bot", postDetails);
	expect(postID).toBeDefined();
});

it("should edit the post", async () => {
	const postDetails: NewPostDetails = {
		content: [
			{ type: "text", text: "Hello, world!", subtype: "heading1" },
			{ type: "text", text: "This is a test post." },
			{ type: "text", text: "This is an edit.", subtype: "quirky" },
		],
		layout: [],
		state: "published",
		tags: ["test", "typelr"],
		isPrivate: true,
		interactabilityReblog: "noone",
	};

	if (!postID) throw new Error("No post ID provided");
	await EditPost(token, "typelr-bot", postID, postDetails);
});

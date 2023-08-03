import { NewPostDetails, TumblrPost } from "../interfaces";
import { accessTumblrAPI } from "./AccessTumblrApi";

/**
 * Creates a new post on a blog.
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to create the post on
 * @param postDetails Details of the post to create
 * @returns ID of the post created
 */
export async function CreatePost(
	token: string,
	blogIdentifier: string,
	postDetails: NewPostDetails
): Promise<string | undefined> {
	return (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/posts`,
			//TODO: This is a hacky way to do this. Find a better way to make this into a string array.
			JSON.parse(JSON.stringify(postDetails)),
			"POST"
		)
	).response.id;
}

/**
 * Edits a post on a blog.
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to edit the post on
 * @param postId ID of the post to edit
 * @param postDetails New details of the post, completely replacing the old ones
 */
export async function EditPost(
	token: string,
	blogIdentifier: string,
	postId: string,
	postDetails: NewPostDetails
): Promise<string | undefined> {
	return (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/posts/${postId}`,
			//TODO: This is a hacky way to do this. Find a better way to make this into a string array.
			JSON.parse(JSON.stringify(postDetails)),
			"PUT"
		)
	).response.id;
}

/**
 * Deletes a post from a blog.
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to delete the post from
 * @param postId ID of the post to delete
 */
export async function DeletePost(token: string, blogIdentifier: string, postId: string) {
	return (
		(await accessTumblrAPI(token, `blog/${blogIdentifier}/post/delete`, { id: postId }, "POST"))
			.meta.status == 200
	);
}

export async function FetchPostNeue(
	token: string,
	blogIdentifier: string,
	postId: string,
	postFormat: "npf" | "legacy" = "npf"
): Promise<TumblrPost> {
	return (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/posts/${postId}`,
			{
				post_format: postFormat,
			},
			"GET",
			"https://www.tumblr.com/api/v2/" // Yes, getting posts needs to be done on a different API endpoint for some reason. Ask Tumblr why.
		)
	).response;
}

/**
 *
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to fetch posts from
 * @param id ID of the post to fetch
 * @param reblogInfo Whether to include reblog info
 * @param notesInfo Whether to include notes info
 * @param filter Filter to apply to the posts (raw, text, none)
 * @param npf Whether to use the new post format
 * @param basicAuth Whether to treat the token argument as an OAuth2 token or a basic consumer ID
 * @returns Specified post
 * @link https://www.tumblr.com/docs/en/api/v2#posts--retrieve-published-posts
 */
export async function FetchPost<PostType extends TumblrPost = TumblrPost>(
	token: string,
	blogIdentifier: string,
	id: number | string,
	reblogInfo?: boolean,
	notesInfo?: boolean,
	filter: "raw" | "text" | "none" = "none",
	npf = true,
	basicAuth = false
) {
	return (
		await FetchPosts<PostType>(
			token,
			blogIdentifier,
			id,
			undefined,
			1,
			0,
			reblogInfo,
			notesInfo,
			filter,
			undefined,
			npf,
			undefined,
			basicAuth
		)
	)[0];
}

/**
 *
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to fetch posts from
 * @param id ID of the post to fetch
 * @param tag Tag(s) to filter posts by (limit 4)
 * @param limit Maximum number of posts to fetch
 * @param offset Number of posts to skip
 * @param reblogInfo Whether to include reblog info
 * @param notesInfo Whether to include notes info
 * @param filter Filter to apply to the posts (raw, text, none)
 * @param before Unix timestamp to fetch posts before
 * @param npf Whether to use the new post format
 * @param type The type of posts to return, as legacy categories
 * @param basicAuth Whether to treat the token argument as an OAuth2 token or a basic consumer ID
 * @returns Array of posts
 * @link https://www.tumblr.com/docs/en/api/v2#posts--retrieve-published-posts
 */
export async function FetchPosts<PostType extends TumblrPost = TumblrPost>(
	token: string,
	blogIdentifier: string,
	id?: number | string,
	tag?: string | string[],
	limit = 20,
	offset = 0,
	reblogInfo?: boolean,
	notesInfo?: boolean,
	filter: "raw" | "text" | "none" = "none",
	before?: number,
	npf = true,
	type?: "text" | "quote" | "link" | "answer" | "video" | "audio" | "photo" | "chat",
	basicAuth = false
) {
	// Tumblr API only allows a maximum of 20 posts per request
	if (limit > 20) limit = 20;

	interface Arguments {
		id?: string;
		tag?: string;
		limit?: string;
		offset?: string;
		reblog_info?: string;
		notes_info?: string;
		filter?: string;
		before?: string;
		npf?: string;
		type?: string;
	}

	const args: Arguments = {
		id: id?.toString(),
		tag: typeof tag === "string" ? tag : tag?.join(","),
		limit: limit.toString(),
		offset: offset.toString(),
		reblog_info: reblogInfo?.toString(),
		notes_info: notesInfo?.toString(),
		filter: filter ?? "none",
		before: before?.toString(),
		npf: npf?.toString(),
		type: type,
	};

	return (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/posts`,
			//TODO: This is a hacky way to do this. Find a better way to make this into a string array.
			JSON.parse(JSON.stringify(args)),
			"GET",
			"https://www.tumblr.com/api/v2/", // Yes, getting posts needs to be done on a different API endpoint for some reason. Ask Tumblr why.
			basicAuth
		)
	).response.posts as PostType[];
}

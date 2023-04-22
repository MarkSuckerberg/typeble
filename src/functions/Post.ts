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

export async function FetchPost(
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
 * @param tag Tag(s) to filter posts by (limit 4)
 * @param limit Maximum number of posts to fetch
 * @param offset Number of posts to skip
 * @param reblogInfo Whether to include reblog info
 * @param notesInfo Whether to include notes info
 * @param filter Filter to apply to the posts (raw, text, none)
 * @param before Unix timestamp to fetch posts before
 * @param npf Whether to use the new post format
 * @returns Array of posts
 * @link https://www.tumblr.com/docs/en/api/v2#posts--retrieve-published-posts
 */
export async function FetchPosts<PostType extends TumblrPost = TumblrPost>(
	token: string,
	blogIdentifier: string,
	id?: number,
	tag?: string | string[],
	limit = 20,
	offset = 0,
	reblogInfo?: boolean,
	notesInfo?: boolean,
	filter: "raw" | "text" | "none" = "none",
	before?: number,
	npf?: boolean
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
	};

	return (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/posts`,
			//TODO: This is a hacky way to do this. Find a better way to make this into a string array.
			JSON.parse(JSON.stringify(args)),
			"GET",
			"https://www.tumblr.com/api/v2/" // Yes, getting posts needs to be done on a different API endpoint for some reason. Ask Tumblr why.
		)
	).response.posts as PostType[];
}

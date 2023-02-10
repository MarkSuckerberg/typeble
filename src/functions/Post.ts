import { NewPostDetails, TumblrFetchedPost } from "../interfaces/TumblrNeuePost";
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
	(await accessTumblrAPI(token, `blog/${blogIdentifier}/post/delete`, { id: postId }, "POST"))
		.response == 200;
}

export async function FetchPost(
	token: string,
	blogIdentifier: string,
	postId: string,
	postFormat: "npf" | "legacy" = "npf"
): Promise<TumblrFetchedPost> {
	console.log(`blog/${blogIdentifier}/posts/${postId}`);
	return (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/posts/${postId}`,
			{
				post_format: postFormat,
			},
			"GET",
			"https://www.tumblr.com/api/v2" // Yes, getting posts needs to be done on a different API endpoint for some reason. Ask tumblr why.
		)
	).response;
}

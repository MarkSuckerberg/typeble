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
	const response = (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/posts`,
			//TODO: This is a hacky way to do this. Find a better way to make this into a string array.
			JSON.parse(JSON.stringify(postDetails)),
			"POST"
		)
	).response;

	return response.id;
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
) {
	await accessTumblrAPI(
		token,
		`blog/${blogIdentifier}/posts`,
		//TODO: This is a hacky way to do this. Find a better way to make this into a string array.
		JSON.parse(
			JSON.stringify({
				...postDetails,
				id: postId,
			})
		),
		"PUT"
	);
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
	return (
		await accessTumblrAPI(token, `blog/${blogIdentifier}/posts`, {
			id: postId,
			post_format: postFormat,
		})
	).response;
}

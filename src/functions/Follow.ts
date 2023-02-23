import { accessTumblrAPI } from "./AccessTumblrApi";

/**
 * Follow a blog
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to follow
 * @returns Whether the blog was followed successfully
 * @link https://www.tumblr.com/docs/en/api/v2#userfollow--follow-a-blog
 */
export async function followBlog(token: string, blogIdentifier: string): Promise<boolean> {
	return (
		(
			await accessTumblrAPI(token, `user/follow`, {
				url: blogIdentifier,
			})
		).meta.status === 200
	);
}

/**
 * Unfollow a blog
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to unfollow
 * @returns Whether the blog was unfollowed successfully
 */
export async function unfollowBlog(token: string, blogIdentifier: string): Promise<boolean> {
	return (
		(
			await accessTumblrAPI(token, `user/unfollow`, {
				url: blogIdentifier,
			})
		).meta.status === 200
	);
}

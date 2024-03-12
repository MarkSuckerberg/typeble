import { TumblrFollowingBlog } from "../interfaces";
import { accessTumblrAPI } from "./AccessTumblrApi";

/**
 * Follow a blog
 * @param token OAuth2 token from Tumblr
 * @param url URL of the blog to follow
 * @returns Whether the blog was followed successfully
 * @link https://www.tumblr.com/docs/en/api/v2#userfollow--follow-a-blog
 */
export async function followBlog(token: string, url: string): Promise<TumblrFollowingBlog> {
	return (
		await accessTumblrAPI(
			token,
			`user/follow`,
			{
				url: url,
			},
			"POST"
		)
	).response.blog;
}

/**
 * Unfollow a blog
 * @param token OAuth2 token from Tumblr
 * @param url URL of the blog to unfollow
 * @returns Whether the blog was unfollowed successfully
 */
export async function unfollowBlog(token: string, url: string): Promise<boolean> {
	return (
		(
			await accessTumblrAPI(
				token,
				`user/unfollow`,
				{
					url: url,
				},
				"POST"
			)
		).meta.status === 200
	);
}

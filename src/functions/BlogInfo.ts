import { TumblrFollowerBlog } from "../interfaces";
import { accessTumblrAPI } from "./AccessTumblrApi";

/**
 *
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to get the blocked blogs from
 * @param limit Maximum number of blogs to return (limit 20)
 * @param offset Block number to start at
 * @returns Array of TumblrFollowerBlog objects
 * @link https://www.tumblr.com/docs/en/api/v2#blocks--retrieve-blogs-blocks
 */
export async function getBlogBlocks(
	token: string,
	blogIdentifier: string,
	limit: number = 20,
	offset: number = 0
): Promise<TumblrFollowerBlog[]> {
	// Tumblr API only allows a maximum of 20 blogs per request
	if (limit > 20) limit = 20;
	return await (
		await accessTumblrAPI(token, `blog/${blogIdentifier}/blocks`, {
			limit,
			offset,
		})
	).response.blocked_tumblelogs;
}

/**
 * Block a blog
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to block the blog from
 * @param blockedTumblelog Identifier of the blog to block
 * @returns True if the blog was blocked successfully
 * @link https://www.tumblr.com/docs/en/api/v2#blocks--block-a-blog
 */
export async function blockBlog(
	token: string,
	blogIdentifier: string,
	blockedTumblelog: string
): Promise<boolean> {
	return (
		(
			await accessTumblrAPI(token, `blog/${blogIdentifier}/blocks`, {
				blocked_tumblelog: blockedTumblelog,
			})
		).meta.status === 201
	);
}

/**
 * Block multiple blogs at once
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to block the blogs from
 * @param blockedTumblelogs Array of the identifiers of the blogs to block
 * @param force Whether to force the block to go through even if it requires canceling a Post+ Subscription
 * @returns True if the blogs were blocked successfully
 * @link https://www.tumblr.com/docs/en/api/v2#blocksbulk--block-a-list-of-blogs
 */
export async function blockBlogs(
	token: string,
	blogIdentifier: string,
	blockedTumblelogs: string[],
	force: boolean = false
): Promise<boolean> {
	return (
		(
			await accessTumblrAPI(token, `blog/${blogIdentifier}/blocks/bulk`, {
				blocked_tumblelogs: blockedTumblelogs.join(","),
			})
		).meta.status === 201
	);
}

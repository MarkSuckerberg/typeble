import { TumblrFollowerBlog, TumblrFollowingBlog } from "../interfaces";
import { accessTumblrAPI } from "./AccessTumblrApi";

type BlogInfoResponseFields = Array<
	| "title"
	| "posts"
	| "name"
	| "updated"
	| "description"
	| "ask"
	| "ask_anon"
	| "followed"
	| "likes"
	| "is_blocked_from_primary"
	| "avatar"
	| "url"
	| "theme"
	| "is_following_you"
	| "duration_blog_following_you"
	| "duration_following_blog"
	| "timezone"
	| "timezone_offset"
>;

/**
 * Get information about a blog
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to get the info from
 * @param responseFields Fields to return in the response
 * @returns Object containing the requested fields
 * @link https://www.tumblr.com/docs/en/api/v2#info---retrieve-blog-info
 */
export async function getBlogInfo(
	token: string,
	blogIdentifier: string,
	responseFields?: BlogInfoResponseFields //TODO: Find a way to make this dynamically return the correct type
): Promise<unknown> {
	return (
		await accessTumblrAPI(
			token,
			`blog/${blogIdentifier}/info`,
			responseFields ? { "fields": responseFields.join(",") } : undefined
		)
	).response.blog;
}

/**
 * Get a list of blogs that follow the given blog
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to get the followers from
 * @param limit Maximum number of blogs to return (limit 20)
 * @param offset Block number to start at
 * @returns Array of TumblrFollowingBlog objects
 * @link https://www.tumblr.com/docs/en/api/v2#followers--retrieve-a-blogs-followers
 */
export async function getBlogFollowers(
	token: string,
	blogIdentifier: string,
	limit = 20,
	offset = 0
): Promise<TumblrFollowingBlog[]> {
	// Tumblr API only allows a maximum of 20 blogs per request
	if (limit > 20) limit = 20;
	return (
		await accessTumblrAPI(token, `blog/${blogIdentifier}/followers`, {
			limit: limit.toString(),
			offset: offset.toString(),
		})
	).response.users;
}

/**
 * Get a list of blogs that the given blog is following
 * @param token OAuth2 token from Tumblr
 * @param blogIdentifier Identifier of the blog to get the following blogs from
 * @param limit Maximum number of blogs to return (limit 20)
 * @param offset Block number to start at
 * @returns Array of TumblrFollowerBlog objects
 * @link https://www.tumblr.com/docs/en/api/v2#following--retrieve-blogs-following
 */
export async function getBlogFollowing(
	token: string,
	blogIdentifier: string,
	limit = 20,
	offset = 0
): Promise<TumblrFollowerBlog[]> {
	// Tumblr API only allows a maximum of 20 blogs per request
	if (limit > 20) limit = 20;
	return (
		await accessTumblrAPI(token, `blog/${blogIdentifier}/following`, {
			limit: limit.toString(),
			offset: offset.toString(),
		})
	).response.blogs;
}

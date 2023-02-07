import { TumblrUserInfo } from "../interfaces";
import { TumblrFollowerBlog } from "../interfaces";
import { accessTumblrAPI } from "./AccessTumblrApi";

export async function getUserInfo(token: string): Promise<TumblrUserInfo> {
	return await (
		await accessTumblrAPI(token, "user/info")
	).response.user;
}

export async function getUserFollowing(
	token: string,
	limit: number = 20,
	offset: number = 0
): Promise<TumblrFollowerBlog[]> {
	// Tumblr API only allows a maximum of 20 blogs per request
	if (limit > 20) limit = 20;
	return await (
		await accessTumblrAPI(token, "user/following", { limit, offset })
	).response.blogs;
}

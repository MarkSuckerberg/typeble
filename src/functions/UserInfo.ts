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
	limit = 20,
	offset = 0
): Promise<TumblrFollowerBlog[]> {
	// Tumblr API only allows a maximum of 20 blogs per request
	if (limit > 20) limit = 20;
	return await (
		await accessTumblrAPI(token, "user/following", {
			limit: limit.toString(),
			offset: offset.toString(),
		})
	).response.blogs;
}

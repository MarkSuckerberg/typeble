import { TumblrUserInfo } from "../interfaces";
import { TumblrFollowerBlog } from "../interfaces";
import { accessTumblrAPI } from "./AccessTumblrApi";

export async function getUserInfo(token: string): Promise<TumblrUserInfo> {
	const response = await accessTumblrAPI(token, "user/info");

	if (response.meta.status !== 200) {
		throw new Error(`Failed to get user info: ${response.meta.msg}`);
	}

	return response.response.user;
}

export async function getUserFollowing(
	token: string,
	limit = 20,
	offset = 0
): Promise<TumblrFollowerBlog[]> {
	// Tumblr API only allows a maximum of 20 blogs per request
	if (limit > 20) {
		limit = 20;
	}

	const response = await accessTumblrAPI(token, "user/following", {
		limit: limit.toString(),
		offset: offset.toString(),
	});

	if (response.meta.status !== 200) {
		throw new Error(`Failed to get blogs following: ${response.meta.msg}`);
	}

	return response.response.blogs;
}

import TumblrUserInfo from "../interfaces/TumblrUserInfo";
import TumblrBlog from "../interfaces/TumblrBlog";
import accessTumblrAPI from "./AccessTumblrApi";

export async function getUserInfo(token: string): Promise<TumblrUserInfo> {
	return await (
		await accessTumblrAPI(token, "user/info")
	).response.user;
}

export async function getUserFollowing(
	token: string,
	limit: number = 20,
	offset: number = 0
): Promise<TumblrBlog[]> {
	if (limit > 20) limit = 20;
	return await (
		await accessTumblrAPI(token, "user/following", { limit, offset })
	).response.blogs;
}

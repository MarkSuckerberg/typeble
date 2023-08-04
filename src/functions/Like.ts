import { accessTumblrAPI } from "./AccessTumblrApi";

export async function LikePost(token: string, id: number | string, reblogKey: string) {
	return (
		(
			await accessTumblrAPI(
				token,
				"user/like",
				{ id: id.toString(), reblog_key: reblogKey },
				"POST",
				"https://www.tumblr.com/api/v2/"
			)
		).meta.status === 200
	);
}

export async function UnlikePost(token: string, id: number | string, reblogKey: string) {
	return (
		(
			await accessTumblrAPI(
				token,
				"user/unlike",
				{ id: id.toString(), reblog_key: reblogKey },
				"POST",
				"https://www.tumblr.com/api/v2/"
			)
		).meta.status === 200
	);
}

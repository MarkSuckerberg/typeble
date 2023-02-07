import { TumblrNeueContentBlock, TumblrNeuelayoutBlock } from "../interfaces/TumblrNeuePost";
import { accessTumblrAPI } from "./AccessTumblrApi";

export type NewPostDetails = {
	content: TumblrNeueContentBlock[];
	layout: TumblrNeuelayoutBlock[];
	state: "published" | "queue" | "draft" | "private";
	publishOn?: Date;
	date?: Date;
	tags?: string[];
	sourceUrl?: string;
	send_to_twitter?: boolean;
	isPrivate?: boolean;
	slug?: string;
	interactabilityReblog?: "everyone" | "noone";
};

export async function CreatePost(
	token: string,
	blogIdentifier: string,
	postDetails: NewPostDetails
) {
	await accessTumblrAPI(
		token,
		`blog/${blogIdentifier}/post`,
		//TODO: This is a hacky way to do this. Find a better way.
		JSON.parse(JSON.stringify(postDetails))
	);
}

export async function EditPost(
	token: string,
	blogIdentifier: string,
	postId: string,
	postDetails: NewPostDetails
) {
	await accessTumblrAPI(
		token,
		`blog/${blogIdentifier}/post/edit`,
		//TODO: This is a hacky way to do this. Find a better way.
		JSON.parse(
			JSON.stringify({
				...postDetails,
				id: postId,
			})
		)
	);
}

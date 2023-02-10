import { TumblrBlog } from "./TumblrBlog";
import { TumblrMediaObject } from "./TumblrMediaObject";

export type TumblrAttributionObject =
	| TumblrAttributionPostObject
	| TumblrAttributionLinkObject
	| TumblrAttributionBlogObject
	| TumblrAttributionAppObject;

interface TumblrAttributionPostObject {
	type: "post";
	url: string;
	post: unknown; //TODO: Post object
	blog: TumblrBlog;
}

interface TumblrAttributionLinkObject {
	type: "link";
	url: string;
}

export interface TumblrAttributionBlogObject {
	type: "blog";
	blog: TumblrBlog;
}

interface TumblrAttributionAppObject {
	type: "app";
	url: string;
	app_name?: string;
	display_text?: string;
	logo?: TumblrMediaObject;
}

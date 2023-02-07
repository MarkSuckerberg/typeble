import {TumblrBlog} from "./TumblrBlog";
import { TumblrMediaObject } from "./TumblrNeuePost";

export interface TumblrAttributionObject {
	type: "post" | "link" | "blog" | "app";
}

export interface TumblrAttributionPostObject extends TumblrAttributionObject {
	type: "post"
	url: string;
	post: any; //TODO: Post object
	blog: TumblrBlog;
}

export interface TumblrAttributionLinkObject extends TumblrAttributionObject {
	type: "link";
	url: string;
}

export interface TumblrAttributionBlogObject extends TumblrAttributionObject {
	type: "blog";
	blog: TumblrBlog;
}

export interface TumblrAttributionAppObject extends TumblrAttributionObject {
	type: "app";
	url: string;
	app_name?: string;
	display_text?: string;
	logo?: TumblrMediaObject;
}

export interface TumblrBlog {
	name: string;
	url: string;
	title: string;
	description: string;
}

export interface TumblrFollowerBlog extends TumblrBlog {
	updated: number;
}

export interface TumblrUserBlog extends TumblrBlog {
	tweet: "auto" | "Y" | "N";
	primary: boolean;
	followers: number;
	type: "public" | "private";
}

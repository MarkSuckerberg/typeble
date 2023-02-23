export interface TumblrBlog {
	name: string;
	url: string;
	title: string;
	uuid: string;
}

export interface TumblrFollowerBlog extends TumblrBlog {
	updated: number;
	description: string;
}

export interface TumblrFollowingBlog extends TumblrBlog {
	updated: number;
	following: boolean;
}

export interface TumblrUserBlog extends TumblrBlog {
	tweet: "auto" | "Y" | "N";
	primary: boolean;
	followers: number;
	type: "public" | "private";
	description: string;
}

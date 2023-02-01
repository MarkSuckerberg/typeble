import TumblrUserBlog from "./TumblrUserBlog";

export default interface TumblrUserInfo {
	following: number;
	default_post_format: "html" | "markdown" | "raw";
	name: string;
	likes: number;
	blogs: TumblrUserBlog[];
}

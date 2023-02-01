export default interface TumblrUserBlog {
	name: string;
	title: string;
	url: string;
	tweet: "auto" | "Y" | "N";
	primary: boolean;
	followers: number;
	type: "public" | "private";
}

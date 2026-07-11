import { TumblrBlocksPost, TumblrNeueVideoBlock } from "../interfaces";

export function GetImageBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "image");
}

export function GetLinkBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "link");
}

export function GetPaywallBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "paywall");
}

export function GetTextBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "text");
}

export function GetVideoBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "video") as TumblrNeueVideoBlock[];
}

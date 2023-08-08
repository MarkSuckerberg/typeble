import {
	TumblrBlocksPost,
	TumblrNeueImageBlock,
	TumblrNeueLinkBlock,
	TumblrNeuePaywallBlock,
	TumblrNeueTextBlock,
	TumblrNeueVideoBlock,
} from "../interfaces";

export async function GetImageBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "image") as TumblrNeueImageBlock[];
}

export async function GetLinkBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "link") as TumblrNeueLinkBlock[];
}

export async function GetPaywallBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "paywall") as TumblrNeuePaywallBlock[];
}

export async function GetTextBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "text") as TumblrNeueTextBlock[];
}

export async function GetVideoBlocks(this: TumblrBlocksPost) {
	return this.content.filter(block => block.type === "video") as TumblrNeueVideoBlock[];
}

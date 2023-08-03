import { TumblrAttributionObject } from "./TumblrAttribution";
import { TumblrGifMediaObject, TumblrMediaObject } from "./TumblrMediaObject";
import { TumblrNeueLayoutBlock } from "./TumblrNeueLayout";
import { TumblrPost, TumblrPostBase } from "./TumblrPost";

export interface TumblrBlocksPost extends TumblrPostBase {
	type: "blocks";
	trail: TumblrPost[];
	content: TumblrNeueContentBlock[];
	layout: TumblrNeueLayoutBlock[];
	is_blocks_post_format: true;
}

export type NewPostDetails = {
	content: TumblrNeueContentBlock[];
	layout?: TumblrNeueLayoutBlock[];
	state?: "published" | "queue" | "draft" | "private";
	publishOn?: Date;
	date?: Date;
	tags?: string;
	sourceUrl?: string;
	send_to_twitter?: boolean;
	isPrivate?: boolean;
	slug?: string;
	interactabilityReblog?: "everyone" | "noone";
};

export type TumblrNeueContentBlock =
	| TumblrNeueTextBlock
	| TumblrNeueImageBlock
	| TumblrNeueLinkBlock
	| TumblrNeueAudioBlock
	| TumblrNeueVideoBlock
	| TumblrNeuePaywallBlock;

// Text Block
export interface TumblrNeueTextBlock {
	type: "text";
	text: string;
	subtype?:
		| "heading1"
		| "heading2"
		| "quirky"
		| "quote"
		| "indented"
		| "chat"
		| "ordered-list-item"
		| "unordered-list-item";
	formatting?: {
		start: number;
		end: number;
		type: "bold" | "italic" | "strikethrough" | "small" | "link" | "code" | "color";
		hex?: string;
		url?: string;
	}[];
	indent_level?: number;
}

// Image Block
export interface TumblrNeueImageBlock {
	type: "image";
	media: (TumblrMediaObject | TumblrGifMediaObject)[];
	alt_text?: string;
	caption?: string;
	feedback_token?: string;
	poster?: TumblrMediaObject;
	attribution?: TumblrAttributionObject;
	colors?: Record<`c${number}`, string>;
}

// Link Block
export interface TumblrNeueLinkBlock {
	type: "link";
	url: string;
	title?: string;
	description?: string;
	author?: string;
	site_name?: string;
	display_url?: string;
	poster?: TumblrMediaObject;
}

// Audio Block
export type TumblrNeueAudioBlock = TumblrNeueAudioBlockURL | TumblrNeueAudioBlockMedia;

export interface TumblrNeueAudioBlockBase {
	url?: string;
	media?: TumblrMediaObject;
	type: "audio";
	provider?: string;
	title?: string;
	artist?: string;
	album?: string;
	poster?: TumblrMediaObject;
	embed_html?: string;
	embed_url?: string;
	metadata?: unknown;
	attribution?: TumblrAttributionObject;
}

export interface TumblrNeueAudioBlockURL extends TumblrNeueAudioBlockBase {
	url: string;
	media: never;
}

export interface TumblrNeueAudioBlockMedia extends TumblrNeueAudioBlockBase {
	url: never;
	media: TumblrMediaObject;
}

//Video Block
export type TumblrNeueVideoBlock = TumblrNeueVideoBlockURL | TumblrNeueVideoBlockMedia;

export interface TumblrNeueVideoBlockBase {
	url?: string;
	media?: TumblrMediaObject;
	type: "video";
	provider?: string;
	embed_html?: string;
	embed_url?: string;
	embed_iframe?: TumblrEmbedIframeObject;
	poster?: TumblrMediaObject;
	metadata?: unknown;
	attribution?: TumblrAttributionObject;
	can_autoplay_on_cellular?: boolean;
}

// Video Block
export interface TumblrNeueVideoBlockURL extends TumblrNeueVideoBlockBase {
	url: string;
	media: never;
}

export interface TumblrNeueVideoBlockMedia extends TumblrNeueVideoBlockBase {
	url: never;
	media: TumblrMediaObject;
}

// Paywall Block
export interface TumblrNeuePaywallBlock {
	type: "paywall";
	subtype: "cta" | "divider" | "disabled";
	url: string;
	is_visible?: boolean;
}

export interface TumblrEmbedIframeObject {
	url: string;
	width: number;
	height: number;
}

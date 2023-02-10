import { TumblrAttributionObject } from "./TumblrAttribution";
import { TumblrBlog } from "./TumblrBlog";
import { TumblrGifMediaObject, TumblrMediaObject } from "./TumblrMediaObject";
import { TumblrNeueLayoutBlock } from "./TumblrNeueLayout";

export type TumblrFetchedPost = TumblrFetchedPostBase | TumblrQueuedPost;

interface TumblrFetchedPostBase {
	object_type: "post";
	type: "text" | "photo" | "quote" | "link" | "chat" | "audio" | "video" | "blocks";
	id: string;
	tumblelog_uuid: string;
	parent_post_id: string;
	parent_tumblelog_uuid: string;
	reblog_key: string;
	//TODO: Document trail
	trail: unknown[];
	content: TumblrNeueContentBlock[];
	layout: TumblrNeueLayoutBlock[];
	queued_state?: "queued" | "scheduled";
	scheduled_publish_time?: number;
	publish_on: string;
	interactability_reblog: "everyone" | "noone";
}

interface TumblrQueuedPost extends TumblrFetchedPostBase {
	queued_state: "queued" | "scheduled";
	scheduled_publish_time: number;
}

export interface TumblrNeuePost {
	id: string;
	blog: TumblrBlog;
	content: TumblrNeueContentBlock[];
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
interface TumblrNeueTextBlock {
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
interface TumblrNeueImageBlock {
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
interface TumblrNeueLinkBlock {
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

interface TumblrNeueAudioBlockBase {
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

interface TumblrNeueAudioBlockURL extends TumblrNeueAudioBlockBase {
	url: string;
}

interface TumblrNeueAudioBlockMedia extends TumblrNeueAudioBlockBase {
	media: TumblrMediaObject;
}

//Video Block
export type TumblrNeueVideoBlock = TumblrNeueVideoBlockURL | TumblrNeueVideoBlockMedia;

interface TumblrNeueVideoBlockBase {
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
interface TumblrNeueVideoBlockURL extends TumblrNeueVideoBlockBase {
	url: string;
}

interface TumblrNeueVideoBlockMedia extends TumblrNeueVideoBlockBase {
	media: TumblrMediaObject;
}

// Paywall Block
interface TumblrNeuePaywallBlock {
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

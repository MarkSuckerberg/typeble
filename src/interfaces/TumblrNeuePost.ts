import { TumblrBlog } from "./TumblrBlog";

export interface TumblrNeuePost {
	id: number;
	blog: TumblrBlog;
	content: TumblrNeueContentBlock[];
}

//TODO: Split by type
export interface TumblrNeueContentBlock {
	type: "text" | "image" | "video" | "audio" | "quote" | "link" | "chat" | "answer";
	text?: string;
	width?: number;
	height?: number;
	url?: string;
	title?: string;
	description?: string;
	author?: string;
	site_name?: string;
	display_url?: string;
	poster?: TumblrMediaObject;
	original_dimensions_missing?: boolean;
	cropped?: boolean;
	has_original_dimensions?: boolean;
	subtype?:
		| "heading1"
		| "heading2"
		| "quirky"
		| "quote"
		| "indented"
		| "chat"
		| "ordered-list-item"
		| "unordered-list-item";
	indent_level?: number;
	formatting?: {
		start: number;
		end: number;
		type: "bold" | "italic" | "strikethrough" | "small" | "link" | "code" | "color";
		hex?: string;
		url?: string;
	};
}

export interface TumblrNeueAudioBlock extends TumblrNeueContentBlock {
	type: "audio";
	url: string;
	media: TumblrMediaObject;
	provider?: string;
	title?: string;
	artist?: string;
	album?: string;
	poster?: TumblrMediaObject;
	embed_html?: string;
	embed_url?: string;
	metadata?: any;
}

export interface TumblrMediaObject {
	url: string;
	type?: string;
	width?: number;
	height?: number;
	original_dimensions_missing?: boolean;
	cropped?: boolean;
	has_original_dimensions?: boolean;
}

export interface TumblrNeuelayoutBlock {
	type: "rows" | "ask";
}

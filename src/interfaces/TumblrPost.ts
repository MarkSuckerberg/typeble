import { TumblrLink } from "./TumblrAPIResponse";
import { TumblrFollowerBlog } from "./TumblrBlog";
import { TumblrBlocksPost } from "./TumblrNeuePost";

export type TumblrPost =
	| TumblrLegacyTextPost
	| TumblrLegacyPhotoPost
	| TumblrLegacyQuotePost
	| TumblrLegacyLinkPost
	| TumblrLegacyChatPost
	| TumblrLegacyAudioPost
	| TumblrLegacyVideoPost
	| TumblrLegacyAnswerPost
	| TumblrBlocksPost;

export interface TumblrPostBase {
	object_type: "post";
	blog: TumblrFollowerBlog;
	blog_name: string;
	id: number;
	id_string: string;
	genesis_post_id: string;
	post_url: string;
	short_url: string;
	type: "text" | "photo" | "quote" | "link" | "chat" | "audio" | "video" | "answer" | "blocks";
	timestamp: number;
	date: string;
	format: string;
	reblog_key: string;
	tags: string[];
	bookmarklet: boolean;
	mobile: boolean;
	source_url: string;
	source_title: string;
	liked: boolean;
	state: string;
	is_blocks_post_format: boolean;
	total_posts: number;
	slug: string;
	interactability_reblog: "everyone" | "noone";
	publish_on: string;
	tumblelog_uuid: string;
	parent_post_id: string;
	parent_tumblelog_uuid: string;
	can_like: boolean;
	can_reblog: boolean;
	can_send_in_message: boolean;
	note_count: number;
	should_open_in_legacy: boolean;
	notes?: TumblrNote[];
	broken_blog_name?: string;
}

export interface TumblrLegacyQueuedPost extends TumblrPostBase {
	queued_state: "queued" | "scheduled";
	scheduled_publish_time: number;
	is_blocks_post_format: false;
}

export interface TumblrLegacyTextPost extends TumblrPostBase {
	type: "text";
	title: string;
	body: string;
	is_blocks_post_format: false;
}

export interface TumblrLegacyPhotoPost extends TumblrPostBase {
	type: "photo";
	caption: string;
	width: number;
	height: number;
	photos: TumblrPhoto[];
	is_blocks_post_format: false;
}

export interface TumblrLegacyQuotePost extends TumblrPostBase {
	type: "quote";
	text: string;
	source: string;
	is_blocks_post_format: false;
}

export interface TumblrLegacyLinkPost extends TumblrPostBase {
	type: "link";
	title: string;
	description: string;
	url: string;
	link_author: string;
	excerpt: string;
	publisher: string;
	photos: TumblrPhoto[];
	is_blocks_post_format: false;
}

export interface TumblrLegacyChatPost extends TumblrPostBase {
	type: "chat";
	title: string;
	body: string;
	dialogue: TumblrDialogue[];
	is_blocks_post_format: false;
}

export interface TumblrLegacyAudioPost extends TumblrPostBase {
	type: "audio";
	caption: string;
	player: string;
	plays: number;
	album_art: string;
	artist: string;
	album: string;
	track_name: string;
	track_number: number;
	year: number;
	is_blocks_post_format: false;
}

export interface TumblrLegacyVideoPost extends TumblrPostBase {
	type: "video";
	caption: string;
	player: unknown[];
	width: number;
	embed_code: string;
	is_blocks_post_format: false;
}

export interface TumblrLegacyAnswerPost extends TumblrPostBase {
	type: "answer";
	asking_name: string;
	asking_url: string;
	question: string;
	answer: string;
	is_blocks_post_format: false;
}

interface TumblrPhoto {
	caption: string;
	original_size: TumblrPhotoSize;
	width: number;
	height: number;
	url: string;
	alt_sizes: TumblrPhotoSize[];
}

interface TumblrPhotoSize {
	width: number;
	height: number;
	url: string;
}

interface TumblrDialogue {
	label: string;
	name: string;
	phrase: string;
}

export interface TumblrNoteResponse {
	notes: TumblrNote[];
	rollup_notes?: TumblrNote[];
	total_notes: number;
	total_likes?: number;
	total_reblogs?: number;
	_links: TumblrLink;
}

interface TumblrNote {
	type: "like" | "reblog";
	timestamp: number;
	blog_name: string;
	blog_uuid: string;
	blog_url: string;
	followed: boolean;
	avatar_shape: string;
	avatar_url: {
		"64": string;
		"128": string;
	};
	tags?: string[];
	reblog_parent_blog_name?: string;
}

export interface TumblrBrokenBlogPost extends TumblrPostBase {
	blog: never;
	blog_name: never;
	post_url: never;
	broken_blog_name: string;
}

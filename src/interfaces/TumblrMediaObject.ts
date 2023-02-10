// Media Object
export interface TumblrMediaObject {
	url: string;
	type?: string;
	width?: number;
	height?: number;
	original_dimensions_missing?: boolean;
	cropped?: boolean;
	has_original_dimensions?: boolean;
}

export interface TumblrGifMediaObject extends TumblrMediaObject {
	type: "image/gif";
	poster?: TumblrMediaObject;
}

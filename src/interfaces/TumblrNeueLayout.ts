import { TumblrAttributionBlogObject } from "./TumblrAttribution";

export type TumblrNeueLayoutBlock =
	| TumblrNeueLayoutBlockRows
	| TumblrNeueLayoutBlockCondensedTruncateAfter
	| TumblrNeueLayoutBlockCondensedBlocks
	| TumblrNeueLayoutBlockAsk;

interface TumblrNeueLayoutBlockRows {
	type: "rows";
	display: {
		blocks: number[];
		mode?: {
			type: "weighted" | "carousel";
		};
	}[];
	truncate_after?: number;
}

interface TumblrNeueLayoutBlockCondensedTruncateAfter {
	type: "condensed";
	truncate_after: number;
}

interface TumblrNeueLayoutBlockCondensedBlocks {
	type: "condensed";
	blocks: number[];
}

interface TumblrNeueLayoutBlockAsk {
	type: "ask";
	blocks: number[];
	attribution?: TumblrAttributionBlogObject;
}

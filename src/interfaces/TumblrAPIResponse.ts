export interface TumblrAPIResponse {
	meta: {
		status: number;
		msg: string;
	};
	response: any;
}

export interface TumblrLink {
	type: "navigation" | "action";
	href: string;
}

export interface TumblrAction extends TumblrLink {
	type: "action";
	method: "GET" | "POST";
	query_params: Record<string, string | number>;
}

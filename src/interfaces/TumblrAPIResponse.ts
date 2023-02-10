export interface TumblrAPIResponse {
	meta: {
		status: number;
		msg: string;
	};
	//TODO: Unknown type
	response: any;
	errors?: {
		code: number;
		title: string;
		detail: string;
	}[];
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

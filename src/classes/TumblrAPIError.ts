import { TumblrAPIResponse } from "../interfaces";

export class TumblrAPIError extends Error {
	public response: TumblrAPIResponse;
	public queryURL: string;

	constructor(message: TumblrAPIResponse, queryURL: string) {
		super(`${message.meta.status}: ${message.meta.msg}`);
		this.name = "TumblrAPIError";
		this.response = message;
		this.queryURL = queryURL;
	}
}

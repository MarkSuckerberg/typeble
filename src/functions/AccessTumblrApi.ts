import { TumblrAPIResponse } from "../interfaces";

/**
 * The function to access the Tumblr API. This function is used by the other functions in the project.
 * @param token OAuth2 token from Tumblr
 * @param endpoint String of the endpoint to access
 * @param params Additional query parameters to send to the API, will be sent as a JSON body if the method is not GET
 * @param method HTTP method to use
 * @returns JSON response from the Tumblr API
 * @example accessTumblrAPI(tumblrToken, "blog/blogname.tumblr.com/posts", {limit: "1"}, "GET")
 * @link https://www.tumblr.com/docs/en/api/v2
 */
export async function accessTumblrAPI(
	token: string,
	endpoint: string,
	params?: Record<string, string>,
	method: "GET" | "POST" | "DELETE" | "PUT" = "GET"
): Promise<TumblrAPIResponse> {
	const url =
		method === "GET"
			? `https://api.tumblr.com/v2/${endpoint}?${new URLSearchParams(params)}}`
			: `https://api.tumblr.com/v2/${endpoint}`;
	const request = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"User-Agent": "Typeblr/1.0.0",
			"Authorization": `Bearer ${token}`,
		},
		body: method !== "GET" ? JSON.stringify(params) : null,
	});

	const response: TumblrAPIResponse = await request.json();

	//TODO: Don't make this throw an error, instead return the response and let the caller handle it
	if (!request.ok) {
		throw new Error(
			`${response.meta.status}: ${response.meta.msg} - ${JSON.stringify(response.errors)}`
		);
	}

	return response;
}

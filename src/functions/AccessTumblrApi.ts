import TumblrAPIResponse from "../interfaces/TumblrAPIResponse";

/**
 * The function to access the Tumblr API. This function is used by the other functions in the project.
 * @param token OAuth2 token from Tumblr
 * @param endpoint String of the endpoint to access
 * @param query Additional query parameters to send in the request body
 * @returns JSON response from the Tumblr API
 * @example accessTumblrAPI(tumblrToken, "blog/blogname.tumblr.com/posts", {limit: "1"})
 */
export default async function accessTumblrAPI(
	token: string,
	endpoint: string,
	query?: Record<string, string | number>
): Promise<TumblrAPIResponse> {
	const request = await fetch(`https://api.tumblr.com/v2/${endpoint}`, {
		method: query ? "POST" : "GET",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"User-Agent": "Typeblr/1.0.0",
			"Authorization": `Bearer ${token}`,
		},
		body: JSON.stringify(query),
	});

	const response: TumblrAPIResponse = await request.json();

	if (response.meta.status !== 200) {
		throw new Error(response.meta.msg);
	}

	return response;
}

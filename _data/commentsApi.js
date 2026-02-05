/**
 * Comments API config for the Eleventy Comments API.
 * Set COMMENT_API_URL (e.g. https://your-app.herokuapp.com) in your environment.
 * Optionally set COMMENT_SECRET and the API will require it (send via form or X-Comment-Secret).
 */
export default {
	apiUrl: process.env.COMMENT_API_URL || "",
	commentSecret: process.env.COMMENT_SECRET || "",
};

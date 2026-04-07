import axios from "axios"

const WIKIPEDIA_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary"

export async function getCityImageUrl(cityName) {
	const query = cityName?.trim()
	if (!query) return null
	try {
		const { data } = await axios.get(`${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(query)}`, {
			headers: { Accept: "application/json" },
		})
		return data.thumbnail?.source ?? null
	} catch {
		return null
	}
}

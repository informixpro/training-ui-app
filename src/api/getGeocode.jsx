import axios from "axios"

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"

export async function geocodeCity(name) {
	try {
		const { data } = await axios.get(GEOCODING_URL, {
			params: { name: name.trim(), count: 1, language: "en" },
		})
		if (!data.results?.length) {
			return null
		}
		const r = data.results[0]
		return {
			name: r.name,
			latitude: r.latitude,
			longitude: r.longitude,
			elevation: r.elevation,
			country_code: r.country_code,
			timezone: r.timezone,
			population: r.population,
		}
	} catch (error) {
		console.error("Error geocoding:", error)
		return null
	}
}

import axios from "axios"

const API_BASE_URL = "https://devtest.teskalabs.com"

export async function getItems({ params }) {
  try {
    const limit = params?.i || 10
    const page = params?.p || 1

    const { data } = await axios.get(`${API_BASE_URL}/data`)
    return {
      count: data.count,
      rows: data.data
    }
  } catch (error) {
    console.error("Error loading items:", error);
    return {
      rows: [],
      count: 0
    }
  }
}

export async function getItemById(id) {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/detail/${encodeURIComponent(id)}`)
    if (data && data.id != null) {
      return data
    }
    return null
  } catch (error) {
    console.error("Error loading item:", error)
    return null
  }
}

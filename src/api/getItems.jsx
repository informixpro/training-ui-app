import axios from "axios";

export async function getItems({ params }) {
  try {
    const limit = params?.i || 10;
    const page = params?.p || 1;

    const {data} = await axios.get(
        "https://devtest.teskalabs.com/data",
    )
    return {
      count: data.count,
      rows: data.data
    }
  } catch (error) {
    console.error("Error loading items:", error);
    return {
      data: [],
      total: 0
    }
  }
}

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzRmN2MwMTkxNjEzN2I4MWRjNmUxODJmNzY0MTdjOCIsInN1YiI6IjY0M2Q5MzUwOGUyYmE2MDQ2OWQwNGRlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kySFidCBAt2anmrvs5CwcCYz_A5XSVenqU2thCMT7aU";

const headers = {
	Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
	try {
		const { data } = await axios.get(BASE_URL + url, {
			headers,
			params,
		});
		return data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

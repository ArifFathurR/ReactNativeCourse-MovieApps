export const TMDB_COMFIG = {
    BASE_URL: 'https://api.themoviedb.org/3/',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}

export const fetchMovies = async ({query,}:{query:string}) => {
    const endpoint = query
        ? `${TMDB_COMFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
        `${TMDB_COMFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_COMFIG.headers
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error(response.statusText, 'Failed to Fetch movies');
    }

    const data = await response.json();

    return data.results;
}
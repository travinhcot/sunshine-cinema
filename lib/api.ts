const API_URI = process.env.NEXT_PUBLIC_API_URL;

export interface Movie{
    _id:string;
    title:string;
    description:string;
    director:string;
    poster:string;
    releaseDate:string;
    duration:number;
    rating:number;
    actors: Array<{name:string; character:string}>;
    videoUrl:string;
    views:number;
}

export interface paginatedResponse<T>{
    items: T[];
    pagination: {
        total:number;
        page:number;
        limit:number;
        pages:number;
    };
}

export const getMovies = async (page = 1, limit = 10) => {
    const res = await fetch(`${API_URI}/movies?page=${page}&limit=${limit}`);
    if(!res.ok) throw new Error('Failed to fetch movie');
    return res.json();
};

export const getFeaturedMovies = async () => {
    const res = await fetch(`${API_URI}/movies/featured`);
    if(!res.ok) throw new Error('Failed to fetch feature movies');
    return res.json();
}

export const getMovieByID = async (id:string) => {
    const res = await fetch(`${API_URI}/movies/${id}`);
    if(!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
}

export const getMoviesByCategories = async (categories:string, page = 1, limit = 10) => {
    const res = await fetch(`${API_URI}/movies/category/${categories}?page=${page}&limit=${limit}`);
    if(!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
}

export const getNewMovies = async (page = 1, limit = 10) => {
    const res = await fetch(`${API_URI}/movies/filter/new?page=${page}&limit=${limit}`);
    if(!res.ok) throw new Error('Failed to fetch new movies');
    return res.json();
}  

export const getLegacyMovies = async (page = 1, limit = 10) => {
    const res = await fetch(`${API_URI}/movies/filter/legacy?page=${page}&limit=${limit}`);
    if(!res.ok) throw new Error("Failed to fetch legacy movies");
    return res.json();
}

export const searchMovies = async (query:string) => {
    const res = await fetch(`${API_URI}/movies/search?q=${encodeURIComponent(query)}`);
    if(!res.ok) throw new Error("Failed to search for preferred movies");
    return res.json();
}

export const addToWatchHistory = async (movieId: string, progress:number, token:string) => {
    const res = await fetch(`${API_URI}/users/watch-history`,{
        method:'POST',
        headers:{
            'Content Type': 'application/json()',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({movieId, progress}),
    })
    if(!res.ok) throw new Error('Failed to update watch history');
    return res.json();
};

export const getWatchHistory = async (token:string) =>{
    const res = await fetch(`${API_URI}/users/watch-history`,{
        headers:{Authorization: `Bearer ${token}`},
    });
    if(!res.ok) throw new Error("Failed to fetch user watch history");
    return res.json();
};


export const addToFavorite = async (movieID:string, token:string) => {
    const res = await fetch(`${API_URI}/users/favorite${movieID}`,{
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`}
    });

    if(!res.ok) throw new Error('Failed to fetch favorite movie');
    return res.json();
}

export const removeFromFavorite = async (movieID:string,token:string) => {
    const res = await fetch(`${API_URI}/users/favorite/${movieID}`,{
        method: 'POST',
        headers:{Authorization: `Bearer ${token}`}
    });
    if(!res.ok) throw new Error('Failed to remove from favorite');
    return res.json();
}


export const getFavorite = async (token:string) => {
    const res = await fetch(`${API_URI}/users/favorite`,{
        headers:{Authorization: `Bearer ${token}`}
    });
    if(!res.ok) throw new Error('Failed to remove from favorite');
    return res.json();
}

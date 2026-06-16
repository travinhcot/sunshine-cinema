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
}



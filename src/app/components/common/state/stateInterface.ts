export interface MoviesStatesInterface{
    isLoading: boolean;
    movies: [];
    error: string | null;
    users:{
        isLoading: boolean;
    }
}
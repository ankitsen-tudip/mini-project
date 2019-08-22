const initialState = {
        movieList: [],
        searchList:[],
    isLoading: true
};
const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "GET_MOVIES":
            return {
                ...state,
                movieList: action.response.results,
                isLoading: false
            };
        case "REMOVE_MOVIE":
            return {
                ...state,
                movieList: state.movieList.filter(movie => movie.id !== action.response)
            };
        case "CREATE_NEW_MOVIE":
            let tempMovie = [...state.movieList];
            tempMovie.unshift(action.response);
            return {
                ...state,
                movieList: tempMovie,
            };
        case "SEARCH_MOVIE":
            let searchMovieList = state.movieList.filter(movie =>
                (((movie.original_title).toLowerCase()).includes((action.response).toLowerCase())))
            if (searchMovieList.length > 0) {
                return {
                    ...state,
                    searchList: searchMovieList
                }
            }
            else {
                    alert("No Result Found.");
                    return {
                        ...state
                    }
            }

        case "EDIT_MOVIE": {
            return {
                ...state,
                movieList:state.movieList.map(movie => {
                    return movie.id === action.response.id ? action.response : movie;
                })
            };
        }

        default: break;
    }

    return state;
};
export default movieReducer;
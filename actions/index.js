import axios from "axios";

const getMovies = () => {
    return (dispatch) => {
        dispatch({type: "LOADING"});
        axios.get("https://api.themoviedb.org/3/discover/movie?api_key=c2e3bac276977d104e287f26135466a2&sort_by=popularity.desc")
            .then((response) => {
                dispatch({type: "GET_MOVIES", response: response.data});
            }).catch((error) => {
                alert("Fails to call API !!!");
            })
    }
};

export { getMovies };

export  const searchMovie = (id) => {
    return (dispatch) => {
        dispatch({
            type: "SEARCH_MOVIE",
            response: id,
        })
    }
}

export  const createNewMovie = newMovie => {
    return (dispatch) => {
        dispatch({
            type: "CREATE_NEW_MOVIE",
            response: newMovie,
        })
    }
}

export  const editMovie = newMovie => {
    return (dispatch) => {
        dispatch({
            type: "EDIT_MOVIE",
            response: newMovie,
        })
    }
}

export  const removeMovie = (id) =>{
    return(dispatch) =>{
        dispatch({
            type: "REMOVE_MOVIE",
            response: id,
        })
    }
};
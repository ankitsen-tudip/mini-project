import React, { Component } from "react";
import { connect } from "react-redux";
import {getMovies, removeMovie, createNewMovie, searchMovie, editMovie} from "../redux/actions";
import AddMovie from "./AddMovies";
import Search from "./Search";
import DisplayCard from "./DisplayCard";

class user extends Component {
    constructor() {
        super();
        this.state = {
            addMovie: false,
            search: false,
            modalIsOpen: false
        };
    }

    onClick = () => {
        this.setState({
            addMovie: !this.state.addMovie,
            modalIsOpen: true});
    };

    closeModal = () => {
        this.setState({addMovie: false});
    };

    componentDidMount() {
        this.props.fetchMovies();
    }


    onSearch = (e) => {
        this.setState({
            search: !this.state.search,
        })
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({movieList: nextProps.movieList})
    }

    render() {
        const { isLoading, movieList, editMovieData, removeMovie, searchList, createNewMovie, searchMovie } = this.props;
        const { addMovie } = this.state;
        const { search } = this.state;

        if(isLoading) {
            return <p>Loading...</p>
        }

        return (
            <React.Fragment>
                <h2>Movies List</h2>
                <button className="Add_btn btn btn-dark" onClick={this.onClick}>{addMovie ? "Cancel" : "Add" }</button>
                <AddMovie
                    closeFormAfterAdding ={() => this.onClick()}
                    createNewMovie={createNewMovie}
                    modalIsOpen={addMovie}
                    closeModal={() => this.closeModal()}
                />
                <button className="Search_btn btn btn-danger" onClick={this.onSearch}>{search ? "Cancel" : "Search" }</button>
                {
                    search && <Search searchMovie={searchMovie}/>
                }
                <div>
                {
                    search ? (
                        searchList.length > 0 ? (
                    <div>
                        {searchList.map(movie => {

                                const {
                                    id,
                                    original_title,
                                    original_language,
                                    popularity,
                                    release_date,
                                    editMovieData
                                } = movie;
                                return (
                                    <div className="cards text-center" key={id}>
                                        <DisplayCard
                                            id={id}
                                            original_title={original_title}
                                            original_language={original_language}
                                            popularity={popularity}
                                            release_date={release_date}
                                            removeMovie={removeMovie}
                                            editMovieData={editMovieData}
                                        />
                                    </div>
                                );
                        })}
                    </div>
                            ) : (
                            <div>
                                { movieList.map(movie => {
                                    const {
                                        id,
                                        original_title,
                                        original_language,
                                        popularity,
                                        release_date
                                    } = movie;
                                    return (
                                        <div className="cards text-center" key={id}>
                                            <DisplayCard
                                                id={id}
                                                original_title={original_title}
                                                original_language={original_language}
                                                popularity={popularity}
                                                release_date={release_date}
                                                removeMovie={removeMovie}
                                                editMovieData={editMovieData}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                    )) : (
                        <div>
                            { movieList.map(movie => {
                                const {
                                    id,
                                    original_title,
                                    original_language,
                                    popularity,
                                    release_date
                                } = movie;
                                return (
                                    <div className="cards text-center" key={id}>
                                        <DisplayCard
                                            id={id}
                                            original_title={original_title}
                                            original_language={original_language}
                                            popularity={popularity}
                                            release_date={release_date}
                                            removeMovie={removeMovie}
                                            editMovieData={editMovieData}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )
                }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    movieList: state.movie.movieList,
    searchList: state.movie.searchList,
    isLoading: state.movie.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMovies: () => dispatch(getMovies()),
    removeMovie: (id) => dispatch(removeMovie(id)),
    searchMovie: (id) => dispatch(searchMovie(id)),
    createNewMovie: newMovie => dispatch(createNewMovie(newMovie)),
    editMovieData: newMovie => dispatch(editMovie(newMovie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(user);

import React, { Component } from "react";
import AddMovie from "./AddMovies";

class DisplayCard extends Component {
    state = {
      edit: false
    };

    delHandler = (e, id) => {
        this.props.removeMovie(id);
    };

    editHandler = (e, id) => {
           this.setState({
               edit: !this.state.edit
           })
    };

    render() {
        const {
            id,
            original_title,
            original_language,
            popularity,
            release_date,
            editMovieData,
        }=this.props;
        const { edit } =this.state;
        return (
            <React.Fragment>
                <AddMovie
                    closeFormAfterAdding = {this.editHandler}
                    editMovie = { editMovieData }
                    edit = { edit }
                    id = { id }
                    original_title = { original_title }
                    original_language = { original_language }
                    popularity = { popularity }
                    release_date = { release_date }
                    modalIsOpen={edit}
                    closeModal={() => this.editHandler()}
                />
                <div key={id}>
                    <p>Title: {original_title}</p>
                    <h6>Language: {original_language}</h6>
                    <br/>
                    <h6>Popularity: {popularity}</h6>
                    <br />
                    <h6>Release Date: {release_date}</h6>
                    <br />
                    <input type="button" value="Edit"
                           className="btn btn-dark"
                           onClick={(e) => this.editHandler(e, id)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="button"
                        value="Delete"
                        className="btn btn-danger"
                        onClick={(e) => this.delHandler(e, id)}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default DisplayCard;
import React from "react";
import { Modal } from 'react-bootstrap';

var charRegex = /^[a-zA-Z]/;
var numRegex = /^[0-9]{1,10}$/;

function validateInput() {
    let errors = {};
    for (var i = 0; i< arguments.length ; i+=1) {
        let input = arguments[i];
        let validationType = input.getAttribute("data-validation-type");
        if (validationType === null)
            validationType = input.type;

        let errorName = input.name + "Error";

        errors[errorName] = "";

        if(input.value ==="" || input.value.length ===0) {
            errors[errorName] = "Please fill this in";
        }
        else if (validationType === "original_title") {
            if(input.value.match(charRegex) === null ||
            input.value.length < 3 ) {
                errors[errorName] = "Please fill properly "
            }
        }
        else if (validationType === "original_language") {
            if(input.value.match(charRegex) === null ||
                input.value.length < 2 ) {
                errors[errorName] = "Please fill properly "
            }
        }
        else if (validationType === "id") {
            if(input.value.match(numRegex) === null ||
                input.value.length < 1 ) {
                errors[errorName] = "Please fill properly "
            }
        }
        else if (validationType === "popularity") {
            if(input.value.match(numRegex) === null ||
                input.value.length < 1 ) {
                errors[errorName] = "Please fill properly "
            }
        }
    }
    return errors;
}

class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id || "",
            idError:"",
            original_title: props.original_title || "",
            originalTitleError:"",
            release_date: props.release_date || "",
            popularity: props.popularity || "",
            popularityError:"",
            original_language: props.original_language || "",
            originalLanguageError:"",
        };
    }

    onChange = (e, edit) => {
            let input = e.target;
            let errors = validateInput(input);
            this.setState({
                ...this.state,
                [input.name]: input.value,
                ...errors
            });
    };

    onSubmit = (e,edit)=> {
        const { closeFormAfterAdding, createNewMovie,editMovie } = this.props;
        e.preventDefault();
        let errors = validateInput(
            e.target.id,
            e.target.original_title,
            e.target.release_date,
            e.target.popularity,
            e.target.original_language,
        );

        this.setState({
            ...this.state,
            ...errors
        });

        let idError = this.state.idError;
        let originalTitleError = this.state.originalTitleError;
        let popularityError = this.state.popularityError;
        let originalLanguageError = this.state.originalLanguageError;

        if (
            idError === "" &&
            originalTitleError === "" &&
            popularityError === "" &&
            originalLanguageError === "" ) {
            if(edit){
                editMovie(this.state);
                closeFormAfterAdding(e);
            }
            else{
                createNewMovie(this.state);
                closeFormAfterAdding(e);
            }
        }
        else {
            alert("Please fill the form properly.")
        }

    };

    render() {
        const {
                id,
                original_title,
                release_date,
                popularity,
                original_language,
            }=this.state;
        const{edit, modalIsOpen, closeModal} =this.props;

        return (
        <Modal
            className="modal"
            show={modalIsOpen}
            onHide={closeModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="modal_header">
                <Modal.Title className="modal_title">
                    <h3>Data Form</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal_body">
                <form onSubmit={(e) => this.onSubmit(e, edit)}>
                    <div className="form-group">
                        <p>{this.state.idError}</p>
                            <input
                                type="text"
                                name="id"
                                value={id}
                                data-validation-type="id"
                                className="form-control"
                                onChange={this.onChange}
                                required
                                disabled={edit}
                            />
                        <label className="form-control-placeholder">
                                ID
                        </label>
                    </div>
                    <div className="form-group">
                        <p>{this.state.originalTitleError}</p>
                            <input
                                type="text"
                                name="original_title"
                                className="form-control"
                                data-validation-type="original_title"
                                value={original_title}
                                onChange={this.onChange}
                                required
                            />
                        <label className="form-control-placeholder">
                                Title
                        </label>
                    </div>
                    <div className="form-group">
                        <p>{this.state.originalLanguageError}</p>
                            <input
                                type="text"
                                name="original_language"
                                className="form-control"
                                data-validation-type="original_language"
                                value={original_language}
                                onChange={this.onChange}
                                required
                            />
                        <label className="form-control-placeholder">
                                Language
                        </label>
                    </div>
                    <div className="form-group">
                        <p>{this.state.popularityError}</p>
                        <input
                                type="text"
                                name="popularity"
                                className="form-control"
                                data-validation-type="popularity"
                                value={popularity}
                                onChange={this.onChange}
                                required
                            />
                        <label className="form-control-placeholder">
                                Popularity
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                                type="Date"
                                name="release_date"
                                className="form-control"
                                value={release_date}
                                onChange={this.onChange}
                                required
                            />
                        <label className="form-control-placeholder">
                              {/*  Release Data*/}
                        </label>
                    </div>
                    <div>
                        <button className="Submit_btn btn btn-dark" type="submit">Submit</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
        )
    }
}

export  default  AddMovie;
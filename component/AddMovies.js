import React from "react";
import { Modal } from 'react-bootstrap';

class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id || "",
            original_title: props.original_title || "",
            release_date: props.release_date || "",
            popularity: props.popularity || "",
            original_language: props.original_language || "",
        };
    }

    onChange = (e, edit) => {
            this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e,edit)=> {
        const { closeFormAfterAdding, createNewMovie,editMovie } = this.props;
        e.preventDefault();
        if(edit){
            editMovie(this.state);
            closeFormAfterAdding(e);
        }
        else{
            createNewMovie(this.state);
            closeFormAfterAdding(e);
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
                            <input
                                type="text"
                                name="id"
                                value={id}
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
                            <input
                                type="text"
                                name="original_title"
                                className="form-control"
                                value={original_title}
                                onChange={this.onChange}
                                required
                            />
                        <label className="form-control-placeholder">
                                Title
                        </label>
                    </div>
                    <div className="form-group">
                            <input
                                type="text"
                                name="original_language"
                                className="form-control"
                                value={original_language}
                                onChange={this.onChange}
                                required
                            />
                        <label className="form-control-placeholder">
                                Language
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                                type="text"
                                name="popularity"
                                className="form-control"
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
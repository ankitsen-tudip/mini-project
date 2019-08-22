import React, { Component } from 'react';
class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            searchByName:"",
        }
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    };
    onSearch =(e) =>{
        e.preventDefault();
        this.props.searchMovie(this.state.searchByName);
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSearch}>
                    <div className="searchbox">
                        <input type="text" name="searchByName" value={this.state.searchByName} onChange={this.onChange} />
                        &nbsp;&nbsp;
                        <button value="search" className="btn btn-dark" type='submit'>Search</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Search;
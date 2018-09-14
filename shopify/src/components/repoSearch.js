import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchGithub, starRepo } from '../actions';

class RepoSearch extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddStar = this.handleAddStar.bind(this);
        this.state = { searchValue: '' };
    }

    handleAddStar(e) {
        const { fully } = this.props.searchResult;
        const { dispatch, githubConn } = this.props;
        const target = e.target.id;
        fully.forEach((item) => {
            if (item.id === parseInt(target, 10)) {
                console.log(item);
                dispatch(starRepo(item, githubConn.gh));
            }
        });
    }

    handleChange(e) {
        this.setState({ searchValue: e.target.value });
    }

    handleSearch(e) {
        const { dispatch } = this.props;
        e.preventDefault();
        dispatch(searchGithub(this.state.searchValue));
    }

    render() {
        return (
            <div>
                <form className="search" onSubmit={this.handleSearch}>
                    <div className="form-group large-form-group">
                        <input type="text" placeholder="Type something here to begin..." name="searchQuery" onChange={this.handleChange} />
                    </div>
                    <div className="form-group small-form-group">
                        <input type="submit" className="btn-large bg-purple" />
                    </div>
                </form>
                <div className="search-results">
                    <table>
                        <tbody>
                            <tr className="table-header">
                                <td>Name</td>
                                <td>Language</td>
                                <td>Latest Tag</td>
                                <td></td>
                            </tr>
                            {this.props.searchResult.newLoad && this.props.searchResult.fully.map(item => (
                                <tr key={item.id}>
                                    <td>{item.full_name}</td>
                                    <td>{item.language}</td>
                                    <td>{item.latest_release}</td>
                                    <td><span role="button" className="add-link" id={item.id} onClick={this.handleAddStar}>Add</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { searchResult, githubConn } = state || { items: [], searching: false, loaded: false };
    return { searchResult, githubConn };
};

export default connect(mapStateToProps)(RepoSearch);

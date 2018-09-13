import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyFavorites extends Component {
    render() {
        return (
            <div>
                <div className="search-results">
                    <table>
                        <tbody>
                            <tr className="table-header">
                                <td>Name</td>
                                <td>Language</td>
                                <td>Latest Tag</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Test</td>
                                <td>Better not be JS</td>
                                <td>Latest Tag</td>
                                <td>ADD</td>
                            </tr>
                            <tr>
                                <td>Test</td>
                                <td>Better not be JS</td>
                                <td>Latest Tag</td>
                                <td>ADD</td>
                            </tr>
                            <tr>
                                <td>Test</td>
                                <td>Better not be JS</td>
                                <td>Latest Tag</td>
                                <td>ADD</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { test } = state || { working: false };
    return { test };
};

export default connect(mapStateToProps)(MyFavorites);

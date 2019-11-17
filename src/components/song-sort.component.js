import React, { Component } from 'react';

export default class SongSort extends Component {
    constructor(props) {
        super(props);

        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange(e) {
        this.props.onSelect(e.target.value);
    }

    render () {
        return(
            <form>
                <div>
                    <label>Sort</label>
                    <select onChange={this.onSelectChange}>
                        <option value="createdAt">Date Added</option>
                        <option value="title">Title</option>
                        <option value="artist">Artist</option>
                    </select>
                </div>
            </form>    
        )
    }
}
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

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
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Sort</Form.Label>
                    <Form.Control as="select" onChange={this.onSelectChange}>
                        <option value="createdAt">Date Added</option>
                        <option value="title">Title</option>
                        <option value="artist">Artist</option>
                    </Form.Control>
                </Form.Group>
            </Form>    
        )
    }
}
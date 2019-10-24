import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default class SelectedSong extends Component {
    constructor(props) {
        super(props);

        this.notes = this.notes.bind(this);
    }

    notes() {
        return this.props.selectedSong.notes.map(note => {
            return(
                <ListGroup.Item key={note}>{note}</ListGroup.Item>
            )
        })
    }

    render() {
        if(this.props.selectedSong) {
            return (
                <Card>
                    <Card.Body>
                        <Card.Title>{this.props.selectedSong.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.selectedSong.artist}</Card.Subtitle>
                        <Card.Text>{this.props.selectedSong.album}</Card.Text>
                        <Card.Text>Difficulty: {this.props.selectedSong.difficulty}</Card.Text>
                        {
                            this.props.selectedSong.notes.length ?

                            <div>
                                <Card.Text>Notes: </Card.Text>
                                <ListGroup>
                                    {this.notes()}
                                </ListGroup>
                            </div>

                            :

                            <div></div>
                        }
                    </Card.Body>
                </Card>
            )
        } else {
            return <div></div>
        }
    }
}
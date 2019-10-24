import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

export default class SongList extends Component {
    constructor(props) {
        super(props)

        this.songList = this.songList.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.alert = this.alert.bind(this);

        this.state = {
            deleteLinkClicked: false,
            alertItem: ''
        }
    }

    alert(id = '') {
        this.setState({
            deleteLinkClicked: !this.state.deleteLinkClicked,
            alertItem: id
        });
    }

    onDelete(e, id) {
        e.preventDefault();

        this.props.onDelete(id);

        this.setState({
            deleteLinkClicked: false,
            alertItem: ''
        });
    }

    songList() {
        return this.props.songs.map((song, key) => {
            return (
                <ListGroup.Item key={song._id} action>
                    <Row>
                        <Col sm="10" onClick={() => this.props.songSelector(song)} className="border-right">
                            {song.title} - {song.artist}
                        </Col>
                        <Col sm="2">
                            <i onClick={() => this.alert(song._id)} className="fa fa-trash text-right"></i>                        
                        </Col>
                    </Row>
                    {
                        this.state.deleteLinkClicked && song._id === this.state.alertItem ?

                        <Alert variant="danger">
                            Are you sure you want to delete? {' '}
                            <Alert.Link href="#" className="mr-3" onClick={(e) => this.onDelete(e, song._id)}>Delete</Alert.Link>
                            <Alert.Link href="#" onClick={() => this.alert()}>Cancel</Alert.Link>
                        </Alert>

                        :

                        <div></div>                        
                    }
                </ListGroup.Item>
            )
        });
    }

    render() {
        return (
            <ListGroup>
                {this.songList()}
            </ListGroup>
        )
    }
}
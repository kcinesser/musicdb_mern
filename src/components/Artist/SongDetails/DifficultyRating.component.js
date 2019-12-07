import React, { Component } from 'react';

export default class DifficultyRating extends Component {
    constructor(props) {
        super(props);

        this.stars = this.stars.bind(this);
        this.rate = this.rate.bind(this);
        this.star_over = this.star_over.bind(this);
        this.star_out = this.star_out.bind(this);

        this.state = {
            rating: null,
            temp_rating: null
        }
    }

    componentDidMount() {
        this.setState({
            rating: this.props.rating
        })
    }

    rate(rating) {
        this.setState({
            rating: rating,
            temp_rating: rating
        })
    }

    star_over(rating) {
        this.setState({
            temp_rating: this.state.rating,
            rating: rating
        })
    }

    star_out() {
        this.setState({
            rating: this.state.temp_rating
        })
    }

    stars() {
        let stars = [];

        for(let i = 1; i < 6; i++) {
            var klass = 'star-rating__star';
        
            if (this.state.rating >= i && this.state.rating != null) {
                klass += ' is-selected';
            }
                    
            stars.push(
                <label
                    key={i}
                    className={klass}
                    onClick={() => this.rate(i)}
                    onMouseOver={() => this.star_over(i)}
                    onMouseOut={() => this.star_out()}>
                    ★
                </label>
            )
        }

        return stars;
    }

    render() {      
        return (
            <div className="star-rating">
                {this.stars()}
            </div>        
        )
    }
}
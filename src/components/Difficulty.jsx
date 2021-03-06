import React, { Component } from 'react';

export default class Difficulty extends Component {
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

        this.props.onRate(rating);
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
            var classValue = 'star-rating__star';
        
            if (this.state.rating >= i && this.state.rating != null) {
                classValue += ' is-selected';
            }
                    
            if(this.props.editable) {
              stars.push(
                <label
                    key={i}
                    className={classValue}
                    onClick={() => this.rate(i)}
                    onMouseOver={() => this.star_over(i)}
                    onMouseOut={() => this.star_out()}>
                    ★
                </label>
              )
            } else {
              stars.push(
                <label
                  key={i}
                  className={classValue}>
                  ★
                </label>
              )
            }
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
import React, { Component } from 'react'
import PropTypes from 'prop-types'


/**
 * Book's rating
 */
class Rating extends Component {

  static propTypes = {
    averageRating: PropTypes.number.isRequired
  }

  /**
   * Return book rating className
   */
  ratingClassName = (averageRating) => {
    return `book-rating book-rating-${(averageRating.toString().replace(/\D/, '-'))}`
  }

  render(){
    const { averageRating } = this.props

    return(
      <div
        className={this.ratingClassName(averageRating)}
        title={'Average rating ' + averageRating}>
        <span>{averageRating}</span>
      </div>
    )
  }
}

export default Rating
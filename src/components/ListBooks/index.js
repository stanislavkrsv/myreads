import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from './../Bookshelf'
import Placeholder from './Placeholder'


class ListBooks extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    applicationLoaded: PropTypes.bool.isRequired
  }

  render(){

    const { shelves, updateBookShelf, applicationLoaded } = this.props

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {applicationLoaded
          ? (<div className="list-books-content">
              {shelves.map((shelf) => shelf.id !== 'none' && (
                <Bookshelf
                  key={shelf.id}
                  shelves={shelves}
                  shelf={shelf}
                  updateBookShelf={updateBookShelf}
                />)
              )}
            </div>
        ) : (
          <Placeholder/>
        )}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
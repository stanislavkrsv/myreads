import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './../Book'


/**
 * Bookshelf
 */
class Bookshelf extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    shelf: PropTypes.object.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  render() {

    const { shelves, shelf, updateBookShelf} = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          {shelf.books.length > 0 ? (
            <ol className="books-grid">
              {shelf.books.map((book) =>
                <Book
                  key={book.id}
                  book={book}
                  shelves={shelves}
                  currentShelfId={shelf.id}
                  updateBookShelf={updateBookShelf}
                />
              )}
            </ol>
          ) : (
            <div className="bookshelf-empty">Shelf is empty</div>
          )}
        </div>
      </div>
    )
  }
}

export default Bookshelf
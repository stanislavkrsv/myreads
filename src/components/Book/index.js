import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Rating from './Rating'


/**
 * Book
 */
class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    currentShelfId: PropTypes.string.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  render(){

    const { book, shelves, currentShelfId, updateBookShelf} = this.props

    return(
      <li>
        <div className="book">
          <div className={"book-top " + (book.updateRequestActive ? "book-update-active" : "")}>

            {/* Book cover with image */}
            {book.imageLinks && (<div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>)}

            {/* "Default" book cover (ex. search "V")*/}
            {!book.imageLinks && (
              <div className="book-cover-default">
                <b className="book-cover-default-author">{book.authors && book.authors.join(', ')}</b>
                {book.title}
              </div>
            )}

            <div className="book-shelf-changer">
              <select defaultValue={currentShelfId} onChange={(event)=> {updateBookShelf(book, event.target.value)}}>
                <option value="moveTo" disabled>Move to...</option>
                {shelves.map((shelve) =>
                  <option key={shelve.id} value={shelve.id}>{shelve.title}</option>
                )}
              </select>
            </div>
          </div>

          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>

          {/* Rating */}
          {book.averageRating && (<Rating averageRating={book.averageRating}/>)}

        </div>
      </li>
    )
  }
}

export default Book
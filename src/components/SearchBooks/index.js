import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './../../utils/BooksAPI'
import Book from './../Book'


/**
 * Search books
 */
class SearchBooks extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    isBookExists:  PropTypes.func.isRequired
  }

  state = {
    query: '',
    isSearching: false,
    searchResult: []
  }

  /**
   * onChange query event
   * @param {string} query
   */
  updateQuery = (query) => {
    this.setState({query: query.trim()}, () => {
      if (this.state.query.length) {
        this.setState({isSearching: true})
        BooksAPI.search(this.state.query, 20).then((searchResultBooks) => {
          this.updateSearchResult(searchResultBooks)
        })
      } else {
        this.updateSearchResult([])
      }
    })
  }


  updateSearchResult = (searchResult) => {

    if (!Array.isArray(searchResult)) {
      searchResult = []
    }

    /**
     * Removing doubles, replace exists books
     * Set shelf 'none' for not exist books
     */
    let fixedBookList = searchResult
      .filter((book, index, bookList) => index === bookList.findIndex(book2 => book.id === book2.id))
      .map(book => {
        let isBookExists = this.props.isBookExists(book)
        if (!!isBookExists) {
          return isBookExists
        } else {
          book.shelf = 'none'
          return book
        }
      })
    this.setState({searchResult : fixedBookList}, () => { this.setState({isSearching: false}) })
  }

  render() {

    const { shelves, updateBookShelf } = this.props
    const { query, isSearching, searchResult } = this.state

    return (
      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          {isSearching && (<div className="search-books-animation"></div>)}
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              name="query"
              value={query}
              autoFocus
              onChange={(event)=> {this.updateQuery(event.target.value)}}
            />
          </div>
        </div>

        <div className={"search-books-results" + (isSearching ? " search-books-is-searching": " ")}>
          {query && searchResult.length > 0 && (
            <ol className="books-grid">
              {searchResult.map((book) => <Book key={book.id} book={book} shelves={shelves} currentShelfId={book.shelf} updateBookShelf={updateBookShelf} /> )}
            </ol>
          )}
          {!isSearching && query.length > 0 && searchResult.length === 0  && (
            <div className="search-books-empty-results">
              <p>Your search - <strong>{query}</strong> - did not match any books.</p>
              Suggestions:
              <ul>
                <li>Make sure word is spelled correctly</li>
                <li>Try different keyword</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
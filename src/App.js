import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'


class BooksApp extends Component {
  state = {
    books: [],
    query: '',
    searchResultBooks: [],
    applicationLoaded: false
  }

  componentDidMount() {
    this.setState({applicationLoaded : false})
    BooksAPI.getAll().then((books) => this.setState({books}, () => this.setState({applicationLoaded : true})))
  }

  /**
   * Update book's shelf
   * @param {Object} book - Book
   * @param {strong} shelf - Shelf
   */
  updateBookShelf = (book, shelf) => {
    book.updateRequestActive = true
    this.setState(({ books }) => books, () => {
      book.shelf = shelf
      BooksAPI.update(book, shelf).then(() => {
        book.updateRequestActive = false
        this.setState(({ books }) => {
          const bookExists = !!this.isBookExists(book)
          return { books: (bookExists ? books : books.concat([book])) }
        })
      })
    })
  }

  /**
   * Return book if book exists in state
   * @param {Object} book - Book
   * @returns {*}
   */
  isBookExists = (book) => {
    return this.state.books.find(b => (b.id === book.id))
  }

  render() {

    let shelves = [
      {
        id: 'currentlyReading',
        title : 'Currently Reading',
        books: this.state.books.filter((book) => book.shelf === 'currentlyReading')
      },
      {
        id: 'wantToRead',
        title : 'Want to Read',
        books: this.state.books.filter((book) => book.shelf === 'wantToRead')
      },
      {
        id: 'read',
        title : 'Read',
        books: this.state.books.filter((book) => book.shelf === 'read')
      },
      {
        id: 'none',
        title : 'None',
        books: []
      },
    ]

    return (
      <div className="app">

        {/* Main page */}
        <Route exact path='/' render={() => (
          <ListBooks shelves={shelves} updateBookShelf={this.updateBookShelf} applicationLoaded={this.state.applicationLoaded}/>
        )} />

        {/* Search books */}
        <Route path='/search' render={() => (
          <SearchBooks shelves={shelves} updateBookShelf={this.updateBookShelf} isBookExists={this.isBookExists}/>
        )} />

      </div>
    )
  }
}

export default BooksApp
import React, { Component } from 'react'

class Placeholder extends Component {

  render(){
    return(
      <div className="list-books-placeholder">
        <div className="list-books-placeholder-title"></div>
        <div className="list-books-placeholder-books">
          <ol className="books-grid">
            <li><div className="book-placeholder" ></div></li>
            <li><div className="book-placeholder" ></div></li>
            <li><div className="book-placeholder book-placeholder-additional" ></div></li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Placeholder
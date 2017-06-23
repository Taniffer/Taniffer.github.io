import React from 'react';
import {render} from 'react-dom';


import {BookItem, BookItemIndex} from './bookItem';
import AddModal from './addModal'


import joe from '../../img/books/joe.png'
import {Row, Col} from 'antd';

import {connect} from 'react-redux'
import {deleteBook,editBook,editOk,addBook,addOk,addCancel} from '../actions'
import '../main.css';
import axios from 'axios'

class BookItemContainer extends React.Component {
  // constructor(props){
  //   super(props);
  //
  //   this.state = {
  //       bookListState:[
  //         {title:'久石让作品集',anotherName:'久石让',version:1,address:'湖南文艺出版社',code:'9787777777',imgURL:joe},
  //         {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777778',imgURL:joe},
  //         {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777779',imgURL:joe},
  //         {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777780',imgURL:joe},
  //         {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777781',imgURL:joe}
  //       ]
  //   };
  //
  //   this.onDeleteBook=this.onDeleteBook.bind(this);
  // }
  //
  // onDeleteBook(deleteKey){
  //   this.setState(function(prevState){
  //     return {
  //       bookListState: prevState.bookListState.filter(function(book){
  //         return book.code !==deleteKey;
  //       })
  //     }
  //   });
  // }

  render() {

    const {dispatch, books, visibilityAddModal} = this.props

    var rows = [ < Col className = "gutter-row" key = '1'  span = {4} > <BookItemIndex addBook = {()=>dispatch(addBook())} /> < /Col>];
    books.forEach((bookitem)=>{
      rows.push(<Col key={bookitem.code} className="gutter-row" span={4}>  <BookItem editBook={code=>dispatch(editBook(code))} deleteBook={code=>dispatch(deleteBook(code))} code={bookitem.code} title={bookitem.title} imgURL={bookitem.imgURL}/ > </Col>);

    });

    return (
      <div className='booklists'>
        <Row gutter={16}>
          {rows}
        </Row>
      {visibilityAddModal.add&& <AddModal   handleOk={(newBook)=>dispatch(addOk(newBook))} handleCancel = {()=>dispatch(addCancel())} ></AddModal>}
       {visibilityAddModal.edit && <AddModal  books={books} handleOk={(theBook)=>dispatch(editOk(theBook))} handleCancel = {()=>dispatch(addCancel())} ></AddModal>}
      </div>

    );
  }
}

function select(state) {
  return {books: state.books,
  visibilityAddModal: state.visibilityAddModal}
}

export default connect(select)(BookItemContainer)

import React from 'react';
import {render} from 'react-dom';
import {BookItem,BookItemIndex} from './bookItem';
import joe from '../img/books/joe.png'
import {Row,Col} from 'antd';

import { connect } from 'react-redux'
import {deleteBook} from './actions'
import './main.css';



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
     const{dispatch,bookitems}= this.props
     console.log(bookitems);
    var rows=[<Col className="gutter-row" span={4}><BookItemIndex/></Col>];
    bookitems.forEach((bookitem)=>{
      rows.push(<Col key={bookitem.code} className="gutter-row" span={4}>  <BookItem  deleteBook={code=>dispatch(deleteBook(code))} code={bookitem.code} title={bookitem.title} imgURL={bookitem.imgURL}/></Col>);

    });

    return (
      <div className='booklists'>
        <Row gutter={16}>
          {rows}
        </Row>
      </div>

    );
  }
}



function select(state){
  return {state}
}

export default connect(select)(BookItemContainer)

import React from 'react';
import {render} from 'react-dom';


import {Card, Icon, Button,Row,Col} from 'antd';

// const projectData = [
//   {title:'久石让作品集',anotherName:'久石让',version:1,address:'湖南文艺出版社',code:'9787777777',imgURL:joe},
//   {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777777',imgURL:joe},
//   {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777777',imgURL:joe}
//
// ];

export class BookItem extends React.Component {

    constructor(props){
      super(props);
      this.deleteBook=this.deleteBook.bind(this);
      this.editBook=this.editBook.bind(this);
    }

    editBook(){
      let code = this.props.code;
      this.props.editBook(code);
    }
    deleteBook(){
      let code = this.props.code;
      this.props.deleteBook(code);
    }

    render() {
    return (

      <Card style={{
        width: 240,

        textAlign:'center'
      }}>
        <img alt={this.props.title} style={{width:'100%',height:280}} src={this.props.imgURL}/>
        <h2>{this.props.title}</h2>
        <Button type="primary" size='large' icon='edit' onClick={this.editBook} style={{
          float:'Left',width:55,margin:10
        }}></Button>

        <Button type="danger" size='large' icon='delete' onClick={this.deleteBook} style={{
          float:'right',width:55,margin:10
        }}></Button>
      </Card>

    );
  }
}

export  class BookItemIndex extends React.Component {
  constructor(props){
    super(props);
    this.addBook=this.addBook.bind(this);
  }


  addBook(){

    this.props.addBook();
  }

  render() {
    return (
      <div onClick={this.addBook}>
      <Card style={{
        width: 240,
        padding: "130px 0",
        height:390
      }} bodyStyle={{
        padding: 0,
        textAlign: 'center'
      }}>
        <Icon type="plus-circle-o" style={{
          fontSize: 100
        }}/>
      </Card>
    </div>
    );
  }

}

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
    }


    deleteBook(){
      let code = this.props.code;
      this.props.deleteBook(code);
    }

    render() {
    return (

      <Card style={{
        width: 240,
        height:'100%',
        textAlign:'center'
      }}>
        <img alt={this.props.title} width="100%" src={this.props.imgURL}/>
        <h2>{this.props.title}</h2>
        <Button type="primary" size='large' icon='edit' style={{
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
  render() {
    return (
      <Card style={{
        width: 240,
        padding: "130px 0",
        height:'100%'
      }} bodyStyle={{
        padding: 0,
        textAlign: 'center'
      }}>
        <Icon type="plus-circle-o" style={{
          fontSize: 100
        }}/>
      </Card>
    );
  }

}

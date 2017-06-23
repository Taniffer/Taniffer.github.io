import React from 'react';
import {Modal,Input} from 'antd';





export default class AddModal extends React.Component {

  constructor(props){
    super(props);
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.change=this.change.bind(this);
    this.state= {title:'',anotherName:'',version:'',address:'',code:'',imgURL:''};

  }

  componentDidMount() {
    if(this.props.books){

      var books=this.props.books;
      for (let i = 0; i < books.length; i++) {
        if(books[i].edit==true){
          console.log(books[i]);
            var foundBook=books[i];
            this.setState(foundBook);
        }
      }


}

}

  render() {
    console.log(this.state);
    return (
      <div>
        <Modal title="添加曲目"
         visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel} >
          <div style={{ marginBottom: 16 }}>  <Input  onChange={this.change} placeholder="书名" value={this.state.title} /></div>
          <div style={{ marginBottom: 16 }}>  <Input  onChange={this.change} placeholder="别名" value={this.state.anotherName}  /></div>
          <div style={{ marginBottom: 16 }}>  <Input addonBefore="第" onChange={this.change} addonAfter="版" placeholder="版号" value={this.state.version}  /></div>
          <div style={{ marginBottom: 16 }}>  <Input   onChange={this.change} placeholder="条形码" value={this.state.code}  /></div>
          <div style={{ marginBottom: 16 }}>  <Input  onChange={this.change}  placeholder="出版社" value={this.state.address}   /></div>
        </Modal>
      </div>
    )
  }

 change(e){
   var valueTitle=e.target.placeholder;
   var value = e.target.value;
     if(valueTitle=='书名'){
       this.setState({title:value});
     }
    if(valueTitle=='版号'){
       this.setState({version:value});
     }
    if(valueTitle=='条形码'){
      this.setState({code:value});
      }
    if(valueTitle=='别名'){
        this.setState({anotherName:value});
       }
      if(valueTitle=='出版社'){
        this.setState({address:value});
      }
 }

  handleOk() {
    // if(this.state.code==''){
    //   alert('别添加空书籍');
    //   return
    // }
    let newBook=this.state;
    this.props.handleOk(newBook);

  }

  handleCancel() {
    this.props.handleCancel();

  }

}

import {DELETE,ADD_BOOK,EDIT_BOOK,EDIT_OK,addBook,editOk,deleteBook,editBook} from './actions'
import {ADD_OK,ADD_CANCEL,addOk,addCancle} from './actions'
import { combineReducers } from 'redux'
import joe from '../img/books/joe.png'

function books(state = [
          {title:'久石让作品集',anotherName:'久石让',version:1,address:'湖南文艺出版社',code:'9787777777',imgURL:joe,edit:false},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777778',imgURL:joe,edit:false},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777779',imgURL:joe,edit:false},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777780',imgURL:joe,edit:false},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777781',imgURL:joe,edit:false}]
        ,action){
  switch(action.type){
    case DELETE:{

      return state.filter(function(book){
        return book.code !=action.deleteKey;
      });

    }
case ADD_OK:{
  for (var i = 0; i < state.length; i++) {
    if(action.newBook.code==state[i].code){
      alert('书籍已存在');

      return state
    }
  }

   return [...state,action.newBook];
}

case EDIT_BOOK:{
  for (var i = 0; i < state.length; i++) {
    if(action.editKey==state[i].code){
      return       [  ...state.slice(0, i),
        Object.assign({}, state[i], {
          edit: true
        }),
        ...state.slice(i + 1)
      ]
    }
  }


}
case ADD_CANCEL:{
  return state.map(function(obj){
    if(obj.edit==true){
      return   Object.assign({},obj,  { edit: false });
    }
    else return obj;
  });
}
case EDIT_OK:{
  for (var i = 0; i < state.length; i++) {
    if(state[i].edit==true){
      console.log(i);
      return       [  ...state.slice(0, i),
        Object.assign({},action.theBook,
          {
          edit: false
        }),
        ...state.slice(i + 1)
      ]

    }
  }
}
    default:
      return state
  }
}


function visibilityAddModal(state={'add':false,'edit':false},action){
  switch(action.type){
    case ADD_BOOK:{
      return {'add':true,'edit':false}
    }
    case ADD_CANCEL:{
      return {'add':false,'edit':false}
    }
    case ADD_OK:{

      return {'add':false,'edit':false}

    }
    case EDIT_BOOK:{

      return {'add':false,'edit':true}

    }
    case EDIT_OK:{

      return {'add':false,'edit':false}

    }

    default:
      return state


  }
}


const bookApp = combineReducers({
   books,
   visibilityAddModal
});

export default bookApp;

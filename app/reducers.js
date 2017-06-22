import {DELETE,deleteBook} from './actions'
import { combineReducers } from 'redux'
import joe from '../img/books/joe.png'

function bookitems(state = [
          {title:'久石让作品集',anotherName:'久石让',version:1,address:'湖南文艺出版社',code:'9787777777',imgURL:joe},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777778',imgURL:joe},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777779',imgURL:joe},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777780',imgURL:joe},
          {title:'久石让作品集',anotherName:'石久让',version:1,address:'湖南文艺出版社',code:'9787777781',imgURL:joe}]
        ,action){
  switch(action.type){
    case DELETE:{

      return

      state.filter(function(book){
        return book.code !==action.deleteKey;
      })
    }



    default:
      return state
  }
}

const bookApp = combineReducers({
   bookitems
})

export default bookApp

import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import BookItemContainer from './components/BookItemContainer.js'
import bookApp from './reducers'
import axios from 'axios'

let store = createStore(bookApp)

let rootElement = document.getElementById('root')
axios.get('http://115.159.143.172/myppd/back_end/public/pc/book_list')
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

render(



<Provider store={store}>
  <BookItemContainer/>
</Provider>
, rootElement);

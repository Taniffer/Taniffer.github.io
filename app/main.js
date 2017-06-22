import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import BookItemContainer from './BookItemContainer.js'
import bookApp from './reducers'

let store = createStore(bookApp)

let rootElement = document.getElementById('root')


render(
<Provider store={store}>
  <BookItemContainer/>
</Provider>
, rootElement);

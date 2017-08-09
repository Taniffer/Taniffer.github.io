/**
 * Created by Alex on 2017/6/21.
 */
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import{render} from 'react-dom'
import React from 'react'
import BookContainer from './components/BookContainer'
import bookContainer from './reducers'
import OpernList from './components/show-operns/OpernList'
import OpernPanel from './components/show-operns/OpernPanel'
import Header from './components/Header/Header'

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import $ from 'jquery'
import {bookContainerLoaded} from './actions'

import axios from 'axios'

import Avatar from './components/UpLoad/Avatar'
import Crop from './components/UpLoad/Crop'
import './css/main.css'


$(function () {
    let store = createStore(bookContainer, applyMiddleware(thunk));
    render(
        <Provider store={store}>
            <Router>
                <div>
                    <Header/>
                         <Switch>
                        <Route exact path="/build" component={BookContainer} />
                        <Route path="/build/opernList" component={OpernPanel}/>
                      </Switch>

                </div>
            </Router>
        </Provider>
        ,
        document.getElementById('root'));
    axios.get('/api/pc/book_list').then(data => {
        store.dispatch(bookContainerLoaded(data.data))
    });
});
// render(<Avatar/>, document.getElementById('root'));

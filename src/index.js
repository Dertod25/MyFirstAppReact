import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { ROUTES } from './routes'

const STORE = configureStore()

render(
    <Provider store={STORE}>
    <Router history={browserHistory} routes={ROUTES} />
        </Provider>,
    document.getElementById('root')
)
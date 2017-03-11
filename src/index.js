import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { ROUTES } from './routes'

render(
    <Router history={browserHistory} routes={ROUTES} />,
    document.getElementById('root')
)
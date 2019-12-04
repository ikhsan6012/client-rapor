import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import Logo from './components/Logo'
import Nav from './components/Nav'
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'))
const RaporAr = lazy(() => import('./pages/RaporAr'))

console.log(process.env)

const App = () =>
	<Router>
		<div className="container">
			<Logo />
			<Nav />
			<Suspense fallback={ <Loading /> }>
				<Switch>
					<Route exact path="/" component={ Home } />
					<Route path="/rapor-ar" component={ RaporAr } />
				</Switch>
			</Suspense>
		</div>
	</Router>
export default App
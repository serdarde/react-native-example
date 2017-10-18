import React from 'react'
import Router from './src/router'
import { Provider } from 'react-redux'
import store from './src/root-store'

/**
 * App's main component
 *
 * This app based on
 * as State manager: redux
 * as Navigator: react-navigator
 */
class App extends React.Component {
  render () {
    /**
     * clear console if clear function exists
     */
    if (console.clear) {
      console.clear()
    }

    /**
     * Render App
     */
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    )
  }
}

export default App

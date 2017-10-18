import React from 'react'
import { TabNavigator } from 'react-navigation'
import Home from './containers/Home'
import Settings from './containers/History'

/**
 * App has 2 main screens,
 * Home which you can calculate currencies
 * and History to see recent calculations
 */
const App = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => (navigation.navigationOptions)
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => (navigation.navigationOptions)
  }
},
{
  initialRouteName: 'Home',
  header: null
});

export default App

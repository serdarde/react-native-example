import React from 'react'
import { View, StatusBar } from 'react-native'

/**
 * For main settings which you have to set with native component
 */
class Main extends React.Component {
  /**
   * Render component
   * @return {XML}
   */
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true}/>
        {this.props.children}
      </View>
    )
  }
}

export default Main

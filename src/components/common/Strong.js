import React from 'react'
import {Text} from 'react-native'

class Strong extends React.Component {
  render () {
    return <Text style={{fontWeight: 'bold'}}>
      {this.props.children}
    </Text>
  }
}

export {Strong}

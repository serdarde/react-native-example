import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import Main from '../Main'
import * as actions from '../actions'

class Settings extends React.Component {
  /**
   * Set navigation options
   * @param navigation
   */
  static navigationOptions = ({navigation}) => ({
    title: 'History',
    tabBarIcon: ({focused}) => {
      return <Icon
        color={focused ? '#333' : '#999'}
        type='font-awesome'
        name='history'/>
    }
  })

  /**
   * Get logs on start
   */
  componentDidMount () {
    this.props.getLogs()
  }

  /**
   * render calculated list if there is valid value
   */
  renderLogs = () => {
    // prevent empty loops
    if (typeof this.props.logs === 'undefined') {
      return false
    }

    let results = []

    // loop for each rate
    for (let index in this.props.logs) {
      // only own properties
      if (!this.props.logs.hasOwnProperty(index)) {
        continue
      }

      // get data
      let {currency, rate, amount} = this.props.logs[index]
      let result = (rate * amount).toFixed(2)

      results.push(<Text key={index} style={styles.logs}>
        {amount} euro is {result} {currency}
      </Text>)
    }

    return results
  }

  /**
   * render settings
   * @returns {XML}
   */
  render () {
    return (
      <Main>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Recent Calculations
          </Text>

          <ScrollView style={styles.logsContainer}>
            {this.renderLogs()}
          </ScrollView>
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2c3766'
  },
  icon: {
    width: 20,
    height: 20
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15
  },
  logsContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  logs: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
})

/**
 * Define prop types to prevent type errors in production
 */
Settings.propTypes = {
  logs: PropTypes.object
}

const mapPropsToState = ({currencies, logs}) => {
  return {
    currencies, logs
  }
}

export default connect(mapPropsToState, actions)(Settings)

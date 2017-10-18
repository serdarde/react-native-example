import React from 'react'
import { connect } from 'react-redux'
import {
  AsyncStorage,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Main from '../Main'
import { Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import * as actions from '../actions'

class Home extends React.Component {
  /**
   * Set navigation options
   * @param navigation
   */
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    tabBarIcon: ({focused}) => {
      return <Icon
        color={focused ? '#333' : '#999'}
        type='font-awesome'
        name='home'/>
    }
  })

  /**
   * Set initial state
   * @type {{amount: string}}
   */
  state = {
    amount: '1',
    selectedBase: 'USD',
    result: ''
  }

  /**
   * After component loaded, make remote request
   */
  componentDidMount () {
    // get actual currencies
    this.props.getRemoteCurrencies(this.props.currencies.selectedBase)

    // create storage
    this.createEmptyStorage()
  }

  /**
   * create empty log storage if it doesn't exists
   */
  createEmptyStorage = () => {
    // clear storage
    // AsyncStorage.removeItem('logs')
    AsyncStorage.getItem('logs').then((recentLogs) => {
      // if there is no logs in storage create it
      if (!recentLogs) {
        // create first empty object in storage
        AsyncStorage.setItem('logs', JSON.stringify({}))
      }
    })
  }

  /**
   * update amount
   */
  updateAmount = (value) => {
    // check if value is a number
    this.setState(() => {
      let intValue = parseInt(value)

      // if this is not a valid number, return false
      if (value === '' || isNaN(intValue)) {
        intValue = ''
      }

      // set state
      return {
        amount: String(intValue)
      }
    })
  }
  /**
   * render calculated list if there is valid value
   */
  renderPickerItems = () => {
    // prevent empty loops
    if (typeof this.props.currencies.rates === 'undefined') {
      return false
    }

    let result = []
    // loop for each rate
    for (let rate of this.props.currencies.rates) {
      result.push(<Picker.Item
        key={rate.currency}
        color="white" label={rate.currency} value={rate.currency}/>)
    }

    return result
  }

  /**
   * update selected base
   */
  changeBase = (itemValue) => {
    this.setState({
      selectedBase: itemValue
    })
  }
  /**
   * calculate result and push it in history
   */
  calculate = () => {
    // show warning if there is no currencies
    if (!this.props.currencies ||
      typeof this.props.currencies.rates === 'undefined') {
      this.setState({
        result: 'An error occurred, please try later'
      })
    }

    // find rate
    let selectedCurrency = this.props.currencies.rates.find((item) => {
      if (item.currency === this.state.selectedBase) {
        return item
      }
      return false
    })

    // destructure items
    let {rate, currency} = selectedCurrency

    // calc result
    let result = (rate * this.state.amount).toFixed(2)

    // show result
    this.setState({
      result: `${this.state.amount} euro is ${result} ${currency}`
    })

    // put in history
    let {amount} = this.state
    this.props.logProcess({rate, currency, amount})
  }

  /**
   * render view
   * @returns {XML}
   */
  render () {
    return (
      <Main>
        <View style={styles.container}>
          <Text style={styles.headerText}>Calculate Currency</Text>
          <View style={styles.row}>
            <Text style={[styles.col]}>
              From:
            </Text>
            <Text style={[styles.col]}>
              EURO
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.col, {alignSelf: 'center'}]}>
              To:
            </Text>
            <Picker style={[styles.picker]} itemStyle={{height: 100}}
              selectedValue={this.state.selectedBase}
              onValueChange={this.changeBase}>
              {this.renderPickerItems()}
            </Picker>
          </View>
          <View style={styles.row}>
            <Text style={[styles.col, {alignSelf: 'center'}]}>
              Amount:
            </Text>
            <View style={styles.amountContainer}>
              <TextInput
                onChangeText={this.updateAmount}
                value={this.state.amount}
                style={[styles.amountInput]}
              />
            </View>
          </View>

          <View style={styles.result}>
            <Text style={styles.resultText}>
              {this.state.result}
            </Text>
          </View>
          <Button
            backgroundColor={'#67b800'}
            title={'Calculate'}
            onPress={this.calculate}
            style={styles.button}/>
        </View>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2c3766',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  result: {
    padding: 20,
    justifyContent: 'center'
  },
  resultText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14
  },
  amountContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  amountInput: {
    backgroundColor: '#fff',
    width: 100,
    height: 30,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: 16
  },
  picker: {
    flex: 1,
    padding: 10,
    width: 100
  },
  button: {}
})

/**
 * Define prop types to prevent type errors in production
 */
Home.propTypes = {
  currencies: PropTypes.object
}

const mapPropsToState = ({currencies}) => {
  return {
    currencies
  }
}

export default connect(mapPropsToState, actions)(Home)

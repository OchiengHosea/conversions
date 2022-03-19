import React, { Component } from 'react';
import {
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

/* this is the stack declaration */
const Stack = createStackNavigator();

/* this is the component for the home screen */
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <View style={styles.container}>
          <View style={styles.instructionsContainer}>
            <Text style={styles.header}>This is temperature to farhenhite converter</Text>
            <Text></Text>
          </View>
          <View style={styles.navContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> {this.props.navigation.navigate("CtoF")}}
            >
              <Text style={styles.buttonLabel}>Convert C to F</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

/*
This is the component for the Celsius to Fahrenheit screen
Add a <TextInput> to get the degrees in Celsius
Add a <Text> to display the degrees in Fahrenheit
Use state variables as required
You may have it update as you are typing or after you press Button

Note 1: the TextInput captures text (not numbers) so you may need to use
    parseFloat( somestring )
to convert the string representation of the degrees to a number for Math

Note 2: the formula for converting Celsius to Fahrenheit is
    F = (C * 1.8) + 32

Note 3: To display a value with 2 fixed decimal places you can use the method
    .toFixed(2)

*/
class CtoFScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celsius: 0,
      farns: 0
    }
  }

  convert = (val) => {
    const celsius = val !== null ? Number(val) : 0;
    const farns = (celsius * 1.8) +32
    this.setState({
      celcius: celsius,
      farns: farns.toFixed(5)
    })
  }

  render() {
    return(
        <View style={styles.container}>
          <Text style={styles.results}>{this.state.farns} F</Text>

          <Text style={styles.instructions}>Enter Celsius value</Text>
          <TextInput style={styles.textInput} placeholder="Enter celsius value here" onChangeText={this.convert}></TextInput>

          <View style={styles.navContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> {this.props.navigation.navigate("FtoC")}}
            >
              <Text style={styles.buttonLabel}>Convert F to C</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

/*
Add a FtoC screen component that works like the CtoFScreen but in reverse
Add it to the stack and add a button for navigating to it.

Note 1: the formula for converting Fahrenheit to Celsius is
    C = (F - 32) * 0.5556
*/

class FtoCScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celsius: 0,
      farns: 0
    }
  }

  convert = (val) => {
    const farns = val !== null ? Number(val) : 0;
    const celsius = (farns - 32) * 0.5556;
    this.setState({
      celsius:celsius.toFixed(5),
      farns: farns
    })
  }

  render() {
    return(
        <View style={styles.container}>

          <Text style={styles.results}>{this.state.celsius} C</Text>

          <Text style={styles.instructions}>Enter Fahrenheit value</Text>
          <TextInput style={styles.textInput} placeholder="Enter fahrenheit value" onChangeText={this.convert}></TextInput>

          <View style={styles.navContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=> {this.props.navigation.navigate("Home")}}
            >
              <Text style={styles.buttonLabel}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}




/* Fahrenheit to Celsius screen to be defined above this */
/* Here is the main (default) App */
export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* this is a sample comment inside a layout */}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="CtoF"
                component={CtoFScreen}
                options={{title: "Celsius to Fahrenheit"}}
            />

            <Stack.Screen
                name="FtoC"
                component={FtoCScreen}
                options={{title: "Fahrenheit to Celsius"}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "40%",
    textAlign: "center",
    fontSize: 20
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
    textAlign: "center",
  },
  instructions: {
    fontWeight: "bold",
    marginVertical: 4,
    fontSize: 15,
    textAlign: "right"
  },
  results: {
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 50,
    fontSize: 50,
    color: "grey"
  },
  header:{
    fontWeight: "bold",
    fontSize: 30,
    padding: 20,
    textAlign: "center",
    marginVertical: 5
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    paddingStart: 8,
    paddingEnd: 8
  }
});

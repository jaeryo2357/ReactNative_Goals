import { StyleSheet, View, TextInput, Button, Modal, Image } from 'react-native';
import { useState } from 'react'

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
      setEnteredGoalText(enteredText)
    };

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText)
        setEnteredGoalText('')
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <Image style={styles.imaage} source={require('../assets/goal.png')}></Image>
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Your course goal!'
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                />
                <View style={styles.bottomContainer}>
                    <View style={styles.button}>
                        <Button title= "Add Goal" onPress={addGoalHandler} color="#b180f0"/>
                    </View>
                    <View style={styles.button}>
                        <Button title= "Cancel" onPress={props.onDismiss} color="#f31282"/>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default GoalInput

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#313b6b'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    marginHorizontal: 16,
    width: '100%',
    padding: 8
  },
  bottomContainer: {
    marginTop: 16,
    flexDirection: 'row'
  },
  imaage: {
    width: 100,
    height: 100,
    marginBottom: 24
  },
  button: {
    width: 100,
    marginHorizontal: 8
  }
});
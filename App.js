import { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startCreateGoal() {
    setModalVisible(true)
  }

  function endCreateGoal() {
    setModalVisible(false)
  }

  function addGoalHandler(enteredText) {
     setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { text: enteredText, id: Math.random().toString() }])
     endCreateGoal()
  };

  function deleteGoalHandler(id) {
     setCourseGoals((currentCourseGoals) => currentCourseGoals.filter((goal) => goal.id !== id))
  }

  return (
    <View style={styles.appCntainer}>
      <Button title='Add New Goal' onPress={startCreateGoal} />
      {isModalVisible && <GoalInput onAddGoal={addGoalHandler} visible={isModalVisible} onDismiss={endCreateGoal}/>}
      <View style={styles.goalContainer}>
        <Text>List of goals...</Text>
        <FlatList
          data={courseGoals}
          renderItem={(item) => {
              return <GoalItem 
                        text={item.item.text}
                        id={item.item.id}
                        onDeleteItem={deleteGoalHandler}
                      />
            } 
          }
          keyExtractor={(item) => item.id }
        >
        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appCntainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalContainer: {
    flex: 5
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
      color: 'white'
  }
});

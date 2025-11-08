# React Native 기초
react native 프로젝트 생성
```jsx
npx create-expo-app --template blank
```
프로젝트를 새롭게 생성할 때 template 중에 고를 수 있음. [template 종류](https://docs.expo.dev/more/create-expo/)


# React Native Styling
리액트 컴포넌트의 속성을 설정하는 방법
>💡
>브라우저에 동작하는 CSS는 React Native에서 사용할 수 없다. 
단, JavaScripts 언어로 작성가능한 **Inline Styles or StyleSheet** **Objects**를 사용해야 한다. 
>CSS와 비슷한 문법으로 작성되지만, 모든 CSS 속성을 사용할 수 있는 것은 아니다.

- Iniine Styles

```jsx
 <Text
   style={{ margin: 16, borderWidth: 2, borderColor: 'red', padding: 16}}
 >
   Open up App.js to start working on your app!
 </Text>
```

- StyleSheet Objects

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

StyleSheet Objects의 방법을 사용하는 것이 좋다. 생성한 스타일을 다른 컴포넌트에서 재활용할 수 있고, 문법 오류도 체크된다.



# App Component

>💡
>App.js 파일의 App Component는 네이티브 기기에 렌더링되는 `루트 컴포넌트`

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```



# Flexbox 집중 탐구

web과 다르게 react native의 View는 flexbox를 기본값으로 사용한다. (세로 정렬)

flowDirection에 따른 주축, 교차축

|  | row | row-reverse | column | column-reverse |
| --- | --- | --- | --- | --- |
| 주축 | 왼쪽→오른쪽 | 오른쪽→왼쪽 | 위→아래 | 아래→위 |
| 교차축 | 위→아래 | 아래 → 위 | 왼쪽→오른쪽 | 오른쪽→왼쪽 |
- 교차축도 같이 **reverse** 된다.

**justifyContent**: **주축**에 따라 요소를 정렬

**alignItems**: **교차축**에 따라 요소를 정렬

flowDirection: row  justfy 부모에게만 적용이 되고, alignItems 자식까지 다 적용됨.

flex 속성은 부모의 주축에서 모든 요소를 표시하고, 남은 공간을 차지할 비율 (like `weight`)


>💡
>교차축에서 차지할 공간은 부모의 alignItems에서 지정

부모의 공간이 자식에 따라서 자동으로 늘어나지 않음
부모는 flex 기본값(최소 공간), 자식에서 flex 1, 3 속성을 사용해도 부모 공간이 최소 공간으로 사용 중이니 늘어나지 않음. 

부모 flex stratch 공간을 크게 잡아야 자식의 flex 올바르게 쓸 수 있다.

column, row →

constraint =?

<View>

</ View>

겹치는 뷰는 어떻게 그릴까..

Compose의 weight와 다른 점..? 

# 상태 관리

React Native는 React와 동일한 방식으로 상태를 관리한다.

import { useState } from 'react’ ← react에서 import 하고 있음

 const [courseGoals, setCourseGoals] = useState([]);

```jsx
 function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
```

복잡한 상태 관리 어떻게 할까? ⇒ ViewModel..?

StateHolder ?

# list 목록 그리기

```jsx
{courseGoals.map(goal => <Text>{goal}</Text>)}
```

강의에서는 key 없을 때 warning이었지만 빌드해보니 **error**로 표시되네..

# ScrollView vs FlatList

scrollView ⇒ 화면에 보이지 않는 요소도 모두 렌더링

FlatList ⇒ 화면에 보이는 요소만 렌더링

item의 key property 요소를 자동으로 추적, `keyExtractor` 속성으로 직접 지정도 가능

```jsx
				<FlatList
          data={courseGoals}
          renderItem={(item) => {
              return (
                <View style={styles.goalItem}>
                  <Text style={styles.goalText}>{item.item.text}</Text>
                </View>
              )
            } 
          }
          keyExtractor={(item) => item.id }
        >
        </FlatList>
```

# 이벤트

```jsx
  <GoalInput onAddGoal={addGoalHandler}/>
```

addGoalHandler() ← 중괄호 하지 않게 주의하기
호출될 함수 이름을 넘겨야 함

## 함수 값 넘기기

```jsx
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText)
        setEnteredGoalText('')
    }
    
     <Button title= "Add Goal" onPress={addGoalHandler}/>
```

```jsx
<Pressable onPress={props.onDeleteItem.bind(this, props.id)}>
```


# Modal

```jsx
      <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
            ...
      </Modal>
```

모달은 <Modal> 컴포넌트를 사용하여 컨텐츠를 감싸면 구현됨.
호출하는 쪽에서 모달의 visible 상태 관리 필요

# Image

```jsx
<Image style={styles.imaage} source={require('../assets/goal.png')}></Image>
```

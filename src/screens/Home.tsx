import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../Components/Header';
import { Props, Task } from '../types';
// import { saveTodo, setTodos } from '../features/todoReducer';
import { useSelector } from 'react-redux'
import { RootState } from '../features/store';
import { Button, Text, TextInput } from "@react-native-material/core";
import { ListItem } from "@react-native-material/core";
import { saveTodo, setTodos } from '../features/todoReducer';
import Footer from '../Components/Footer';

export default function Home({ navigation, GlobalState }: Props) {
    const tasks = useSelector((state: RootState) => state.todoList)
    // const { toDoList, setChosenTask } = GlobalState;
    const dispatch = useDispatch();
    const [toDoList, setToDoList] = useState<Task[]>([{ id: 1, code: 'brush your teeth' }]);
    const [task, setTask] = useState('');
    const [chosenTask, setChosenTask] = useState<Task>({ id: 0, code: '' });


    useEffect(() => {
        // const todos: Task[] = [{ id: 1, code: 'aaa' }, { id: 2, code: 'Task 2' }]
        dispatch(setTodos(toDoList))
        console.log('tasks >> ', tasks)
    }, [])

    const renderItem = (data: any) => {
        // console.log('data >> ' , val.item)
        return (
            <TouchableOpacity
                style={styles.task}
                onPress={() => handleChooseTask(data.item)}
            >
                <Text>{data.item.code}</Text>
            </TouchableOpacity>
        )
    }
    const handleSaveTask = () => {
        const index = toDoList.length + 1;
        let taska: Task = { id: index, code: task }
        console.log('task >> ', taska)

        dispatch(saveTodo(taska))

        setToDoList(prevState => [...prevState, taska]);

        setTask('');
    }

    const handleChooseTask = (task: Task) => {
        setChosenTask(task);
        navigation.navigate('ChosenTask', task);
    }

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <TextInput
                    style={styles.input}
                    onChangeText={setTask}
                    value={task}
                    placeholder="To do task..."
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSaveTask()}
                >
                    <Text style={styles.buttonText} >Submit</Text>
                </TouchableOpacity>
                <FlatList
                    data={toDoList}
                    renderItem={renderItem}
                    keyExtractor={x => x.id + ''}
                />
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 8,
        width: '100%',
        backgroundColor: '#14141410'
    },
    task: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
        marginTop: 30,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#141414',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
        marginBottom: 30,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: '900'
    }
})
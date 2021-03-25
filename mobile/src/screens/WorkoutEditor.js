import React, { Component } from 'react';
import { View, ScrollView, Modal, Text, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// @ts-ignore
import SwipeUpDown from 'react-native-swipe-up-down-fix';

import TextBox from '../components/TextBox';
import Button from '../components/Button';
import ExerciseLabel from '../components/ExerciseLabel';
import ExerciseEditor from './ExerciseEditor';

import styles from '../styles';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.route.params?.workout.name,
            exercises: this.props.route.params?.workout.exercises ?? [],
            list: [{name: 'Bench', sets: true, reps: true}, {name: 'Squats', sets: true, reps: true}],
            currKey: -1,
            currExercise: '',
            numExercises: 0,
            modalVisible: false,
        };

        this.createExercise = this.createExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.editExercise = this.editExercise.bind(this);
    }

    componentDidMount() {
        //server call to get workout information if the user decided to edit a workout
        // server call to get previously saved exercises??
        // this.setState({ list: parsed result })
    }

    createExercise(exercise) {
        console.log('create exercise');
        let newArray = this.state.exercises.map(exercise => exercise);
        let edited = false;
        // if (this.state.currExercise < this.state.numExercises) {
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i].key === this.state.currKey) {
                    //console.log('found exercise');
                    newArray[i] = { key: this.state.currKey, name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline };
                    edited = true;
                }
            }
        // } else {
            if (!edited) {
                //console.log('create')
                let key = this.state.numExercises;
                newArray.push({ key: key++, name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline });

                this.setState({ numExercises: key });
            }
        //}

        this.setState({ exercises: newArray });
        this.setState({ currExercise: '' });
        this.setState({ currKey: -1 });
        this.setState({ modalVisible: false });
        this.forceUpdate();
    }

    deleteExercise(exercise) {
        let newArray = this.state.exercises;

        for (let i = 0; i < newArray.length; i++) {
            if (exercise.name == newArray[i].name) {
                newArray.splice(i, 1);
            }
        }

        this.setState({ exercises: newArray });
        this.setState({ currExercise: '' });
    }

    editExercise(exercise) {
        for (let i = 0; i < this.state.exercises.length; i++) {
            if (exercise.name === this.state.exercises[i].name) {
                this.setState({ currKey: this.state.exercises[i].key });
            }
        }

        this.setState({ currExercise: exercise });
        this.swipeUpDownRef.showFull();
    }

    render() {
        //console.log('render')
        let exerciseList = [];
        //console.log('array length: ' + exerciseList.length)
        for (let i = 0; i < this.state.exercises.length; i++) {
            let exercise = this.state.exercises[i];
            //console.log('editor sets: ' + exercise.sets)
            exerciseList.push(
                <ExerciseLabel
                    key={i}
                    name={exercise.name}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    weight={exercise.weight}
                    duration={exercise.duration}
                    distance={exercise.distance}
                    pace={exercise.pace}
                    incline={exercise.incline}
                    edit={(exercise) => this.editExercise(exercise)}
                />
            );
        }

        let buttonList = [];
        for (let i = 0; i < this.state.list.length; i++) {
            let exercise = this.state.list[i];
            buttonList.push(
                <Button
                    key={i}
                    buttonText={exercise.name}
                    onPress={() => this.createExercise({name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight})}
                    orange={true}
                />
            )
        }
        return(
            //add a dropdown menu populated with previously added exercises
            <View style={styles.workoutEditorContainer}>
                {/* <Text style={{marginTop: 15, fontSize: 20}}>{this.state.workoutName}</Text> */}
                <TextBox
                    placeholder='Workout Name'
                    onChangeText={(text) => this.setState({ name: text })}
                    style={{marginTop: 20, alignItems: 'center'}}
                    value={this.state.name}
                />
                <ScrollView style={styles.exerciseList} contentContainerStyle={{alignItems: 'center'}}>
                    {exerciseList}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setState({ modalVisible: !this.state.modalVisible});
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            {/* <Button
                                buttonText='Bench'  
                                onPress={() => this.createExercise({name: 'Bench', sets: 3, reps: 12})}
                                orange={true}
                            /> */}
                            {buttonList}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <Button
                        buttonText='Add exercise'
                        style={{width: 150}}
                        onPress={() => /*this.swipeUpDownRef.showFull()*/ this.setState({ modalVisible: true })}
                        orange={true}
                    />
                </ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <Button
                        buttonText='Cancel'
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                        style={{marginRight: 40}}
                        orange={true}
                    />
                    <Button
                        buttonText='Delete'
                        onPress={() => {
                            this.props.deleteExercise(this.state);
                            this.props.dismiss();
                        }}
                        style={{marginRight: 40}}
                        orange={true}
                    />
                    <Button
                        buttonText='Submit'
                        onPress={() => {
                            this.props.navigation.navigate('Dashboard', { workout: this.state });
                        }}
                        orange={true}
                    />
                </View>
                <SwipeUpDown		
                    itemFull={
                        <ExerciseEditor
                            createExercise={(exercise) => this.createExercise(exercise)}
                            deleteExercise={(exercise) => this.deleteExercise(exercise)}
                            dismiss={() => this.swipeUpDownRef.showMini()}
                            name={this.state.currExercise.name}
                            sets={this.state.currExercise.sets}
                            reps={this.state.currExercise.reps}
                            weight={this.state.currExercise.weight}
                            duration={this.state.currExercise.duration}
                            distance={this.state.currExercise.distance}
                            pace={this.state.currExercise.pace}
                            incline={this.state.currExercise.incline}
                        />
                    } // Pass props component when show full
                    style={{ backgroundColor: '#FFFFFF' }} // style for swipe
                    animation='easeInEaseOut'
                    hasRef={(ref) => this.swipeUpDownRef = ref}
                />
            </View>
        );
    }
}
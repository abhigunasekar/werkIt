import React, { Component } from 'react';
import { View, ScrollView, Modal, Text, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import SwipeUpDown from 'react-native-swipe-up-down-fix';

import TextBox from '../components/TextBox';
import Button from '../components/Button';
import ExerciseLabel from '../components/ExerciseLabel';
import ExerciseEditor from './ExerciseEditor';

import * as serverMethods from '../ServerMethods';
import styles from '../styles';
import { duplicateExerciseError, missingNameError, workoutTypeError } from '../components/Alerts';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.route.params?.workout.name,
            exercises: this.props.route.params?.workout.exercises ?? [],
            currExercise: '',
        };

        this.addExercise = this.addExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.editExercise = this.editExercise.bind(this);
    }

    componentDidMount() {
        //console.log('didMount')
        //server call to get workout information if the user decided to edit a workout
        // server call to get previously saved types
        serverMethods.getUserWorkoutTypes(this.props.route.params.username)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                let array = this.state.savedTypes;
                response.map((type) => array.unshift({label: type, value: type}))
                this.setState({ savedTypes: array })
            });
    }

    createExercise(exercise) {
        let newArray = this.state.exercises.map(exercise => exercise);
        newArray.push({ name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline});

        this.setState({ numExercises: key });
        this.setState({ exercises: newArray });
    }

    deleteExercise(exercise) {
        let newArray = this.state.exercises;

        for (let i = 0; i < newArray.length; i++) {
            if (exercise == newArray[i].name) {
                newArray.splice(i, 1);
            }
        }

        this.setState({ exercises: newArray });
    }

    editExercise(exercise) {
        this.setState({ currExercise: exercise });
        this.swipeUpDownRef.showFull();
    }

    render() {
        let exerciseList = [];
        for (let i = 0; i < this.state.exercises.length; i++) {
            let exercise = this.state.exercises[i];
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
                    laps={exercise.laps}
                    edit={(field, val) => this.editExercise(exercise.name, field, val)}
                    delete={(exercise) => this.deleteExercise(exercise)}
                />
            );
        }

        return exerciseList;
    }

    createButtonList() {
        //console.log('buttonlist')
        let buttonList = [];
        for (let i = 0; i < this.state.savedExercises.length; i++) {
            let exercise = this.state.savedExercises[i];
            buttonList.push(
                <Button
                    key={i}
                    buttonText={exercise.name}
                    onPress={() => this.addExercise({ name: exercise.name, sets: exercise.data.sets, reps: exercise.data.reps, weight: exercise.data.weight, duration: exercise.data.duration, distance: exercise.data.distance, pace: exercise.data.pace, incline: exercise.data.incline, laps: exercise.data.laps })}
                    style={{width: '80%', margin: 5}}
                    orange={true}
                />
            );
        }
        buttonList.push(
            <Button
                key={this.state.savedExercises.length}
                buttonText='Create a new exercise'
                onPress={() => {
                    this.setState({ modalVisible: false, editorVisible: true });
                }}
                style={{width: '80%', margin: 5}}
                gray={true}
            />
        );
        buttonList.push(
            <Button
                key={this.state.savedExercises.length + 1}
                buttonText='Cancel'
                onPress={() => {
                    this.setState({ modalVisible: false });
                }}
                style={{width: '80%', margin: 5}}
                gray={true}
            />
        );

        return buttonList;
    }

    render() {
        //console.log('render')  
        //console.log(this.state.savedTypes)    
        let exerciseList = this.createExerciseList();

        let buttonList = this.createButtonList();

        return(
            <View style={styles.workoutEditorContainer} hasRef={(ref) => this.containerRef = ref}>
                
                {/* <Text style={{marginTop: 15, fontSize: 20}}>{this.state.workoutName}</Text> */}
                <TextBox
                    placeholder='Workout Name'
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                />
                <ScrollView style={styles.exerciseList} /*contentContainerStyle={{alignItems: 'center'}}*/>
                    {exerciseList}
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setState({ modalVisible: !this.state.modalVisible});
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {buttonList}
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.editorVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setState({ editorVisible: !this.state.editorVisible});
                        }}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.editorModal}>
                                <ExerciseEditor
                                    type={this.state.type}
                                    dismiss={() => this.setState({ editorVisible: false, modalVisible: false })}
                                    createExercise={(exercise) => {
                                        console.log('wtf is going on')
                                        let obj = {name: exercise.name, data: { sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline, laps: exercise.laps }};
                                        serverMethods.createExercise(this.props.route.params.username, this.state.type, obj);
                                        // check exercise to make sure name doesn't already exist
                                        let array = this.state.savedExercises;
                                        array.push(obj);;
                                        this.setState({ savedExercises: array });
                                        this.addExercise(exercise);
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Button
                        buttonText='Add exercise'
                        style={{width: 225}}
                        onPress={() => {
                            //add a check to make sure workout type has been set
                            if (this.state.type === '') {
                                workoutTypeError();
                            } else {
                                this.setState({ modalVisible: true });
                            }
                        }}
                        orange={true}
                    />
                </ScrollView>
                <Button
                        buttonText='Submit'
                        onPress={() => {
                            console.log(this.state.exercises);
                            //check to make sure a name is given
                            this.props.navigation.navigate('Dashboard', { workout: this.state });
                            //this.props.navigation.navigate({ routeName: 'Dashboard', params: { workout: this.state } })
                        }}
                        style={{marginTop: 10}}
                        orange={true}
                />
                <SwipeUpDown		
                    itemFull={
                        <ExerciseEditor
                            // createExercise={(exercise) => this.createExercise(exercise)}
                            // deleteExercise={(exercise) => this.deleteExercise(exercise)}
                            dismiss={() => this.swipeUpDownRef.showMini()}
                            // name={this.state.currExercise.name}
                            // sets={this.state.currExercise.sets}
                            // reps={this.state.currExercise.reps}
                            // weight={this.state.currExercise.weight}
                            // duration={this.state.currExercise.duration}
                            // distance={this.state.currExercise.distance}
                            // pace={this.state.currExercise.pace}
                            // incline={this.state.currExercise.incline}
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
import React, { Component } from 'react';
import { View, ScrollView, Modal, Text, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import TextBox from '../components/TextBox';
import Button from '../components/Button';
import ExerciseLabel from '../components/ExerciseLabel';
import ExerciseEditor from './ExerciseEditor';

import * as serverMethods from '../ServerMethods';
import styles from '../styles';
import { workoutTypeError } from '../components/Alerts';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: /*this.props.route.params?.workout.name*/ '',
            exercises: /*this.props.route.params?.workout.exercises ?? []*/ [],
            savedExercises: /*[{name: 'Bench', sets: true, reps: true}, {name: 'Squats', sets: true, reps: true}]*/ [],
            type: '',
            savedTypes: /*[{label: 'Lifting', value: 'lifting'}, {label: 'Running', value: 'running'}]*/ [],
            currKey: -1,
            currExercise: '',
            numExercises: 0,
            modalVisible: false,
            editorVisible: false,
        };

        this.createExercise = this.createExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.editExercise = this.editExercise.bind(this);
    }

    componentDidMount() {
        console.log('call')
        //server call to get workout information if the user decided to edit a workout
        // server call to get previously saved types
        serverMethods.getUserWorkoutTypes(this.props.route.params.username)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                let array = [];
                response.map((type) => array.push({label: type, value: type}))
                this.setState({ savedTypes: array })
            });
    }

    createExercise(exercise) {
        console.log('create exercise');
        console.log(exercise);
        let newArray = this.state.exercises.map(exercise => exercise);
        let key = this.state.numExercises;
        newArray.push({ key: key++, name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline });

        this.setState({ numExercises: key });
        this.setState({ exercises: newArray });
        this.setState({ modalVisible: false, editorVisible: false });
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

    editExercise(name, field, val) {
        console.log('edit');
        console.log(name)
        console.log(field);
        console.log(val);
        for (let i = 0; i < this.state.exercises.length; i++) {
            if (name === this.state.exercises[i].name) {
                //this.setState({ currKey: this.state.exercises[i].key });
                let array = this.state.exercises.slice();
                switch(field) {
                    case 'Sets':
                        array[i].sets = val;
                        break;
                    case 'Reps':
                        array[i].reps = val;
                        break;
                    case 'Weight':
                        array[i].weight = val;
                        break;
                    case 'Duration':
                        array[i].duration = val;
                        break;
                    case 'Distance':
                        array[i].distance = val;
                        break;
                    case 'Pace':
                        array[i].pace = val;
                        break;
                    case 'Incline':
                        array[i].incline = val;
                        break;
                    case 'Laps':
                        array[i].laps = val;
                        break;
                }
                //array[i] = { key: this.state.exercises[i].key, name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline };
                this.setState({ exercises: array });
            }
        }

        //this.setState({ currExercise: exercise });
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
                    laps={exercise.laps}
                    edit={(field, val) => this.editExercise(exercise.name, field, val)}
                />
            );
        }

        let buttonList = [];
        for (let i = 0; i < this.state.savedExercises.length; i++) {
            let exercise = this.state.savedExercises[i];
            for (let j = 0; j < exercise.data.length; j++) {
                switch(exercise.data[j]) {
                    case 'sets':
                        exercise.sets = true;
                        break;
                    case 'reps':
                        exercise.reps = true;
                        break;
                    case 'weight':
                        exercise.weight = true;
                        break;
                    case 'duration':
                        exercise.duration = true;
                        break;
                    case 'distance':
                        exercise.distance = true;
                        break;
                    case 'pace':
                        exercise.pace = true;
                        break;
                    case 'incline':
                        exercise.incline = true;
                        break;
                    case 'laps':
                        exercise.laps = true;
                        break;
                }
                }
            buttonList.push(
                <Button
                    key={i}
                    buttonText={exercise.name}
                    onPress={() => this.createExercise({ name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline, laps: exercise.laps })}
                    style={{width: '80%', margin: 5}}
                    orange={true}
                />
            )
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
        )

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
                <DropDownPicker
                    items={this.state.savedTypes}
                    defaultValue={this.state.type}
                    placeholder='Select a workout type'
                    containerStyle={{height: 40, width: '75%'}}
                    // style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={(item) => {
                        this.setState({ type: item.value });
                        serverMethods.getExercises(this.props.route.params.username, item.value)
                            .then(response => response.json())
                            .then(response => {
                                console.log(response)
                                this.setState({ savedExercises: response })
                            })
                    }}
                />
                <ScrollView style={styles.exerciseList} contentContainerStyle={{alignItems: 'center'}}>
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
                                    createExercise={(exercise) => this.createExercise(exercise)}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Button
                        buttonText='Add exercise'
                        style={{width: 150}}
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
                            //this.props.deleteExercise(this.state);
                            this.props.dismiss();
                        }}
                        style={{marginRight: 40}}
                        orange={true}
                    />
                    <Button
                        buttonText='Submit'
                        onPress={() => {
                            console.log(this.state.exercises);
                            //check to make sure a name is given
                            this.props.navigation.navigate('Dashboard', { workout: this.state });
                        }}
                        orange={true}
                    />
                </View>
            </View>
        );
    }
}
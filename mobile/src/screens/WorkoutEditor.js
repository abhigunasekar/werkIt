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
            savedTypes: /*[{label: 'Lifting', value: 'lifting'}, {label: 'Running', value: 'running'}]*/ [{label: 'Add workout type', value: 'add'}],
            currKey: -1,
            currExercise: '',
            numExercises: 0,
            modalVisible: false,
            editorVisible: false,
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

    addExercise(exercise) {
        //console.log('add exercise');
        //console.log(exercise);
        let newArray = this.state.exercises.map(exercise => exercise);
        let key = this.state.numExercises;
        newArray.push({ key: key++, name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline, laps: exercise.laps });

        this.setState({ numExercises: key });
        this.setState({ exercises: newArray });
        this.setState({ modalVisible: false, editorVisible: false });
        this.forceUpdate();
    }

    deleteExercise(exercise) {
        let newArray = this.state.exercises;

        for (let i = 0; i < newArray.length; i++) {
            if (exercise == newArray[i].name) {
                newArray.splice(i, 1);
            }
        }

        this.setState({ exercises: newArray });
        this.setState({ currExercise: '' });
    }

    editExercise(name, field, val) {
        // console.log('edit');
        // console.log(name)
        // console.log(field);
        // console.log(val);
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

    createExerciseList() {
        //console.log('exerciselist')
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
                        if (item.value === 'add') {
                            // show a text box, and then submit
                            // add error checking
                        } else {
                            this.setState({ type: item.value });
                            serverMethods.getExercises(this.props.route.params.username, item.value)
                                .then(response => response.json())
                                .then(response => {
                                    //console.log(response)
                                    this.setState({ savedExercises: response })
                                });
                        }
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
                            //check to make sure all fields are filled out
                            serverMethods.createWorkout(this.props.route.params.username, { name: this.state.name, type: this.state.type, exercises: this.state.exercises });
                            this.props.navigation.navigate('Dashboard');
                        }}
                        orange={true}
                    />
                </View>
            </View>
        );
    }
}
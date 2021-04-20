import React, { Component } from 'react';
import { View, ScrollView, Modal, Text, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import TextBox from '../components/TextBox';
import Button from '../components/Button';
import ExerciseButton from '../components/ExerciseButton';
import ExerciseEditor from '../components/ExerciseEditor';

import * as serverMethods from '../ServerMethods';
import light from '../light';
import dark from '../dark';
import { duplicateExerciseError, missingNameError, missingExerciseError, workoutTypeError, duplicateExerciseTypeError, duplicateWorkoutTypeError } from '../components/Alerts';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.route.params.workout === undefined ? '' : this.props.route.params.workout,
            exercises: /*this.props.route.params?.workout.exercises ?? []*/ [],
            savedExercises: /*[{name: 'Bench', sets: true, reps: true}, {name: 'Squats', sets: true, reps: true}]*/ [],
            type: '',
            savedTypes: /*[{label: 'Lifting', value: 'lifting'}, {label: 'Running', value: 'running'}]*/ [{label: 'Add workout type', value: 'add'}],
            currKey: -1,
            currExercise: '',
            numExercises: 0,
            newType: '',
            modalVisible: false,
            editorVisible: false,
            workoutTypeVisible: false,
            exerciseVisible: false,
            edit: this.props.route.params.edit,
            editWorkoutType: false,
            edited: false,
        };

        this.addExercise = this.addExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.editExercise = this.editExercise.bind(this);

    }

    componentDidMount() {
        //server call to get workout information if the user decided to edit a workout
        // server call to get previously saved types
        serverMethods.getUserWorkoutTypes(this.props.route.params.username)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                let array = this.state.savedTypes;
                response.map((type) => array.unshift({label: type, value: type}));
                this.setState({ savedTypes: array });
            });
        if (this.state.name !== '') {
            serverMethods.getWorkout(this.props.route.params.username, this.state.name)
                .then(response => response.json())
                .then(response => {
                    console.log('----------------------------------------------')
                    console.log(response);
                    console.log('----------------------------------------------')
                    response.exercises.map((exercise) => {
                        this.addExercise({ name: exercise.name, sets: exercise.data.sets, reps: exercise.data.reps, weight: exercise.data.weight, duration: exercise.data.duration, distance: exercise.data.distance, pace: exercise.data.pace, incline: exercise.data.incline, laps: exercise.data.laps });
                    });
                    this.setState({ type: response.type }, () => {
                        serverMethods.getExercises(this.props.route.params.username, response.type)
                        .then(response => response.json())
                        .then(response => {
                            //console.log(response)
                            this.setState({ savedExercises: response })
                        });
                    });//funny logic needed here
                });
        }
    }

    addExercise(exercise) {
        //console.log('add exercise');
        //console.log(exercise);
        let duplicate = false;
        let newArray = this.state.exercises;
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].name === exercise.name) {
                duplicateExerciseError();
                duplicate = true;
            }
        }
        if (!duplicate) {
            let key = this.state.numExercises;
            newArray.push({ key: key++, name: exercise.name, data: { sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline, laps: exercise.laps }});

            this.setState({ numExercises: key, exercises: newArray, modalVisible: false, editorVisible: false, exerciseVisible: false });
        }
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

    editExercise(name, field, val) {
        console.log('edit')
        //console.log(this.state.exercises)
        for (let i = 0; i < this.state.exercises.length; i++) {
            if (name === this.state.exercises[i].name) {
                let array = this.state.exercises;
                switch(field) {
                    case 'Sets':
                        array[i].data.sets = val;
                        break;
                    case 'Reps':
                        array[i].data.reps = val;
                        break;
                    case 'Weight':
                        array[i].data.weight = val;
                        break;
                    case 'Duration':
                        array[i].data.duration = val;
                        break;
                    case 'Distance':
                        array[i].data.distance = val;
                        break;
                    case 'Pace':
                        array[i].data.pace = val;
                        break;
                    case 'Incline':
                        array[i].data.incline = val;
                        break;
                    case 'Laps':
                        array[i].data.laps = val;
                        break;
                }
                this.setState({ exercises: array });
            }
        }
    }

    createExerciseList() {
        let exerciseList = [];
        for (let i = 0; i < this.state.exercises.length; i++) {
            let exercise = this.state.exercises[i];
            //console.log('exercise list')
            //console.log(exercise)
            // does this one need darkmode
            exerciseList.push(
                <ExerciseButton
                    key={i}
                    name={exercise.name}
                    sets={exercise.data.sets}
                    reps={exercise.data.reps}
                    weight={exercise.data.weight}
                    duration={exercise.data.duration}
                    distance={exercise.data.distance}
                    pace={exercise.data.pace}
                    incline={exercise.data.incline}
                    laps={exercise.data.laps}
                    edit={(field, val) => this.editExercise(exercise.name, field, val)}
                    delete={(exercise) => this.deleteExercise(exercise)}
                    darkmode={this.props.darkmode}
                    modalVisible={(exercise.data.sets || exercise.data.reps || exercise.data.weight || exercise.data.duration || exercise.data.distance || exercise.data.pace || exercise.data.incline || exercise.data.laps)}
                />
            );
        }

        return exerciseList;
    }

    createButtonList() {
        let buttonList = [];
        for (let i = 0; i < this.state.savedExercises.length; i++) {
            let exercise = this.state.savedExercises[i];
            buttonList.push(
                <Button
                    key={i}
                    buttonText={exercise.name}
                    onPress={() =>  {
                        //hahahaha
                        this.setState({ exerciseVisible: true, currExercise: exercise });
                    }}
                    style={{width: '80%', margin: 5}}
                    darkmode={this.props.darkmode}
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
                darkmode={this.props.darkmode}
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
                darkmode={this.props.darkmode}
                gray={true}
            />
        );

        return buttonList;
    }

    render() {
        //console.log('render')  
        //console.log('workout name is: ' + this.state.name)
        console.log(this.state.exercises);

        let exerciseList = this.createExerciseList();

        let buttonList = this.createButtonList();

        return(
            //add a dropdown menu populated with previously added exercises
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={this.props.darkmode ? dark.workoutEditorContainer : light.workoutEditorContainer}>
                    {/* <Text style={{marginTop: 15, fontSize: 20}}>{this.state.workoutName}</Text> */}
                    <TextBox
                        placeholder='Workout Name'
                        onChangeText={(text) => this.setState({ name: text })}
                        style={{marginTop: 20, alignItems: 'center'}}
                        darkmode={this.props.darkmode}
                        value={this.state.name}
                    />
                    <DropDownPicker
                        items={this.state.savedTypes}
                        defaultValue={this.state.type}
                        placeholder='Select a workout type'
                        containerStyle={{height: 40, width: '75%'}}
                        style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                        itemStyle={{justifyContent: 'flex-start'}}
                        labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                        dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                        arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                        onChangeItem={(item) => {
                            console.log(item.value)
                            if (item.value === 'add') {
                                // show a text box, and then submit
                                //console.log(this.state.savedTypes[this.state.savedTypes.length - 1])
                                this.setState({ workoutTypeVisible: true })
                                // add error checking
                            } else {
                                if (item.value !== null) {
                                    serverMethods.getExercises(this.props.route.params.username, item.value)
                                        .then(response => response.json())
                                        .then(response => {
                                            this.setState({ savedExercises: response, type: item.value, newType: item.value, workoutTypeVisible: true, editWorkoutType: true })
                                        });
                                }
                            }
                        }}
                    />
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.workoutTypeVisible}
                    >
                        <View>
                            <View style={this.props.darkmode ? dark.workoutType : light.workoutType}>
                                <TextBox
                                    placeholder='Workout type'
                                    onChangeText={(text) => this.setState({ newType: text, edited: true })}
                                    darkmode={this.props.darkmode}
                                    value={this.state.newType}
                                    defaultValue={this.state.newType}
                                />
                                <View style={{flexDirection: 'row'}}>
                                    <Button
                                        buttonText='Cancel'
                                        onPress={() => this.setState({ newType: '', type: 'add', workoutTypeVisible: false, editWorkoutType: false, edited: false })}
                                        style={{marginRight: this.state.editWorkoutType ? 15 : 30}}
                                        darkmode={this.props.darkmode}
                                        gray={true}
                                    />
                                    <Button
                                        buttonText='Delete'
                                        onPress={() => {
                                            let array = this.state.savedTypes;
                                            for (let i = 0; i < array.length; i++) {
                                                if (array[i].value === this.state.newType) {
                                                    array.splice(i, 1);
                                                }
                                            }
                                            serverMethods.deleteWorkoutType(this.props.route.params.username, this.state.newType)
                                            .then(response => {
                                                console.log(response.status)
                                                //check to make sure things were deleted?
                                            });
                                            this.setState({ savedTypes: array, newType: '', type: 'add', workoutTypeVisible: false, editWorkoutType: false, edited: false })
                                        }}
                                        style={{marginRight: 15}}
                                        darkmode={this.props.darkmode}
                                        gray={this.state.editWorkoutType}
                                    />
                                    <Button
                                        buttonText={(!this.state.editWorkoutType || this.state.edited) ? 'Save' : 'Select'}
                                        onPress={() => {
                                            if (this.state.newType === '') {
                                                missingNameError();
                                            } else {
                                                if (this.state.editWorkoutType) {
                                                    let array = this.state.savedTypes;
                                                    if (this.state.edited) {
                                                        serverMethods.editWorkoutType(this.props.route.params.username, this.state.type, { name: this.state.newType, exercises: this.state.savedExercises });                                                        for (let i = 0; i < array.length; i++) {
                                                            if (array[i].value === this.state.type) {
                                                                array[i] = { label: this.state.newType, value: this.state.newType };
                                                            }
                                                        }
                                                    }

                                                    this.setState({ savedTypes: array, type: this.state.newType, newType: '', workoutTypeVisible: false, editWorkoutType: false, edited: false });
                                                } else {
                                                    serverMethods.createWorkoutType(this.props.route.params.username, { name: this.state.newType, exercises: [] })
                                                        .then(response => {
                                                            if (response.status === 200) {
                                                                let array = this.state.savedTypes;
                                                                array.unshift({ label: this.state.newType, value: this.state.newType });
                                                                this.setState({ savedTypes: array, type: this.state.newType, newType: '', workoutTypeVisible: false, editWorkoutType: false, edited: false, savedExercises: [] });
                                                            } else {
                                                                duplicateWorkoutTypeError();
                                                            }
                                                        });
                                                }
                                                // check workout type to make sure name doesn't already exist
                                            }
                                        }}
                                        darkmode={this.props.darkmode}
                                        orange={true}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <ScrollView style={this.props.darkmode ? dark.exerciseList : light.exerciseList} contentContainerStyle={{alignItems: 'center'}}>
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
                            <View style={this.props.darkmode ? dark.centeredView : light.centeredView}>
                                <View style={this.props.darkmode ? dark.modalView : light.modalView}>
                                    {this.state.exerciseVisible ?
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={[this.props.darkmode ? dark.text : light.text, {marginBottom: 20, fontSize: 20}]}>{this.state.currExercise.name}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Button
                                                    buttonText='Cancel'
                                                    onPress={() => this.setState({ exerciseVisible: false })}
                                                    style={{marginRight: 15}}
                                                    darkmode={this.props.darkmode}
                                                    gray={true}
                                                />
                                                <Button
                                                    buttonText='Delete'
                                                    onPress={() => {
                                                        let array = this.state.savedExercises;
                                                        for (let i = 0; i < array.length; i++) {
                                                            if (array[i].name === this.state.currExercise.name) {
                                                                array.splice(i, 1);
                                                            }
                                                        }
                                                        serverMethods.deleteExercise(this.props.route.params.username, this.state.type, this.state.currExercise.name)
                                                        this.setState({ savedExercises: array, exerciseVisible: false })
                                                    }}
                                                    style={{marginRight: 15}}
                                                    darkmode={this.props.darkmode}
                                                    gray={true}
                                                />
                                                <Button
                                                    buttonText='Select'
                                                    onPress={() => this.addExercise({ name: this.state.currExercise.name, sets: this.state.currExercise.data.sets, reps: this.state.currExercise.data.reps, weight: this.state.currExercise.data.weight, duration: this.state.currExercise.data.duration, distance: this.state.currExercise.data.distance, pace: this.state.currExercise.data.pace, incline: this.state.currExercise.data.incline, laps: this.state.currExercise.data.laps })}
                                                    darkmode={this.props.darkmode}
                                                    orange={true}
                                                />
                                            </View>
                                        </View> : buttonList
                                    }
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
                            <View style={this.props.darkmode ? dark.centeredView : light.centeredView}>
                                <View style={this.props.darkmode ? dark.modalView : light.modalView}>
                                    <ExerciseEditor
                                        type={this.state.type}
                                        dismiss={() => this.setState({ editorVisible: false, modalVisible: false })}
                                        createExercise={(exercise) => {
                                            //console.log('wtf is going on')
                                            let obj = {name: exercise.name, data: { sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline, laps: exercise.laps }};
                                            serverMethods.createExercise(this.props.route.params.username, this.state.type, obj)
                                                .then(response => {
                                                    if (response.status === 200) {
                                                        let array = this.state.savedExercises;
                                                        array.push(obj);;
                                                        this.setState({ savedExercises: array });
                                                        this.addExercise(exercise);
                                                    } else {
                                                        duplicateExerciseTypeError();
                                                    }
                                                });
                                        }}
                                        darkmode={this.props.darkmode}
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
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                    </ScrollView>
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <Button
                            buttonText='Cancel'
                            onPress={() => this.props.navigation.navigate('Workouts')}
                            style={{marginRight: 40}}
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                        <Button
                            buttonText='Delete'
                            onPress={() => {
                                //this.props.deleteExercise(this.state);
                                //console.log('time to delete');
                                serverMethods.deleteWorkout(this.props.route.params.username, this.state.name);
                                this.props.navigation.navigate('Workouts');
                            }}
                            style={{marginRight: 40}}
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                        <Button
                            buttonText='Submit'
                            onPress={() => {
                                if (this.state.name === '') {
                                    missingNameError();
                                } else if (this.state.exercises.length === 0) {
                                    missingExerciseError();
                                } else {
                                    if (this.state.edit) {
                                        console.log('edit')
                                        serverMethods.editWorkout(this.props.route.params.username, { name: this.state.name, type: this.state.type, exercises: this.state.exercises });
                                    } else {
                                        console.log('create')
                                        console.log({ name: this.state.name, type: this.state.type, exercises: this.state.exercises })
                                        serverMethods.createWorkout(this.props.route.params.username, { name: this.state.name, type: this.state.type, exercises: this.state.exercises });
                                    }
                                    this.props.navigation.navigate('Workouts');
                                }
                            }}
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
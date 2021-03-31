class Workout {

    constructor(name, type, exercises) {
        this.name = name;
        this.type = type;
        if (exercises != null) {
            this.exercises = exercises;
        } else {
            this.exercises = new Array();
        }
        // this.exercises = new Array();
        // if (exercises != null) {
        //     exercises.forEach(exercise => {
        //         this.exercises.push(exercise);
        //     });
        // }
    }

    add_exercise(exercise) {
        this.exercises.push(exercise);
    }

}

class Exercises {

    constructor(name) {
        this.name = name;
    }

}

class WorkoutType {

    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

}
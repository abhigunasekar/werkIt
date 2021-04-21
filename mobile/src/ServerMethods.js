const address = '10.0.0.86';

export async function createAccount(info) {
    console.log('create account');
    return await fetch('http://' + address + ':8000/create_account', {
        method: 'POST',
        body: JSON.stringify({
            f_name: info.firstName,
            l_name: info.lastName,
            email: info.email,
            username: info.username,
            password: info.password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function login(info) {
    console.log('login');
    return await fetch('http://' + address + ':8000/login', {
        method: 'POST',
        body: JSON.stringify({
            username: info.username,
            password: info.password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function changePassword(info) {
    console.log('change password');
    return await fetch('http://' + address + ':8000/user/' + info.username + '/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          username: info.username,
          password: info.newPassword,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function verifyUsername(username) {
    console.log('verify username: ' + username);
    return await fetch('http://' + address + ':8000/user/' + username);
}

export function getUserData(username) {
    console.log('getting data for: ' + username);
    //return await fetch('http://' + address + ':8000/profile/' + username);
    return fetch('http://' + address + ':8000/profile/' + username, {
         method: 'GET'
      })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //      console.log(responseJson);
    //   })
    //   .catch((error) => {
    //      console.error(error);
    //   });
}

export function getUserWorkoutPlans(username) {
    console.log('getting workout plan for: ' + username);

    return fetch('http://' + address + ':8000/' + username + '/workout_plans');
}

export function getUserWorkouts(username) {
    console.log('getting workouts for: ' + username);

    return fetch('http://' + address + ':8000/' + username + '/workouts');
}

export function getUserWorkoutTypes(username) {
    console.log('getting workout types for: ' + username);

    return fetch('http://' + address + ':8000/' + username + '/workoutTypes');
}

export function getExercises(username, type) {
    console.log('getting exercises for workout type: ' + type);

    return fetch('http://' + address + ':8000/' + username + '/' + type + '/exercises');
}

export function createExercise(username, type, exercise) {
    console.log('creating a new exercise for type: ' + type);
    return fetch('http://' + address + ':8000/' + username + '/' + type + '/exercise', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercise)
    });
}

export function createWorkout(username, workout) {
    console.log('creating a new workout for: ' + username);
    return fetch('http://' + address + ':8000/' + username + '/workout', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
    });
}

export function createWorkoutType(username, workoutType) {
    console.log('creating a new workout type for: ' + username);
    return fetch('http://' + address + ':8000/' + username + '/workoutType', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutType)
    });
}

export function createWorkoutPlan(username, workoutPlan) {
    console.log('creating a new workout plane for: ' + username);
    return fetch('http://' + address + ':8000/' + username + '/workout_plan', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutPlan)
    });
}

export function getActiveWorkoutPlan(username) {
    console.log('getting active workout plan for: ' + username);
    return fetch('http://' + address + ':8000/' + username + '/active_plan');
}

export function updateActiveWorkoutPlan(username, workoutPlan) {
    console.log('changing active status of workout: ' + workoutPlan);
    return fetch('http://' + address + ':8000/' + username + '/workout_plan/' + workoutPlan, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function getUserField(username, field) {
    console.log('getting field: ' + field);
    return fetch('http://' + address + ':8000/' + username + '/profile/' + field);
}

export function updateDarkmode(username) {
    console.log('switching darkmode preferences for: ' + username);
    return fetch('http://' + address + ':8000/user/' + username + '/darkmode', {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function getWorkout(username, workout) {
    console.log('getting workout with name: ' + workout);
    return fetch('http://' + address + ':8000/' + username + '/workout/' + workout);
}

export function getWorkoutPlan(username, workoutPlan) {
    console.log('getting workout plan with name: ' + workoutPlan);
    return fetch('http://' + address + ':8000/' + username + '/workout_plan/' + workoutPlan);
}

export function deleteWorkout(username, workout) {
    console.log('deleting workout: ' + workout);
    return fetch('http://' + address + ':8000/' + username + '/' + workout + '/rm_wkout', {
        method: 'DELETE',
    });
}

export function deleteWorkoutPlan(username, workoutPlan) {
    return fetch('http://' + address + ':8000/' + username + '/' + workoutPlan + '/rm_plan', {
        method: 'DELETE',
    })
}

export function deleteWorkoutType(username, workoutType) {
    console.log('deleting workout type: ' + workoutType)
    return fetch('http://' + address + ':8000/' + username + '/' + workoutType + '/rm_type', {
        method: 'DELETE',
    })
}

export function deleteExercise(username, workoutType, exercise) {
    return fetch('http://' + address + ':8000/' + username + '/' + workoutType + '/' + exercise + '/rm_ex', {
        method: 'DELETE',
    })
}

export function editWorkout(username, oldName, workout) {
    console.log('editing workout: ' + workout.name);
    return fetch('http://' + address + ':8000/' + username + '/' + oldName + '/edit_workout', {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)  
    })
}

export function editWorkoutPlan(username, oldName, workoutPlan) {
    console.log('editing workout plan: ' + oldName)
    return fetch('http://' + address + ':8000/' + username + '/' + oldName + '/edit_plan', {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workoutPlan)
    })
}

// this one is sus
export function editWorkoutType(username, workoutType, newName) {
    return fetch('http://' + address + ':8000/' + username + '/' + workoutType + '/edit_workoutType', {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newName)
    });
}

export function completeWorkout(username, workout) {
    console.log('saving completed workout: ' + workout.workout_name)
    return fetch('http://' + address + ':8000/' + username + '/completed', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
    })
}

export function getFriends(username) {
    return fetch('http://' + address + ':8000/' + username + '/friends', {
        method: 'GET'
    })
}

export function addFriend(username, newFriend) {
    console.log("adding friend");
    return fetch('http://' + address + ':8000/' + username + '/add_friend', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newFriend)
    });
}

export function sendRequest(username, request) {
    console.log("send request in server methods called")
    return fetch('http://' + address + ':8000/' + username + '/request', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(request)
    });
}
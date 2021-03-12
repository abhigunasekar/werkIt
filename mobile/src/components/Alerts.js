import { Alert } from 'react-native';

export const mismatchPasswordAlert = () => {
    Alert.alert(
        '',
        'Passwords do not match',
        [
            {
                text: 'OK',
            }
        ]
    )
}

export const invalidCredentialsAlert = () => {
    Alert.alert(
        '',
        'Invalid login credentials',
        [
            {
                text: 'OK'
            }
        ]
    )
}

export const invalidEmailAlert = () => {
    Alert.alert(
        '',
        'Please enter a valid email address',
        [
            {
                text: 'OK'
            }
        ]
    )
}

export const invalidFormAlert = () => {
    Alert.alert(
        '',
        'Please make sure every field is filled out correctly',
        [
            {
                text: 'OK'
            }
        ]
    )
}

export const usernameAlreadyExists = () => {
    Alert.alert(
        '',
        'The selected username already exists',
        [
            {
                text: 'OK'
            }
        ]
    )
}

export const usernameDoesNotExist = () => {
    Alert.alert(
        '',
        'The specified username does not exist',
        [
            {
                text: 'OK'
            }
        ]
    )
}
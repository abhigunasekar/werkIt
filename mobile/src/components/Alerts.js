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
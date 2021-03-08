import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    button: {
        alignItems: 'center',
        borderColor: '#7641BD',
        borderWidth: 3,
        borderRadius: 3,
        height: 35,
        justifyContent: 'center',
        width: 70
    },
    loginContainer: {
        backgroundColor: '#7641BD',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginForm: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: '80%',
        width: '70%',
        justifyContent: 'center',
    },
    textBox: {
        borderColor: '#000000',
        borderWidth: 2,
        marginBottom: 15,
        padding: 10,
        height: 40,
        width: '75%',
    },
    textBoxErr: {
        borderColor: '#ff0000',
        borderWidth: 2,
        color: '#ff0000',
        marginBottom: 15,
        padding: 10,
        height: 40,
        width: '75%',
    }
})
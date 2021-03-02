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
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginForm: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: '50%',
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 20,
        color: '#7641BD',
        fontWeight: 'bold',
        marginBottom: 45,
    },
    textBox: {
        borderColor: '#000000',
        borderWidth: 2,
        marginBottom: 15,
        padding: 10,
        height: 40,
        width: '75%',
    }
})
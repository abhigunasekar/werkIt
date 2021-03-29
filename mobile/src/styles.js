import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    loginContainer: {
        backgroundColor: '#7641BD',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginForm: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        height: '60%',
        width: '75%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 35,
        color: '#7641BD',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    createAccountContainer: {
        backgroundColor: '#FB963C',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountForm: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: '80%',
        width: '75%',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 7
    },
    createAccountText: {
        fontSize: 30,
        color: '#FB963C',
        fontWeight: 'bold',
        marginBottom: 40,
    },
    changePasswordContainer: {
        backgroundColor: '#535c68',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    changePasswordForm: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        height: '45%',
        width: '75%',
        borderRadius: 7,
    },
    changePasswordText: {
        fontSize: 25,
        color: '#535c68',
        fontWeight: 'bold',
        marginBottom: 35,
    },
    dashboardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    motivationalQuote: {
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        margin: 20
    },
    workoutList: {
        height: '75%',
        width: '80%',
        marginTop: 20,
        //  borderColor: '#6B6767',
        //  borderWidth: 3,
        marginBottom: 20,
    },
    workoutEditorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    exerciseList: {
        height: '70%',
        width: '80%',
        borderColor: '#6B6767',
        borderTopWidth: 3,
        marginTop: 7,
        padding: 15
    },
    button: {
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        height: 35,
        justifyContent: 'center',
        padding: 7
    },
    textBox: {
        borderColor: '#6B6767',
        borderWidth: 2,
        borderRadius: 3,
        marginBottom: 15,
        padding: 10,
        height: 40,
        width: '75%',
    },
    errorBox: {
        borderColor: '#f70015',
        borderWidth: 2,
        borderRadius: 3,
        marginBottom: 15,
        padding: 10,
        height: 40,
        width: '75%',
    },
    hideableView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    metadataList: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
    },
    modalView: {
        margin: '10%',
        marginTop: '35%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    editorModal: {
        margin: '10%',
        marginTop: '30%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    motivationalQuote: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 300
    },
})
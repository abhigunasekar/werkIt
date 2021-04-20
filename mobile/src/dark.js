import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    drawer: {
        backgroundColor: '#3E3E3E'
    },
    drawerItem: {
        color: '#FFFFFF',
    },
    headerStyle: {
        //backgroundColor: '#3E3E3E'
        backgroundColor: '#472278'
    },
    headerTitleStyle: {
        //color: '#7641BD'
        color: '#FFFFFF'
    },
    dashboardContainer: {
        alignItems: 'center',
        backgroundColor: '#3E3E3E',
        height: '100%',
    },
    workoutTrackerContainer: {
        alignItems: 'center',
        backgroundColor: '#3E3E3E',
        height: '100%'
    },
    workoutPlanEditorContainer: {
        backgroundColor: '#3E3E3E',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
        height: '100%',
    },
    workoutsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3E3E3E',
        height: '100%'
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
        marginTop: 40,
        //  borderColor: '#6B6767',
        //  borderWidth: 3,
        marginBottom: 20,
    },
    workoutEditorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3E3E3E',
        height: '100%'
    },
    exerciseList: {
        height: '70%',
        width: '80%',
        borderColor: '#6B6767',
        borderTopWidth: 3,
        marginTop: 10,
        padding: 15
    },
    button: {
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        height: 35,
        justifyContent: 'center',
        padding: 7,
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
        backgroundColor: "#3E3E3E",
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
        backgroundColor: "#3E3E3E",
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
    metadataModal: {
        margin: '10%',
        marginTop: '35%',
        backgroundColor: "#3E3E3E",
        borderRadius: 20,
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5  
    },
    workoutType: {
        margin: '10%',
        marginTop: '70%',
        backgroundColor: "#3E3E3E",
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
    friendsContainer: {
        backgroundColor: '#3E3E3E',
        alignItems: 'center',
        height: '100%'
    },
    friendsHeader: {
        backgroundColor: '#7641BD',
        paddingTop: 30,
        borderBottomWidth: 2,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 15,
        marginBottom: 30,
        flexDirection: 'row'
    },
    motivationalQuote: {
        backgroundColor: '#3E3E3E',
        alignItems: 'center',
        paddingTop: 300
    },
    text: {
        color: '#FFFFFF'
    },
    darkTextBase: {
        color: 'white',
        fontFamily: "Avenir-HeavyOblique",
        fontSize: 20
    },
    darkTextHeader: {
        color: 'white',
        fontFamily: "Avenir-Heavy",
        fontSize: 20
    },
})
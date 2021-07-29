import * as React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

function HomeComponent({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Connection Status: ON</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('camera')}>
                <Text style={styles.button__Text}>Open Camera</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },

    button:{
        borderWidth:1,
        padding:10,
        backgroundColor:'#14274e',
        borderRadius:3,
        margin:5
    },
    button__Text:{
        color:'#ffffff',
        fontWeight:'700'
    }
})
export default HomeComponent;

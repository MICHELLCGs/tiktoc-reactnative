import { StyleSheet, Dimensions } from 'react-native';

const { height: viewportHeight } = Dimensions.get('window');
export default StyleSheet.create({
    container:{
        backgroundColor:'red',
        flex:1,

    },
    container_hijo:{
        backgroundColor:'orange'
    }
});
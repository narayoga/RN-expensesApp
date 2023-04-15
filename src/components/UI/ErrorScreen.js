import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

export default function ErrorScreen({message, confirmHandler}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.text]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={confirmHandler}>ok</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
})
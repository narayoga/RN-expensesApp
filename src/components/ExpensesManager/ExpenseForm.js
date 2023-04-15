import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '../../constants/styles'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'

export default function ExpenseForm({ labelSubmit, onSubmit, defaultValue }) {
    const navigate = useNavigation()
    const [valueInput, setValueInput] = useState({
        amount: defaultValue ? defaultValue.amount.toString() : '',
        date: defaultValue ? getFormattedDate(defaultValue.date) : '',
        description: defaultValue ? defaultValue.description : '',
    })
    const [isInvalid, setIsInvalid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function inputHandler(identifier, enteredValue) {
        setValueInput((currentValues) => {
            return {
                ...currentValues,
                [identifier]: enteredValue, //dynamic property key 
            }
        })
    }
    function cancelHandler() {
        navigate.goBack()
    }
    async function submitHandler() {
        const expenseData = {
            amount: +valueInput.amount, //"+"convert string to number
            date: new Date(valueInput.date),
            description: valueInput.description
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0 //mencegah isinya spasi doang

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setIsInvalid(true)
            return
        }

        setIsLoading(true) //set state loading menjadi true

        try {
            console.log('masuk try')
            await onSubmit(expenseData)
            setIsLoading(false) //set state loading menjadi false setelah asynchronus state selesai
        } catch (error) {
            console.log('masuk error')
            setIsLoading(false) //set state loading menjadi false pada kasus error
            console.error(error)
        }
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input
                    style={styles.flexInput}
                    label={"Amount"}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputHandler.bind(this, 'amount'),
                        value: valueInput.amount
                    }}
                />
                <Input
                    style={styles.flexInput}
                    label={"Date"}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputHandler.bind(this, 'date'),
                        value: valueInput.date
                    }}
                />
            </View>
            <Input
                label={"Description"}
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                    autoCapitalize: "sentences",
                    onChangeText: inputHandler.bind(this, 'description'),
                    value: valueInput.description
                }}
            />
            {isInvalid && (
                <Text style={styles.error}>Your input is invalid</Text>
            )}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={cancelHandler}>
                    Cancel
                </Button>
                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={submitHandler}
                    loading={isLoading} //menambahkan kondisi isLoading pada tombol
                    disabled={isLoading} //menonaktifkan tombol saat isLoading=true
                >
                    {isLoading ? 'Loading...' : labelSubmit} {/*tombol menampilkan 'Loading...' saat isLoading=true*/}
                </Button>
            </View>
        </View>
    )
}

export function Input({ label, textInputConfig, style }) {
    const inputStyle = [styles.input]

    if (textInputConfig.multiline) {
        inputStyle.push(styles.inputMultiline)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyle} {...textInputConfig}></TextInput>
        </View>
    )
}


const styles = StyleSheet.create({
    // input 
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    // form 
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    flexInput: {
        flex: 1
    },
    // button 
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    //error
    error: {
        color: 'red',
    }
});
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    label="Email Address"
                    onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                    value={enteredEmail}
                    keyboardType="email-address"
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Email Address"
                        onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
                        value={enteredConfirmEmail}
                        keyboardType="email-address"
                        isInvalid={emailsDontMatch}
                    />
                )}
                <Input
                    label="Password"
                    onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Password"
                        onUpdateValue={updateInputValueHandler.bind(
                            this,
                            'confirmPassword'
                        )}
                        secure
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default AuthForm;

function Button({ children, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    );
}

function Input({
    label,
    keyboardType,
    secure,
    onUpdateValue,
    value,
    isInvalid,
}) {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
                {label}
            </Text>
            <TextInput
                style={[styles.input, isInvalid && styles.inputInvalid]}
                autoCapitalize={"none"}
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onUpdateValue}
                value={value}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
    button: {
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: GlobalStyles.colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputContainer: {
        marginVertical: 8,
      },
      label: {
        color: 'white',
        marginBottom: 4,
      },
      labelInvalid: {
        color: GlobalStyles.colors.error500,
      },
      input: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
        fontSize: 16,
      },
      inputInvalid: {
        backgroundColor: GlobalStyles.colors.error50,
      },
});
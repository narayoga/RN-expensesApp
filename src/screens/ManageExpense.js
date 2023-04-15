import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpenseContext } from '../store/expenseContext';
import ExpenseForm from '../components/ExpensesManager/ExpenseForm';
import { postExpense, delExpense, putExpense } from '../util/http';
import ErrorScreen from '../components/UI/ErrorScreen';

function ManageExpense({ route, navigation }) {
  const [error, setError] = useState(null);

  const { expenses, addExpense, updateExpense, deleteExpense } = useContext(ExpenseContext)

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(expense => editedExpenseId === expense.id)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      await delExpense(editedExpenseId)
      deleteExpense(editedExpenseId)
      navigation.goBack();
    } catch (error) {
      setError('500 internal server error')
    }

  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData)
        await putExpense(editedExpenseId, expenseData)
      } else {
        const id = await postExpense(expenseData)
        addExpense({ ...expenseData, id: id })
      }
      navigation.goBack()
    } catch (error) {
      setError('500 internal server error')
    }
  }

  function goBackHandler() {
    setError(null)
  }

  if (error) {
    return <ErrorScreen message={error} confirmHandler={goBackHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm defaultValue={selectedExpense} labelSubmit={isEditing ? 'Update' : 'Add'} onSubmit={confirmHandler} />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

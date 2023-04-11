import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpenseContext } from '../store/expenseContext';
import ExpenseForm from '../components/ExpensesManager/ExpenseForm';

function ManageExpense({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useContext(ExpenseContext)

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(expense => editedExpenseId === expense.id )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId)
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData)
    } else {
      addExpense(expenseData)
    }
    navigation.goBack()
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

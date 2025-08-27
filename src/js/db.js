import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { Timestamp, getDoc, deleteDoc } from "firebase/firestore"
import { db } from '@/firebase'
import { generateBasicId } from '@/js/utilities.js'

export const dbSetSpendingLimit = async (spendingLimit) => {
  try {
    // Reference to the document with a custom name
    const docRef = doc(db, "Settings", "Settings")

    // Set data in the document
    await setDoc(docRef, spendingLimit)
    console.log('Spending Limit Setting successfully created in database')
  } catch (err) {
    console.log(err)
  }
}

export const dbGetSpendingLimit = async (spendingLimit) => {
  try {
    // reference to the document Settings/Settings
    const settingsRef = doc(db, 'Settings', 'Settings')

    // fetch the document
    const settingsSnap = await getDoc(settingsRef)

    if (settingsSnap.exists()) {
      // return only the field value
      return settingsSnap.data().spendingLimit
    } else {
      console.warn('No such document!')
      return null
    }
  } catch (error) {
    console.error('Error getting spendingLimit:', error)
    throw error
  }
}


export const dbAddExpense = async (expense) => {
  try {

    const newExpenseData = {
      ... expense,
      id: generateBasicId(8)
    }

    console.log(newExpenseData)

    // Reference to the document with a custom name
    const docRef = doc(db, "Expenses", newExpenseData.id)

    // Set data in the document
    await setDoc(docRef, newExpenseData)
    
    console.log('Expense successfully created in database')

  } catch (err) {
    console.log(err)
  }
}

export const dbGetExpensesByMonthYear = async (month, year) => {
  try {
    const expensesRef = collection(db, 'Expenses')
    const q = query(
      expensesRef,
      where('searchMonth', '==', month),
      where('searchYear', '==', year)
    )

    const querySnapshot = await getDocs(q)
    const expenses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return expenses
  } catch (error) {
    console.error('Error fetching expenses:', error)
    return []
  }
}

export const dbDeleteExpense = async (docId) => {
  try {
    const expenseRef = doc(db, 'Expenses', docId)
    await deleteDoc(expenseRef)
    console.log(`Expense ${docId} deleted successfully`)
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
}


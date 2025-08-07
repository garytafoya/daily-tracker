import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { Timestamp } from "firebase/firestore"
import { db } from '@/firebase'
import { generateBasicId } from '@/js/utilities.js'


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

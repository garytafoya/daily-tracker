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

export const dbGetExpensesByMonthAndYear = async (dateString) => {
  if (!dateString) throw new Error('Date string is required in YYYY-MM-DD format')

  const date = new Date(dateString)
  if (isNaN(date)) throw new Error('Invalid date format')

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() returns 0-11

  const startOfMonth = new Date(year, month - 1, 1).toISOString().split('T')[0]
  const endOfMonth = new Date(year, month, 0).toISOString().split('T')[0] // last day of the month

  const expensesRef = collection(db, 'Expenses')
  const q = query(
    expensesRef,
    where('date', '>=', startOfMonth),
    where('date', '<=', endOfMonth)
  )

  const querySnapshot = await getDocs(q)
  const expenses = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return expenses
}


export const dbGetExpensesByMonthAndYearOld = async (monthName, year) => {

  if (!monthName || !year) throw new Error('Both month name and year are required')

  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth()
  if (isNaN(monthIndex)) throw new Error('Invalid month name')

  const monthNumber = monthIndex + 1 // convert 0-based to 1-based
  const yearShort = year % 100

  const dateKey = `${monthNumber}/${yearShort}`
  
  const expensesRef = collection(db, 'Expenses')
  const q = query(expensesRef, where('date', '==', dateKey))

  const querySnapshot = await getDocs(q)
  const expenses = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return expenses
}


export const dbGetExpensesByMonthAndYearOLD = async (monthName, year) => {

  if (!monthName || !year) throw new Error('Both month name and year are required')

  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth()
  if (isNaN(monthIndex)) throw new Error('Invalid month name')

  const monthNumber = monthIndex + 1 // months are 0-based, format is 1-based
  const yearShort = year % 100 // convert to 2-digit year

  const dateKey = `${monthNumber}/${yearShort}`

  const expensesRef = collection(db, 'Expenses')
  const q = query(
    expensesRef,
    where('date', '==', dateKey)
  )

  const querySnapshot = await getDocs(q)
  const expenses = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return expenses
}

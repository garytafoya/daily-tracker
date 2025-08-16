export function getCurrentMonthAbbr() {
  const date = new Date()
  return date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
}

export function getCurrentFullMonth() {
  const date = new Date()
  return date.toLocaleString('default', { month: 'long' })
}

export const getDaysInMonth = (month, year) => {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth()
  if (isNaN(monthIndex)) throw new Error('Invalid month name')

  return new Date(year, monthIndex + 1, 0).getDate()
}

export const getDaysLeftInMonth = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth() // 0-based
  const today = date.getDate()

  const totalDays = new Date(year, month + 1, 0).getDate()
  return totalDays - today
}

export function calculateTotalMonthlySpend(expenses) {
  return expenses.reduce((total, expense) => {
    const num = parseFloat(expense.amount)
    return total + (isNaN(num) ? 0 : num)
  }, 0)
}

export const calculateAverageExpenseAmount = (expenses) => {
  const validNumbers = expenses
    .map(amount => parseFloat(amount.value))
    .filter(num => !isNaN(num))

  if (validNumbers.length === 0) return 0

  const total = validNumbers.reduce((sum, num) => sum + num, 0)
  return total / validNumbers.length
}

export const averageByDate = (items = []) => {
  if (!Array.isArray(items)) {
    throw new Error('Expected an array of objects')
  }

  const grouped = {}

  items.forEach(({ date, value }) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      if (!grouped[date]) {
        grouped[date] = { total: 0, count: 0 }
      }
      grouped[date].total += num
      grouped[date].count += 1
    }
  })

  return Object.entries(grouped).map(([date, { total, count }]) => ({
    date,
    average: total / count
  }))
}







export function generateBasicId(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
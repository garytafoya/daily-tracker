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

// DATA FUNCTIONS FOR CARDS
export function getDaysInMonth(monthAbbr, year) {
  const months = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11
  }

  const monthIndex = months[monthAbbr.toUpperCase()]
  if (monthIndex === undefined) {
    throw new Error('Invalid month abbreviation')
  }

  return new Date(year, monthIndex + 1, 0).getDate()
}

export function daysLeftInMonth(month, year) {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth()
  const totalDays = new Date(year, monthIndex + 1, 0).getDate()
  const today = new Date()
  
  if (today.getFullYear().toString() === year && today.getMonth() === monthIndex) {
    return ((totalDays - today.getDate())+1)
  }
  return "--" // If not the current month
}

export function totalSpentInMonth(expenses) {
  return expenses.reduce((total, expense) => {
    const num = parseFloat(expense.amount)
    return total + (isNaN(num) ? 0 : num)
  }, 0)
}

export const dailySpendingAverage = (items = []) => {
  if (!Array.isArray(items)) {
    throw new Error('Expected an array of objects')
  }
  
  const grouped = {}
  items.forEach(({ date, amount }) => {
    const num = parseFloat(amount)
    if (!isNaN(num)) {
      if (!grouped[date]) {
        grouped[date] = { total: 0, count: 0 }
      }
      grouped[date].total += num
      grouped[date].count += 1
    }
  })
  
  const totals = Object.entries(grouped).map(([date, { total, count }]) => ({
    date,
    total: total
  }))
  
  if (!totals.length) return 0
  const sum = totals.reduce((total, item) => total + item.total, 0)
  return (sum / totals.length).toFixed(0)
}

export function calculateDailySpendingLimit(month, year, daysLeft, remainingBudget) {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth()
  const today = new Date()

  if (today.getMonth() == monthIndex.toFixed(0)) {
    return ( remainingBudget / daysLeft )
  }

  return " --" // If not the current month 
}

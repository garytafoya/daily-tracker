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

export function averageDailyExpenseToDate(expenses, monthAbbrev, year) {
  // map 3-letter month to number (1-based)
  const monthMap = {
    JAN: 1, FEB: 2, MAR: 3, APR: 4,
    MAY: 5, JUN: 6, JUL: 7, AUG: 8,
    SEP: 9, OCT: 10, NOV: 11, DEC: 12
  }

  const month = monthMap[monthAbbrev.toUpperCase()]
  if (!month) {
    throw new Error(`Invalid month abbreviation: ${monthAbbrev}`)
  }

  const today = new Date()
  const isThisMonth = today.getFullYear() == year && (today.getMonth() + 1) === month
  const daysInMonth = new Date(year, month, 0).getDate()

  // if it's the current month, only count up to today
  const daysToCount = isThisMonth ? today.getDate() : daysInMonth
  const totalsByDay = Array(daysToCount).fill(0)

  expenses.forEach(({ date, amount }) => {
    const [y, m, d] = date.split('-').map(Number)

    if (y == year && m === month) {
      totalsByDay[d - 1] += Number(amount) || 0
    }
  })
  const grandTotal = totalsByDay.reduce((sum, daily) => sum + daily, 0)
  
  return (grandTotal / daysToCount).toFixed(0)
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

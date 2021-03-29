const goalsHolder = document.getElementById('goalsHolder')
const addGoal = document.getElementById('addGoal')

const currentDate = new Date().toLocaleDateString()

function getListForToday() {
  if (window.localStorage.getItem(currentDate)) return JSON.parse(window.localStorage.getItem(currentDate))
  const list = JSON.parse(window.localStorage.getItem('goals') || '[]')
  const newDailyList = list.map(text => { return { text, complete: false } })
  window.localStorage.setItem(currentDate, JSON.stringify(newDailyList))
  return newDailyList
}

function generateList() {
  goalsHolder.innerHTML = ''
  const dailyList = getListForToday()
  dailyList.forEach((item, index) => {
    const goal = document.createElement('tr')
    const goalText = document.createElement('td')
    goalText.textContent = item.text

    const goalCheck = document.createElement('td')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = item.complete

    checkbox.addEventListener('change', e => {
      dailyList[index].complete = e.target.checked
      window.localStorage.setItem(currentDate, JSON.stringify(dailyList))
      generateList()
    })

    goalCheck.append(checkbox)
    goal.append(goalText, goalCheck)
    goalsHolder.append(goal)
  })
}

addGoal.addEventListener('click', () => {
  const text = prompt('What is your new daily goal?')
  const list = JSON.parse(window.localStorage.getItem('goals') || '[]')
  list.push(text)
  window.localStorage.setItem('goals', JSON.stringify(list))
  const newDailyList = JSON.parse(window.localStorage.getItem(currentDate))
  newDailyList.push({ text, complete: false })
  window.localStorage.setItem(currentDate, JSON.stringify(newDailyList))
  generateList()
})

generateList()
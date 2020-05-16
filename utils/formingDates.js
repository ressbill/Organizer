// Forming date for using in CRUD operations

const monthAgo = new Date()
const numberOfDay = monthAgo.getDate()
monthAgo.setDate(numberOfDay - 30)
const prev = new Date(monthAgo)
const yesterday = new Date()
yesterday.setDate(numberOfDay-1)

//Increase now date cause of comparison bug
const now = new Date()
const todaysNumber = now.getDate()
now.setDate(todaysNumber +1)


exports.now = now
exports.monthAgo =  prev
exports.yesterday = yesterday

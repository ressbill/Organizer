const monthAgo = new Date()
const numberOfDay = monthAgo.getDate()
monthAgo.setDate(numberOfDay - 30)
const prev = new Date(monthAgo)
const yesterday = new Date()
yesterday.setDate(numberOfDay-1)


exports.now = new Date()
exports.monthAgo =  prev
exports.yesterday = yesterday

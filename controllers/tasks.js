exports.getAllTasks = (req, res, next) => {
    res.send('GET ALL TASKS')
}

exports.create = (req, res , next) => {
    res.send('Create new Task')
}
exports.update = (req, res , next) => {
    res.send('Update Task')
}
exports.remove = (req, res , next) => {
    res.send('Task to REMOVE')
}

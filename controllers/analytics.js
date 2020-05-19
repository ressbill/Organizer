const moment = require('moment')
const Wallet = require('../models/Wallet').wallet
module.exports.overview = async (req, res, next) => {

    if(req.query.month){
        try {
            const candidate = await Wallet.findOne({owner: req.userData.userId})
            if(candidate){
                const monthAgo = new Date()
                const numberOfDay = monthAgo.getDate()
                monthAgo.setDate(numberOfDay - 30)
                const userId = require('mongoose').Types.ObjectId(req.userData.userId)
                const costs = await Wallet
                    .aggregate()
                    .match({owner: userId})
                    .unwind('costs')
                    .project({costs: 1, _id: 0})
                    .sort({'costs.date': 1})
                    .replaceRoot('costs')
                    .match({date: {$lte: new Date(), $gte: monthAgo}})
                    .exec()
                const income = await Wallet
                    .aggregate()
                    .match({owner: userId})
                    .unwind('income')
                    .project({income: 1, _id: 0})
                    .sort({'income.date': 1})
                    .replaceRoot('income')
                    .match({date: {$lte: new Date(), $gte: monthAgo}})
                    .exec()
                const mapCosts = createMap(costs)
                const mapIncome = createMap(income)
                // Chart
                const costsChart = Object.keys(mapCosts).map(label => {
                    const costs = mapCosts[label].reduce((acc, cost) => {
                        return acc += cost.price
                    }, 0)
                    return {label, costs}
                })
                const incomeChart = Object.keys(mapIncome).map(label => {
                    const income = mapIncome[label].reduce((acc, income) => {
                        return acc += income.amount
                    }, 0)
                    return {label, income}
                })


                // All costs amount
                const costsTotalNumber = costs.length
                // Total costs price
                const totalCosts = costs.reduce((acc, cost) => {
                    return acc += cost.price
                }, 0)
                // Average Cost price
                const averageCost = (totalCosts / costsTotalNumber).toFixed(0)

                // All  Income amount
                const incomeTotalNumber = income.length
                // Total  Income price
                const totalIncome = income.reduce((acc, cost) => {
                    return acc += cost.amount
                }, 0)
                // Average Income price
                const averageIncome = (totalIncome / incomeTotalNumber).toFixed(0)

                // TotalSum
                // const sum = totalCosts+totalIncome
                // Percent of costs

                res.status(200).json({
                    costsChart: costsChart,
                    incomeChart: incomeChart,
                    costs: {
                        totalAmount: costsTotalNumber,
                        total: totalCosts,
                        average: +averageCost,
                    },
                    income: {
                        totalAmount: incomeTotalNumber,
                        total: totalIncome,
                        average: +averageIncome,
                    }
                })
            } else {
                res.status(200).json({message: 'U got no wallet yet. Get one by adding any cost or  income'})
            }

        } catch (e) {
            next(e)
        }

    } else {
    try {
        const candidate = await Wallet.findOne({owner: req.userData.userId})
        if (candidate) {
            const {income} = candidate
            const {costs} = candidate

            const mapCosts = createMap(costs)
            const mapIncome = createMap(income)

            // Chart
            const costsChart = Object.keys(mapCosts).map(label => {
                const costs = mapCosts[label].reduce((acc, cost) => {
                    return acc += cost.price
                }, 0)
                return {label, costs}
            })
            const incomeChart = Object.keys(mapIncome).map(label => {
                const income = mapIncome[label].reduce((acc, income) => {
                    return acc += income.amount
                }, 0)
                return {label, income}
            })


            // All costs amount
            const costsTotalNumber = costs.length
            // Total costs price
            const totalCosts = costs.reduce((acc, cost) => {
                return acc += cost.price
            }, 0)
            // Average Cost price
            const averageCost = (totalCosts / costsTotalNumber).toFixed(0)

            // All  Income amount
            const incomeTotalNumber = income.length
            // Total  Income price
            const totalIncome = income.reduce((acc, cost) => {
                return acc += cost.amount
            }, 0)
            // Average Income price
            const averageIncome = (totalIncome / incomeTotalNumber).toFixed(0)

            // TotalSum
            // const sum = totalCosts+totalIncome
            // Percent of costs

            res.status(200).json({
                costsChart: costsChart,
                incomeChart: incomeChart,
                costs: {
                    totalAmount: costsTotalNumber,
                    total: totalCosts,
                    average: +averageCost,
                },
                income: {
                    totalAmount: incomeTotalNumber,
                    total: totalIncome,
                    average: +averageIncome,
                }
            })
        } else {
            res.status(200).json({message: 'U got no wallet yet. Get one by adding any cost or  income'})
        }

    } catch (e) {
        next(e)
    }
    }
}

function createMap(arrayWithDate = []) {
    const createdMap = {}
    arrayWithDate.forEach(el => {
        const date = moment(el.date).format('DD.MM.YYYY')
        if (!createdMap[date]) {
            createdMap[date] = []
        }
        createdMap[date].push(el)
    })
    return createdMap
}

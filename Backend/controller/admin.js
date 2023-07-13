const Expense = require("../model/expense");

exports.addExpense = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    Expense.create({ amount, description, category }).then(() => {
        console.log("EXPENSE CREATED")
        res.json();
    })

};

exports.getExpense = (req, res, next) => {
    Expense.findAll().then((expense) => {
        res.json(expense);
    })
}

exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.expenseId;
    // console.log(expenseId)
    Expense.findByPk(expenseId).then((element) => {
        return element.destroy();
    }).then(() => {
        console.log("EXPENSE DELETE");
    }).catch((err) => {
        console.log(err);
    })
}
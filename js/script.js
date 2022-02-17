

//function for get input field value by parameter
function getInputValue(inputField) {
    const incomeBalance = document.getElementById(inputField);
    return incomeBalance.value;

}
//function for  balance element select
function getTotalBalance() {
    const totalBalance = document.getElementById('total-balance');
    return totalBalance;
}
//function for calculation of expenses
function totalCalculationExpense(food, rent, cloth) {
    const foodInNumber = parseFloat(food);
    const rentInNumber = parseFloat(rent);
    const clothInNumber = parseFloat(cloth);
    let totalExpenses = foodInNumber + rentInNumber + clothInNumber;
    return totalExpenses;

}
function errorForIncomeExpense() {
    //select error message by id
    const successMessage = document.getElementById('calculation-success');
    const failErrorForNan = document.getElementById('calculation-error-for-NAN');
    const failErrorForNegative = document.getElementById('calculation-error-for-negative');
    const failErrorForSmallerIncome = document.getElementById('calculation-error-for-smaller-income');
    const failErrorForEmptyField = document.getElementById('calculation-error-for-empty-field');

    //collect value  of income and expense field
    const income = getInputValue('income-balance');
    const food = getInputValue('food-field');
    const rent = getInputValue('rent-field');
    const cloth = getInputValue('clothes-field');

    //call calculation function for calculate total sum of expenses
    const sumOfExpenses = totalCalculationExpense(food, rent, cloth);

    //if input field has any nan value
    if (isNaN(income) || isNaN(food) || isNaN(rent) || isNaN(cloth)) {
        failErrorForNan.style.display = 'block';

    }

    //if input field has any negative value
    else if (parseFloat(income) < 0 || parseFloat(food) < 0 || parseFloat(rent) < 0 || parseFloat(cloth) < 0) {

        failErrorForNegative.style.display = 'block';

    }
    else if (sumOfExpenses > income) {

        failErrorForSmallerIncome.style.display = 'block';

    }
    else if (income == '' || food == '' || rent == '' || cloth == '') {

        failErrorForEmptyField.style.display = 'block'

    }
    else {

        document.getElementById('total-expenses').innerText = sumOfExpenses;
        getTotalBalance().innerText = (income) - sumOfExpenses;
        successMessage.style.display = 'block';

        //after comple calculation of income and expenses,call savingAmountCalculation() function to calculate saving amount

        savingAmountCalculation();

    }

}

//add click event to calculate button
document.getElementById('claculate-btn').addEventListener('click', function () {
    errorForIncomeExpense();
    totalCalculationExpense();


})


//saving section work
function savingAmountCalculation() {
    document.getElementById('save-btn').disabled = false;
    //saving ammount calculation
    document.getElementById('save-btn').addEventListener('click', function () {
        const totalBalance = getTotalBalance().innerText;
        const saveAmount = (document.getElementById('save-input').value);
        const saveAmountCalculation = parseInt((saveAmount / 100) * (getInputValue('income-balance')));
        //all error message store
        const savedSuccess = document.getElementById('save-success');
        const errorNan = document.getElementById('error-for-NAN');
        const smallerBalance = document.getElementById('error-for-smaller-balance');
        //if balace less than saving amount
        if (parseFloat(totalBalance) < saveAmountCalculation) {
            smallerBalance.style.display = 'block'

        }
        //if value not a number
        else if (isNaN(saveAmount)) {
            errorNan.style.display = 'block';
        }

        else {
            document.getElementById('saving-amount').innerText = saveAmountCalculation;
            document.getElementById('remaining-balance').innerText = parseInt(getTotalBalance().innerText - saveAmountCalculation);
            savedSuccess.style.display = 'block';

        }

    })
}


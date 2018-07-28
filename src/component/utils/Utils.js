import _ from 'lodash'

const Utils = (() => {
    this.monthsArrayofArray = [];
    this.yearsArrayofArray = [];
    this.Months = [];
    this.Months.push({ "key": "01", "text": "January", "value": "01" })
    this.Months.push({ "key": "02", "text": "February", "value": "02" })
    this.Months.push({ "key": "03", "text": "March", "value": "03" })
    this.Months.push({ "key": "04", "text": "April", "value": "04" })
    this.Months.push({ "key": "05", "text": "May", "value": "05" })
    this.Months.push({ "key": "06", "text": "June", "value": "06" })
    this.Months.push({ "key": "07", "text": "July", "value": "07" })
    this.Months.push({ "key": "08", "text": "August", "value": "08" })
    this.Months.push({ "key": "09", "text": "September", "value": "09" })
    this.Months.push({ "key": "10", "text": "October", "value": "10" })
    this.Months.push({ "key": "11", "text": "November", "value": "11" })
    this.Months.push({ "key": "12", "text": "December", "value": "12" })
    this.Years = [];
    this.Years.push({ "key": "2015", "text": "2015", "value": "2015" })
    this.Years.push({ "key": "2016", "text": "2016", "value": "2016" })
    this.Years.push({ "key": "2017", "text": "2017", "value": "2017" })
    this.Years.push({ "key": "2018", "text": "2018", "value": "2018" })

    this.WeekDayValues = ["S", "M", "T", "W", "T", "F", "S"];
    this.dayPerMonth = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]


    this.generateCalendarData = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth();
        let lastDayOfTheMonth = this.dayPerMonth[month];
        if (month === 1) {
            if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
                lastDayOfTheMonth = 29;
            } else {
                lastDayOfTheMonth = 28;
            }
        }
        let dateValues = [];
        let dayValue = { value: 1 };
        let firstDayOfMonth = (new Date(parseInt(month, 10) + 1 + ' 1 ,' + year)).getDay();
        dateValues[0] = buildDateValuesArray(firstDayOfMonth, 6, dayValue);
        _.forEach([1, 2, 3, 4,5], (index) => {
            if (dayValue.value + 6 > lastDayOfTheMonth) {
                dateValues[index] = buildDateValuesArray(0, lastDayOfTheMonth-(dayValue.value), dayValue);
            } else {
                dateValues[index] = buildDateValuesArray(0, 6, dayValue);
            }
        })
        return dateValues;
    }

    let buildDateValuesArray = (startIndex, endIndex, dayValue) => {
        let dateValuesArray = [];
        _.forEach([0, 1, 2, 3, 4, 5, 6], (index) => {
            if (index >= startIndex && index <= endIndex) {
                dateValuesArray.push(dayValue.value < 10 ? "0" + dayValue.value : dayValue.value.toString());
                dayValue.value++;
            } else {
                dateValuesArray.push("");
            }
        })
        return dateValuesArray;
    }

    this.Months.get = (index) => {
        return this.Months[index];
    }

    let month_iterator = [0, 1, 2, 3];
    _.forEach(month_iterator, (item, index) => {
        for (let counter = item * 4; counter < month_iterator[index + 1] * 4; counter++) {
            if (!this.monthsArrayofArray[item]) {
                this.monthsArrayofArray[item] = [];
            }
            this.monthsArrayofArray[item].push(this.Months[counter]);
        }
    });

    let year_iterator = [0];
    _.forEach(year_iterator, (item, index) => {
        for (let counter = item * 4; counter < 4; counter++) {
            if (!this.yearsArrayofArray[item]) {
                this.yearsArrayofArray[item] = [];
            }
            this.yearsArrayofArray[item].push(this.Years[counter]);
        }
    });

    return this;
})();

export default Utils;

//Returns an array with today's date and the date one year from now.
function getTodayAndNextYear() {
    let theDate = new Date();
    //Note: thanks to https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd for saving me a bit of time here
    let curDate = theDate.toISOString().split('T')[0];
    console.log(curDate);
    theDate.setFullYear(theDate.getFullYear() + 1);
    //https://stackoverflow.com/questions/8609261/how-to-determine-one-year-from-now-in-javascript
    let futureDate = theDate.toISOString().split('T')[0];
    console.log(futureDate);

    return [curDate, futureDate];
}

//Return today's date in YYYY-MM-DD format
function getToday() {
    let theDate = new Date();
    return theDate.toISOString().split('T')[0];
}

//Return last month in YYYY-MM-DD format
function getLastMonth() {
    let theDate = new Date();
    theDate.setDate(0); //set day to first day of month
    theDate.setMonth(theDate.getMonth() - 1);
    return theDate.toISOString().split('T')[0];
}

//Returns Jan 1 of current year in YYYY-MM-DD format
function getYearStart() {
    let theDate = new Date();
    theDate.setMonth(0);
    theDate.setDate(0);
    return theDate.toISOString().split('T')[0];
}

export { getTodayAndNextYear, getToday, getLastMonth, getYearStart };
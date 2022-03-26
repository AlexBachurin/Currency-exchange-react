
//helper to get percentage diff between 2 numbers
const getPercentageDiff = (cur, prev) => {
    //formule
    const percentage = ((cur - prev) / cur) * 100;
    return percentage.toFixed(4);
}

export default getPercentageDiff;
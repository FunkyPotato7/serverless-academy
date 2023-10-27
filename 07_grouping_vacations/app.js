import fs from 'fs';

const data = fs.readFileSync('data.json');

const reduce = JSON.parse(data).reduce((accumulator, currentValue) => {
    let push = false;

    if (!accumulator.length) {
        accumulator.push({ userId: currentValue.user._id, userName: currentValue.user.name, vacations: [ { startDate: currentValue.startDate, endDate: currentValue.endDate } ] });
    } else {
        for (const element of accumulator) {
            if (currentValue.user.name === element.userName) {
                element.vacations.push({ startDate: currentValue.startDate, endDate: currentValue.endDate })
                push = true
            }
        }

        if (!push) {
            accumulator.push({ userId: currentValue.user._id, userName: currentValue.user.name, vacations: [ { startDate: currentValue.startDate, endDate: currentValue.endDate } ] });
        }
    }

    return accumulator;
}, []);

console.log(reduce);

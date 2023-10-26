import fs from 'fs';

const uniqueValues = () => {
    const files = fs.readdirSync('./files', 'utf8');
    const uniqueNames = new Set();

    for (const file of files) {
        const data = fs.readFileSync(`./files/${file}`, 'utf8');
        const parsedData = data.split('\n');

        for (const word of parsedData) {
            uniqueNames.add(word);
        }
    }

    return uniqueNames.size;
}

const existInAllFiles = () => {
    const files = fs.readdirSync('./files', 'utf8');
    const newArr = [];
    let counter = 0;

    for (const file of files) {
        const data = fs.readFileSync(`./files/${file}`, 'utf8');
        const parsedData = data.split('\n');
        newArr.push(...parsedData);
    }

    newArr.reduce((accumulator, currentWord) => {
        accumulator[currentWord] = (accumulator[currentWord] || 0) + 1;
        if (accumulator[currentWord] === 20) {
            counter++;
        }
        return accumulator;
    }, {});

    return counter;
}

const existInAtLeastTen = () => {
    const files = fs.readdirSync('./files', 'utf8');
    const newArr = [];
    let counter = 0;

    for (const file of files) {
        const data = fs.readFileSync(`./files/${file}`, 'utf8');
        const parsedData = data.split('\n');
        newArr.push(...parsedData);
    }

    newArr.reduce((accumulator, currentWord) => {
        accumulator[currentWord] = (accumulator[currentWord] || 0) + 1;
        if (accumulator[currentWord] >= 10) {
            counter++;
        }
        return accumulator;
    }, {});

    return counter;
}

console.log('Unique Values:');
console.time('Ended in');
console.log(uniqueValues());
console.timeEnd('Ended in');
console.log('Exist In All Files:');
console.time('Ended in');
console.log(existInAllFiles());
console.timeEnd('Ended in');
console.log('Exist In At Least Ten:');
console.time('Ended in');
console.log(existInAtLeastTen());
console.timeEnd('Ended in');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const sortWordsAlphabetically = (arr) => {
    console.log(arr.filter(word => isNaN(Number(word))).sort());
}

const showNumbersAsc = (arr) => {
    console.log(arr.filter(word => !isNaN(Number(word))).map(num => Number(num)).sort(function(a, b){return a-b}).map(num => String(num)));
}

const showNumbersDes = (arr) => {
    console.log(arr.filter(word => !isNaN(Number(word))).map(num => Number(num)).sort(function(a, b){return a-b}).map(num => String(num)).reverse());
}

const showWordsByLength = (arr) => {
    console.log(arr.filter(word => isNaN(Number(word))).sort(function(a, b){
            if (a.length > b.length) return 1;
            if (a.length < b.length) return -1;
    }));
}

const showUniqueWords = (arr) => {
    console.log(arr.filter(word => isNaN(Number(word))).reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)){
            return [...accumulator, currentValue];
        } else {
            return accumulator;
        }
    }, []));
}

const showUniqueValues = (arr) => {
    console.log(arr.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)){
            return [...accumulator, currentValue];
        } else {
            return accumulator;
        }
    }, []));
}

const displayMenu = (value) => {
    readline.question('\n\nHow would you like to sort values:\n' +
        '1. Sort words alphabetically\n' +
        '2. Show numbers from lesser to greater\n' +
        '3. Show numbers from bigger to smaller\n' +
        '4. Display words in ascending order by number of letters in the word\n' +
        '5. Show only unique words\n' +
        '6. Display only unique values from the set of words and numbers entered by the user\n' +
        "To exit the program, enter 'exit'\n\n" +
        'Select (1 - 6) and press ENTER: ',choice => {
        if (choice === '1') {
            sortWordsAlphabetically(value);
            main(value);
        } else if (choice === '2') {
            showNumbersAsc(value);
            main(value);
        } else if (choice === '3') {
            showNumbersDes(value);
            main(value);
        } else if (choice === '4') {
            showWordsByLength(value);
            main(value);
        } else if (choice === '5') {
            showUniqueWords(value);
            main(value);
        } else if (choice === '6') {
            showUniqueValues(value);
            main(value);
        } else if (choice === 'exit') {
            readline.close();
        } else {
            console.log('Wrong choice, try again');
            displayMenu(value);
        }
    });
}

const main = () => {
    readline.question('Hello, Enter 10 words or numbers dividing them in spaces: ', value => {
        if (!value) {
            main();
        } else if (value.split(' ').length < 2) {
            console.log('\nPlease, enter at least 2 words or numbers\n');
            main();
        } else {
            console.log(value.split(' '));
            displayMenu(value.split(' '));
        }
    });

}

main();

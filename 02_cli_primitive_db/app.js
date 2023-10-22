import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
    {
        type: 'list',
        name: 'gender',
        message: 'Choose your Gender.',
        choices: ['male', 'female',],
    },
    {
        type: 'input',
        name: 'age',
        message: 'Enter your age:',
        validate(val) {
            if (val > 0 && !isNaN(Number(val))) {
                return true
            }

            return 'Error: Please enter valid name';
        },
    },
];

const main = () => {
    inquirer.prompt({
        type: 'input',
        name: 'user',
        message: "Enter the user's name. To cancel press ENTER:",
        validate(val) {
            if (isNaN(Number(val)) || val === '') {
                return true
            }

            return 'Error: Please enter valid name';
        },
        filter(val) {
            if (val) {
                return val[0].toUpperCase() + val.slice(1).toLowerCase();
            }
            return val;
        },
    }).then((user) => {
        if (user.user) {
            inquirer.prompt(questions).then((answers) => {
                fs.readFile(`./db/users.txt`, (err, data) => {
                    const parsedData = JSON.parse(data);
                    parsedData.push({...user, ...answers});

                    fs.writeFile(`./db/users.txt`, JSON.stringify(parsedData, null, '  '), (err) => {
                        if (err === null) {
                            main();
                        } else
                            console.log(err);
                    });
                });
            });
        } else {
            inquirer.prompt({
                type: 'confirm',
                name: 'search',
                message: 'Would you like to search values in DB?',
                default: '(y/n)'
            }).then((answer) => {
                if (answer.search) {
                    fs.readFile(`./db/users.txt`, (err, data) => {
                        const parsedData = JSON.parse(data);
                        console.log(parsedData);

                        inquirer.prompt({
                            type: 'input',
                            name: 'user',
                            message: "Enter user's name you wanna find in DB:",
                            validate(val) {
                                if (val.length >= 2 && isNaN(Number(val))) {
                                    return true
                                }

                                return 'Error: Please enter valid name';
                            },
                            filter(val) {
                                return val.toLowerCase();
                            }
                        }).then((answer) => {
                            const filter = parsedData.filter(user => user.user.toLowerCase() === answer.user);
                            if (filter.length) {
                                console.log(`User ${answer.user} was found.`);
                                console.log(filter[0]);
                            } else {
                                console.log(`User ${answer.user} was not found.`)
                            }
                        })
                    });
                }
            });
        }
    })
}

main();


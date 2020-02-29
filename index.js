const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");

// inquirer
// .prompt({
//     message: "Enter your GitHub username:",
//     name: "username"
// })
// .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}`;
//     console.log("api queired");

// axios.get(queryUrl).then(function(res) {
//     console.log(res.data.email); //attempting to gather git email
//     console.log(res.data.image); // attempting to gather image info
// })
// });

const writeFileAsynch = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Enter your GitHub username:",
        },
        // {
        //     type: "input",
        //     name: "badge",
        //     message: "At least one badge."
        // },
        {
            type: "input",
            name: "title",
            message: "what is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "what is your project description?"
        },
        {
            type: "input",
            name: "tableof",
            message: "what is your table of contents?"
        },
        {
            type: "input",
            name: "installation",
            message: "what is your installation?"
        },
        {
            type: "input",
            name: "usage",
            message: "what is your usage?"
        },
        {
            type: "list",
            name: "license",
            message: "what is your license?",
            choices: ["Apache 2.0", "MIT", "GPL 3.0", "BSD 3", "none"]
        },
        {
            type: "input",
            name: "contributing",
            message: "who is contributing?"
        },
        {
            type: "input",
            name: "tests",
            message: "what are your tests?"
        },
        {
            type: "input",
            name: "questions",
            message: "any questions?"
        },
    ]);    
}




function createReadme(answers) {
    return `
    # ${answers.title}\n
    ## Description\n
    ${answers.description}\n
    ## Table of Contents\n
    * ${answers.tableof}\n
    ## Installation\n
    ${answers.installation}\n
    ## Usage\n
    ${answers.usage}\n
    ## License\n
    [![github license](https://img.shields.io/badge/License-${answers.license}-blue.svg)]\n
    ## Contributors\n
    ${answers.contributing}\n
    ## Tests\n
    ${answers.tests}\n
    ## Questions\n
    ${answers.questions}`;
}

promptUser()
    .then(function(answers) {
        if (answers.license === "Apache 2.0") {
            answers.license === "Apache%202.0";
        }
        else if (answers.license === "BSD 3") {
            answers.license === "BSD%203";
        }
        else if (answers.license === "GPL 3.0") {
            answers.license === "GPL%203.0";
        }
        const md = createReadme(answers);

        return writeFileAsynch("readme/readme.md", md);
    })
    .then(function() {
        console.log("Successfully wrote to readme");
    })
    .catch(function(err) {
        console.log(err);
    });
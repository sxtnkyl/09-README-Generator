const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const makeMarkdown = require("./markdownFormatter");

var prompts = [
  {
    type: "input",
    name: "title",
    message: "What is the project title?",
  },
  {
    type: "input",
    name: "description",
    message: "Type a descriptive overview of the project goal.",
  },
  {
    type: "list",
    name: "license",
    message: "Which licensing does your project include?",
    //https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
    choices: ["MIT", "APACHE 2.0", "BSD 3.0", "ISC", "None"],
  },
  {
    type: "input",
    name: "installCmd",
    message: "What is the project's install command?",
    default: "npm i",
  },
  {
    type: "input",
    name: "testcmd",
    message: "What is the project's test command?",
    default: "npm test",
  },
  {
    type: "input",
    name: "runCmd",
    message: "What is the project's run command?",
    default: "node index.js",
  },
  {
    type: "input",
    name: "contribute",
    message: "How do you contribute to this project?",
  },
  {
    type: "input",
    name: "username",
    message: "What is your Github username?",
  },
];

const makeUsageBullets = async (inputs = []) => {
  const setupPrompts = [
    {
      type: "input",
      name: "usageBullet",
      message: "Add a setup instruction bullet.",
    },
    {
      type: "confirm",
      name: "repeat",
      message: "Do you want to add another?",
      default: true,
    },
  ];

  const { repeat, ...answers } = await inquirer.prompt(setupPrompts);
  const newInputs = [...inputs];
  for (const ans in answers) {
    newInputs.push(answers[ans]);
  }
  return repeat ? makeUsageBullets(newInputs) : newInputs;
};

//title, sections: Description, Table of Contents, Installation, Usage, License, Contributing, Tests, Questions
inquirer
  .prompt(prompts)
  .then(async (answers) => {
    const next = await makeUsageBullets();
    answers.usageBullets = next;
    const mdText = makeMarkdown(answers);

    fs.writeFile("README.md", mdText, (err) =>
      err ? console.log(err) : console.log("Successfully created readme!")
    );
  })
  .catch((err) => console.error(err));

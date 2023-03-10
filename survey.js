import inquirer from "inquirer";

const questions = [
  // Type your question here
  {
    type: "input",
    name: "name",
    message: "What is your name?",
    validate: (input) => {
      if (input === "") {
        return "Name cannot be empty";
      }
      return true;
    },
    filter: (input) =>
      input.replaceAll(" ", "").charAt(0).toUpperCase() +
      input.replaceAll(" ", "").toLowerCase().slice(1),
  },

  {
    type: "input",
    name: "emailAddress",
    message: (answers) => `Hello, ${answers.name}! What's your e-mail address?`,
    validate: (input) => {
      if (!/^[\w.-]+@gmail\.com$/.test(input)) {
        return "Email has to be a valid(xxx@gmail.com)";
      }
      return true;
    },
  },

  {
    type: "list",
    name: "isExperienced",
    message: "Are you an experienced developer?",
    choices: ["yes", "no"],
  },
  {
    type: "list",
    name: "yearsOfExperience",
    message: "How many years of experience you have with JavaScript?",
    choices: ["0-1", "1-3", "3-5", "5-10", "10+"],
    validate: (answers) => {
      if (answers.isExperienced === "yes") {
        return true;
      } else {
        return false;
      }
    },
  },

  {
    type: "checkbox",
    name: "libraries",
    message: "What JavaScript library do you know??",
    choices: ["React.js", "Vue", "Angular", "Node.js", "jQuery", "D3.js"],
    when: (answers) => {
      if (answers.isExperienced === "yes") {
        return true;
      }
      return false;
    },
    validate: (input) => {
      if (input.length > 0) {
        return true;
      } else {
        return "Please choose an answer";
      }
    },
  },

  {
    type: "number",
    name: "salary",
    message: "What is your desired salary?",
    when: (answers) => {
      if (answers.isExperienced === "yes") {
        return true;
      } else {
        return false;
      }
    },
    validate: (input) => {
      if (input > 0) {
        return true;
      }
      return "Salary cannot be 0";
    },
  },
];

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });

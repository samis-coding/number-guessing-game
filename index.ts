#! /usr/bin/env node
import inquirer from "inquirer";

const randomNumber = 43;

console.log("Hint:");
console.log("1: Number is greater than 35 and less than 50");
console.log("2: Number is a Prime Number");


  const { guessedNumber } = await inquirer.prompt([
    {
      type: "list",
      message: "Guess the number:",
      name: "guessedNumber",
      choices: ["39", "40", "43", "48"]
    }
  ]);

  if (parseInt(guessedNumber) === randomNumber) {
    console.log("Congratulations ❤️ !!!, You have guessed the right number ");
  } else {
    console.log("You lose!!! The correct number was " + randomNumber);
  }




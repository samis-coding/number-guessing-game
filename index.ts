#!/usr/bin/env node
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import fs from "fs";

let continuePlaying = true;

// Welcome message
console.log(chalk.yellow.bold("Welcome to the Guessing Game!"));

// Get player's name and gender
const { name, gender } = await inquirer.prompt([
  {
    name: "name",
    message: "Your Name: "
  },
  {
    type: "list",
    message: "Select your gender:",
    name: "gender",
    choices: ["boy", "girl"]
  }
]);

// Main game loop
while (continuePlaying) {
  // Display spinner while generating random number
  const spinner = ora("Generating random number...").start();
  const randomNumber = generateRandomNumber();
  spinner.stop();

  // Display hints
  console.log(chalk.green("Hint:"));
  console.log(chalk.yellow("1: Number is greater than 35 and less than 50"));
  console.log(chalk.yellow("2: Number is a Prime Number"));

  const correctNumber = randomNumber.toString();

  // Generate random options with only one correct option between 35 and 50
  const choices: string[] = [];
  while (choices.length < 4) {
    const randomChoice = Math.floor(Math.random() * (50 - 35 + 1)) + 35;
    if (!choices.includes(randomChoice.toString())) {
      choices.push(randomChoice.toString());
    }
  }
  const correctIndex = Math.floor(Math.random() * 4);
  choices[correctIndex] = correctNumber;

  // Player makes a guess
  const { guessedNumber } = await inquirer.prompt([
    {
      type: "list",
      message: "Guess the number:",
      name: "guessedNumber",
      choices: choices.sort(() => Math.random() - 0.5) // Shuffle options
    }
  ]);

  // Display player's name
  console.log("Hello, " + chalk.blue(name));

  // Check if the guess is correct
  if (guessedNumber === correctNumber) {
    // Display congratulations message and animation
    if (gender === "boy") {
      console.log(chalk.blue.bold("Congratulations " + name + "!!!"));
      console.log(chalk.blue(getAnimation("boy.txt")));
    } else {
      console.log(chalk.magenta.bold("Congratulations " + name + "!!!"));
      console.log(chalk.magenta(getAnimation("girl.txt")));
    }
    console.log(chalk.green("Congratulations !!!, You have guessed the right number :) "));
    console.log(chalk.yellow(getAnimation("firework.txt")));
  } else {
    // Display failure message and animation
    console.log(chalk.red(getAnimation("heartbroken.txt")));
    console.log(chalk.red("You lose!!! The correct number was " + correctNumber));
  }

  // Ask if the player wants to play again
  const { playAgain } = await inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to play again?",
      name: "playAgain"
    }
  ]);

  // If player chooses not to play again, exit the game loop
  if (!playAgain) {
    continuePlaying = false;
    console.log(chalk.cyan("Thank you for playing!," + name ));
  }
}

// Function to generate a random number between 36 and 49 (inclusive)
function generateRandomNumber(): number {
  return Math.floor(Math.random() * (49 - 36 + 1)) + 36;
}

// Function to get animation from file
function getAnimation(filename: string): string {
  try {
    return fs.readFileSync(filename, "utf-8");
  } catch (error) {
    return "";
  }
}

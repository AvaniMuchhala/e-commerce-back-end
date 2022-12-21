# E-Commerce Back End

## Description
This project is the back end for an e-commerce site using Express.js. This API successfully handles GET, POST, PUT, and DELETE routes for different categories, products, and tags. I built this project to better understand the architecture of e-commerce platforms and learn how to create an Express.js API that uses Sequelize to interact with a MySQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)

## Installation

Download Node.js for your platform. Run the following command to install the necessary dependencies (dotenv, Express, MySQL2, and Sequelize packages):
```
npm install
```

## Usage

Log into MySQL shell and enter your password. Run the following to create and use the "ecommerce_db" database:
```
SOURCE db/schema.sql
```

Then, seed the database models with mock data by running the following command:
```
npm run seed
```

Start the server by running:
```
npm run start
```

Test the different API endpoints/routes using an application like Insomnia.

Here is a [walkthrough video]() demonstrating the functionality of the application (also displayed below):
![e-commerce back end demo gif](./assets/employee-tracker-demo-gif.gif)

## License

MIT License. Please refer to the LICENSE in the repo.

## How to Contribute

If you would like to contribute to this project, please email me at: avani.muchhala@case.edu.
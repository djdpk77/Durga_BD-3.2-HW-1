const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

let users = [
  {
    id: 1,
    username: 'ankit',
    fullName: 'Ankit Kumar',
    email: 'ankit@gmail.com',
  },
  {
    id: 2,
    username: 'dhananjit',
    fullName: 'Dhananjit Singh',
    email: 'dhananjit.singh@gmail.com',
  },
];

let creditCards = [
  { number: '1234567890123456', holder: 'John Doe', expiry: '12/24' },
  { number: '9876543210987654', holder: 'Jane Smith', expiry: '06/23' },
];

let books = [
  { isbn: '9783161484100', title: 'Example Book', author: 'John Author' },
  { isbn: '9781234567897', title: 'Another Book', author: 'Jane Writer' },
];

let people = [
  { ssn: '123-45-6789', name: 'John Doe', birthDate: '1990-01-01' },
  { ssn: '987-65-4321', name: 'Jane Smith', birthDate: '1985-05-05' },
];

//Function to check if username is available for creating a new account or not
function checkAvailability(ele, username) {
  return ele.username === username;
}

//Endpoint 1: Check username availability
app.get('/username/find/:username', (req, res) => {
  let username = req.params.username;
  let result = users.find((ele) => checkAvailability(ele, username));

  if (result) {
    res.json({ result: 'Username is not available' });
  } else {
    res.json({ result: 'Username is available' });
  }
});

//Function to find the credit card number in an array of credit card objects
function findCreditCard(ele, cardNumber) {
  return ele.number === cardNumber;
}

//Endpoint 2: Find Credit Card Number
app.get('/credit-cards/find', (req, res) => {
  let cardNumber = req.query.cardNumber;
  let result = creditCards.find((ele) => findCreditCard(ele, cardNumber));

  res.json({ result });
});

//Function to find the email address
function findUserByEmail(ele, email) {
  return ele.email === email;
}

//Endpoint 3: Find Email Address
app.get('/emails/find', (req, res) => {
  let email = req.query.email;
  let user = users.find((ele) => findUserByEmail(ele, email));

  res.json({ user });
});

//Function to find the book by ISBN
function findBookByISBN(ele, isbn) {
  return ele.isbn === isbn;
}

//Endpoint 4: Find ISBN Number ( for books )
app.get('/books/find', (req, res) => {
  let isbn = req.query.isbn;
  let book = books.find((ele) => findBookByISBN(ele, isbn));

  res.json({ book });
});

//Function to find the SSN
function findPersonBySSN(ele, ssn) {
  return ele.ssn === ssn;
}

//Endpoint 5: Find Social Security Number (SSN)
app.get('/ssn/find', (req, res) => {
  let ssn = req.query.ssn;
  let person = people.find((ele) => findPersonBySSN(ele, ssn));

  res.json({ person });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

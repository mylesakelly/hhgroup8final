// SELECTORS
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
let answer = 0;

function generate_equation() {
  // Generating a random number between 0 and 12 and assigning it to "num1" and "num2"
  const num1 = Math.floor(Math.random() * 13);
  const num2 = Math.floor(Math.random() * 13);
  const dummyAnswer1 = Math.floor(Math.random() * 10); // Generating a random number between 0 and 9 for the incorrect answer choices
  const dummyAnswer2 = Math.floor(Math.random() * 10);
  const allAnswers = []; // Creating an empty array to store all possible answers
  const switchAnswers = []; // Creating an empty array to store the shuffled answers

  answer = num1 + num2; // holds the correct addition answer

  num1Element.textContent = num1; // Setting the text content of the random numbers generated for the addition equation
  num2Element.textContent = num2;

  allAnswers.push(answer, dummyAnswer1, dummyAnswer2); // Storing the correct answer and incorrect answers

  for (let i = allAnswers.length; i--;) {
    switchAnswers.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]); // Shuffling the answers and storing them in the "switchAnswers" array
  }

  // Setting the text content of the answer choice options
  option1.textContent = switchAnswers[0];
  option2.textContent = switchAnswers[1];
  option3.textContent = switchAnswers[2];

  option1.onclick = function () {
    if (switchAnswers[0] === answer) {
      fetch('http://localhost:5000/', { // Replace with your server's URL
      method: 'POST',
      body: JSON.stringify({ number: switchAnswers[0] }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
        .then(response => response.json())
        .then(data => {
          showTrivia(data.trivia);
          generate_equation();
        })
        .catch(error => console.error(error));
    } else {
      option1.textContent = "Try again";
    }
  };

  option2.onclick = function () {
    if (switchAnswers[1] === answer) {
      fetch('http://localhost:5000/', { // Replace with your server's URL
  method: 'POST',
  body: JSON.stringify({ number: switchAnswers[0] }),
  headers: {
    'Content-Type': 'application/json'
  }
})

        .then(response => response.json())
        .then(data => {
          showTrivia(data.trivia);
          generate_equation();
        })
        .catch(error => console.error(error));
    } else {
      option2.textContent = "Try again";
    }
  };

  option3.onclick = function () {
    if (switchAnswers[2] === answer) {
      fetch('http://localhost:5000/', { // Replace with your server's URL
      method: 'POST',
      body: JSON.stringify({ number: switchAnswers[0] }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
        .then(response => response.json())
        .then(data => {
          showTrivia(data.trivia);
          generate_equation();
        })
        .catch(error => console.error(error));
    } else {
      option3.textContent = "Try again";
    }
  };
}

function showTrivia(trivia) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-correct-answer").textContent = answer;
  document.getElementById("trivia").textContent = trivia;

  setTimeout(function () {
    document.getElementById("modal").style.display = "none";
  }, 5000);
}

generate_equation();

// function to delete user 1 information from mysql database

function deleteUser(userId) {
  // Send a DELETE request to the server
  fetch(`/users/${2}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('User deleted successfully');
        // Perform any necessary UI updates
        
        // Redirect to the login page
        window.location.href = '/login'; // Replace 'login.html' with the actual path to your login page
      } else {
        console.error('Failed to delete user');
        // Handle the error case
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error case
    });
}

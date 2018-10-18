/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case 'eye color':
      filteredPeople = searchByEyeColor(people);
      break;
    case 'gender':
      filteredPeople = searchByGender(people);
      break;
    case 'age':
      filteredPeople = searchByAge(people);
      break;
    case 'occupation':
      filteredPeople = searchByOccupation(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}
function searchByHeight(people) {
  let userInputHeight = prompt('How tall is the person?(inches)');
  let heightArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });
  return heightArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let weightArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.weight matches userInputHeight
  });

  return weightArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt('What color are their eyes?');
  let eyeColorArray = people.filter(function (el) {
    if(el.eyeColor = userInputEyeColor) {
      return true;
    }
  });
  return eyeColorArray;
}
function searchByAge (data) {
    let ageTemp = [];
    let ageYear;
    let age = [];
    for (let i = 0; i < data.length; i++){
        ageTemp = data[i].dob.split("/");
        ageYear = ageTemp[2];
        age.push(data[i].id)
        age.push(2018 - ageYear);
    }
    return findPersonWithAge(age);
}
function findPersonWithAge (age) {
    let userInput = prompt("What is the age you are searching for?");
    for (let i = 0; i < age.length; i++){
        if (age[i] == userInput){
        let searchID = age[i - 1];
        let ageArray = []
            for (let i = 0; i < data.length; i++){
                if (data[i].id == searchID){
                  ageArray.push(data[i]);
                }
            }
            console.log(ageArray)
            return ageArray
        }
    }
}



function searchByGender(people) {
  let userInputGender = prompt('What is the gender of the person?');
  let genderArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  return genderArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt('What is the persons occupation?');
  let occupationArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });
  return occupationArray;
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    let personInfo = 'Id: ' + person.id + '\n' + 'First Name: '+ person.firstName + '\n' + 'Last Name: ' + person.lastName + '\n' + 'Gender: ' + person.gender + '\n' + 'Date of Birth: ' + person.dob + '\n' + 'Height: ' + person.height + '\n' + 'Weight: ' + person.weight + '\n' + 'Eye Color: ' + person.eyeColor + '\n' + 'Occupation:' + person.occupation;
    alert(personInfo);
    break;
    case "family":
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var userInputFirstName = promptFor("What is the person's first name?", chars);
  var userInputLastName = promptFor("What is the person's last name?", chars);
  let personWithName = people.filter(function (el) {
    if(el.firstName == userInputFirstName && el.lastName == userInputLastName) {
      return true;
    }
  });
  return personWithName;
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
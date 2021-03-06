
// appAgeData is the function called to start the entire application
function addAgeData (data) { 
  let ageAddedData = data.map(function (el){
  let ageTemp = el.dob.split("/");
  let ageYear = ageTemp[2];
  el.age = 2018 - ageYear;
  return el;
});
  app(ageAddedData);
}

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
  switch(searchType){
    case 'yes':
      let personsName = searchByName(people)
        if(personsName.length > 1) {
        searchByTraits(personsName)
      }
      else if(personsName.length == 1) {
        mainMenu(personsName[0], people)
      }
    break;
    case 'no':
      searchByTraits(people);
      break;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people);
    break;
  }
}

function searchByTraits(people, usedSearch = "None") {
  let userSearchChoice = promptFor("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation', 'id', or 'quit' to end search.", searchOptions);
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
    case 'id':
      filteredPeople = searchById(people);
      break;
    case 'quit':
      return;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  
  if (filteredPeople.length > 1){
    if (usedSearch == "None"){
      usedSearch = userSearchChoice;
    }else{
      usedSearch = usedSearch + " " + userSearchChoice
    }
    alert("You have found " + filteredPeople.length + " people by using " + usedSearch + ". We need to refine until you have found the specific person you are looking for.");
    return searchByTraits(filteredPeople, usedSearch);
  }

  mainMenu(filteredPeople[0], people);

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

function searchByAge(people) {
  let userInputAge = prompt('What is the age you are searching for?');
  let ageArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
  });
  return ageArray;
}

function searchById(people) {
  let userInputHeight = prompt('What is their ID?');
  let idArray = people.filter(function (el) {
    if(el.id == userInputHeight) {
      return true;
    }
  });
  return idArray;
}


function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let weightArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  return weightArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt('What color are their eyes?');
  let eyeColorArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
  });
  return eyeColorArray;
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

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendents'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    let personInfo = 'Id: ' + person.id + '\n' + 'First Name: '+ person.firstName + '\n' + 'Last Name: ' + person.lastName + '\n' + 'Gender: ' + person.gender + '\n' + 'Date of Birth: ' + person.dob + '\n' + 'Height: ' + person.height + '\n' + 'Weight: ' + person.weight + '\n' + 'Eye Color: ' + person.eyeColor + '\n' + 'Occupation: ' + person.occupation;
    alert(personInfo);
    break;
    case "family":
      immediateFamily(person, people);
    break;
    case "descendents":
      let finalDescendents = [];
      finalDescendents = hasDescendents(person, people, finalDescendents);
      displayObjects(finalDescendents);
    break;
    case "restart":
      app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

function hasDescendents(person, people, finalDescendents) {
  for (let i = 0; i < people.length; i++){
    if (person.id === people[i].parents[0] || person.id === people[i].parents[1]){
      finalDescendents.push(people[i]);
      people[i].Relation = "Descendent";
      hasDescendents(people[i], people, finalDescendents);
    }
  }
  return finalDescendents;
}

function displayObjects (objects) {
  let personRelations = "";
  for (let i = 0; i < objects.length; i++){
    let personInfo = objects[i];
    personInfo = 'Relation: ' + personInfo.Relation + '\n'+ 'Id: ' + personInfo.id + '\n' + 'First Name: '+ personInfo.firstName + '\n' + 'Last Name: ' 
    + personInfo.lastName + '\n' + 'Gender: ' + personInfo.gender + '\n' + 'Date of Birth: ' + personInfo.dob + '\n' + 'Height: ' 
    + personInfo.height + '\n' + 'Weight: ' + personInfo.weight + '\n' + 'Eye Color: ' + personInfo.eyeColor + '\n' + 'Occupation: ' + personInfo.occupation;
    personRelations += personInfo + "\n\ \n\ ";
  }
  console.log(personRelations);
}

function immediateFamily (person, people) {
  let family = [];
  if (person.parents[0] !== undefined){
    for (let i = 0; i < person.parents.length; i++){
      let parentId = person.parents[i];
      for (let i = 0; i < people.length; i++){
        if (people[i].id === parentId){
          people[i].Relation = "Parent";
          family.push(people[i]);
          
        }
      }
    }
  }
  let spouse = people.filter(function (el){
    if(el.id === person.currentSpouse)
    return true;
  });
  for (let i = 0; i < spouse.length; i++){
    spouse[i].Relation = "Spouse"
    family.push(spouse[i]);
  }
  let kids = people.filter(function (el){
    for (let i = 0; i < el.parents.length; i++){
      if (el.parents[i] === person.id){
        return true;
      }
    }
  });
  for (let i = 0; i < kids.length; i++){
    kids[i].Relation = "Child";
    family.push(kids[i]);
  }
  displayObjects(family, "Relation: ");
}

function searchByName(people){
  var userInputFirstName = promptFor("What is the person's first name?", chars);
  var userInputLastName = promptFor("What is the person's last name?", chars);
  let personWithName = people.filter(function (el) {
    if(el.firstName == userInputFirstName && el.lastName == userInputLastName) {
      return true;
    }
  });
  if (personWithName[0] === undefined){
    alert("That name does not exist in our database. Please try again!");
    app(people);
  }
  return personWithName;
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  alert(personInfo);
}

function promptFor(question, callback){

  let response = prompt(question);
  let valid = callback(response);
  if (valid === true){
    return response;
  }else{
    return valid;
  }
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function searchOptions(input){
  let optionsArray = ['height', 'weight', 'eye color', 'gender', 'age', 'occupation', 'id', 'quit'];
  for (let i = 0; i < optionsArray.length; i++){
    if (optionsArray[i] == input){
      return true;
    }else if (i === optionsArray.length){
      return false;
    }
  }
}

function chars(input){
  return true;
}
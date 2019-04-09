function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}



//To create relationships among objects, use properties whose values are arrays of other objects:

var pdx = { name: "Portland" };
var sfo = { name: "San Francisco" };
var sea = { name: "Seattle" };

var usa = { name: "United States of America", cities: [pdx, sfo, sea] };

//For consistency when using similar objects, use an empty array rather than not defining the property:

var uruguay = { name: "Uruguay", cities: [] };

//Add more objects to the array property:

var mlz = { name: "Melo" };
uruguay.cities.push(mlz);

// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteEmail = function(email) {
  delete this.emailAddress;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.physicalAddress = physicalAddress
}

//not working, yet.
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
//
// AddressBook.prototype.deleteEmailAddress = function(id) {
//   for (var i=0; i< this.contacts.length; i++) {
//     if (this.contacts[i]) {
//       if (this.contacts[i].id == id) {
//         delete this.emailAddress;
//         return true;
//       }
//     }
//   };
//   return false;
// }
//
// AddressBook.prototype.deletePhysicalAddress = function(id) {
//   for (var i=0; i< this.contacts.length; i++) {
//     if (this.contacts[i]) {
//       if (this.contacts[i].id == id) {
//         delete this.physicalAddress;
//         return true;
//       }
//     }
//   };
//   return false;
// }

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".physical-address").html(contact.physicalAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

// function deleteAddresses(contactId){
//   $('.btn').onclick(.remove(Contact.emailAddress));
// }

//
//   $('.btn').onclick().remove(this.);
// }

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    addressBook.deleteEmail(this.id); //not functional yet
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-physical-address").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})

$(document).ready(function() {

  const API_KEY = 'unsecure'//1490038312163;

  // $.ajax({
  //     url: `https://fyre-tech-test.herokuapp.com/person?userid=4532&auth=${API_KEY}`,
  //     type: 'GET',
  //     success: function(res) {
  //       //set document to data
  //       //console.log(res.data);
  //     }
  // });


  var $userInput;
  $('.userInput').change(function() {
    $userInput = $('.userInput').val();
  })

  var userObj = {};
  $('.user_form').submit(function(e){
    e.preventDefault();
    //console.log($userInput);
    $.ajax({
        url: `https://fyre-tech-test.herokuapp.com/person?userid=${$userInput}&auth=${API_KEY}`,
        type: 'GET',
        success: function(res) {
          //console.log(res.data);
          userObj = {
            active: res.data.status,
            currentSalary: '',
            desiredSalary: '',
            willRelocate: res.data.profile.willingToRelocate,
            externalId: res.data.id.toString(),
            personal: {
              first: res.data.firstName,
              last: res.data.lastName
            },
            homeAddress: {
              addressString: null,
              address: res.data.addresses[0].line1,
              address2: res.data.addresses[0].line2,
              city: res.data.addresses[0].city,
              state: res.data.addresses[0].state,
              zip: res.data.addresses[0].zip,
              countryCode: res.data.addresses[0].country
            },
            contactMethods: {
              email: res.data.contactMethods[1].text
            }
          }//end of userObj
          //console.log(userObj);
        }
    }).then(function() {
      console.log(userObj);
      $.ajax({
          url: `https://fyre-tech-test.herokuapp.com/candidate?auth=${API_KEY}`,
          type: 'POST',
          contentType: 'application/json; charset=UTF-8',
          data: JSON.stringify(userObj),
          success: function(res) {
            console.log(res);
          }
      });
    })



  }) //end of submit

}) //end of document.ready

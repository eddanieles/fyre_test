$(document).ready(function() {

  const API_KEY = 'unsecure';

  // var API_KEY;
  //
  // $.ajax({
  //     url: `https://fyre-tech-test.herokuapp.com/auth`,
  //     type: 'GET',
  //     success: function(res) {
  //       //set document to data
  //       //console.log(res);
  //       $('.auth_div').html(res);
  //     }
  // }).then(function() {
  //   API_KEY = document.querySelector('.auth').innerText;
  //   //API_KEY = $('.auth').innerText;
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
          //console.log(res);
          userObj = {
            active: res.data.status,
            currentSalary: '',
            desiredSalary: '',
            willRelocate: (res.data.profile.willingToRelocate === true),
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
              state: res.data.addresses[0].state.toUpperCase(),
              zip: res.data.addresses[0].zip.toString(),
              countryCode: res.data.addresses[0].country.substring(0, 2)
            },
            contactMethods: {
              email: res.data.contactMethods[1].text
            }
          }//end of userObj
          //console.log(userObj);
        }
    }).then(function() {
      //console.log(userObj);
      $.ajax({
          url: `https://fyre-tech-test.herokuapp.com/candidate?auth=${API_KEY}`,
          type: 'POST',
          contentType: 'application/json; charset=UTF-8',
          data: JSON.stringify(userObj),
          success: function(res) {
            console.log(res);
            $('.candidate_list').prepend(`
              <li>
              <p>ID: ${res.data.externalId}</p>
              <p>Name: ${res.data.personal.first} ${res.data.personal.last}</p>
              <p>Address: ${res.data.homeAddress.address} ${res.data.homeAddress.city}, ${res.data.homeAddress.state} ${res.data.homeAddress.zip}</p>
              <p>Email: ${res.data.contactMethods.email}</p>
              </li>
              `);
          }
      });
    })



  }) //end of submit

}) //end of document.ready

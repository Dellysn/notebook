$(document).ready(function () {

  $("#register").submit(function (e) {
    e.preventDefault();
    let formInput = $("form")[0];
    let formData = new FormData(formInput);
    $.post({

        url: "/users/signup",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: "application/json"
      })
      .done(function (response) {
        console.log(response);
      })
      .fail(function (response) {
        console.log(response);
      });


  });
  // Login functionality
  $("#login").submit(function (e) {
    let form = $("form")[0];
    console.log(form);
    let formData = new FormData(form);
    $.ajax({
        type: "POST",
        url: "/users/signin",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: "application/json"
      })
      .done(function (response) {
        console.log(response);
      })
      .fail(function (response) {
        console.log(response);
      });
    e.preventDefault();
  });

  // Creating notes
});
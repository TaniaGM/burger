$(document).ready(function() {
    console.log("ready")
})

$(document).on("click", "#add-btn", function(event) {
    event.preventDefault();
    console.log("submit");

    var newBurger = {
        name: $("#burgerInput").val().trim(),
        devoured: 0
      };

    console.log(newBurger);

    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          location.reload();
        }
      );
})

$(document).on("click", "#devour-btn", function(event) {
    event.preventDefault();

    var id = $(this).attr("data-burgerid")

    $(this).attr("data-devour", 1)

    console.log($(this).attr("data-devour"))


    
    console.log("ID " +id)

    var status = {
        devoured: $(this).attr("data-devour")
    }

    $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: status
    }).then(
        function() {
            console.log("eaten");
            location.reload();
        }
    )
})
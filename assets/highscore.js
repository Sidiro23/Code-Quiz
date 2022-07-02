//variables
var highScore = document.querySelector("#highScores");
var clear = document.querySelector("#clear");
var return1 = document.querySelector("#return");


clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// local storage
var scores = localStorage.getItem("scores");
scores = JSON.parse(scores);

if (scores !== null) {

    for (var i = 0; i < scores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = scores[i].name + " " + scores[i].score;
        highScore.appendChild(createLi);

    }
}
// back to main page
return1.addEventListener("click", function () {
    window.location.replace("./index.html");
});




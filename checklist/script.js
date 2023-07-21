document.getElementById("continue-button").addEventListener("click", function() {
    document.getElementById("course-details").style.display = "block"

    var rowElement = document.getElementsByClassName("row")[0];
    rowElement.style.maxHeight = rowElement.scrollHeight + "px";

    setTimeout(function() {
        rowElement.style.maxHeight = "0px";
    }, 0);

    var inputBoxValue = document.getElementById('input-box').value;
    var courseName = document.createElement('h3');

    courseName.innerText = inputBoxValue;
    courseName.className = "course-name"

    var courseDetails = document.getElementById('course-details');
    courseDetails.prepend(courseName);
    document.getElementById('input-box').value = "";
});

document.getElementById("choose-button").addEventListener("click", function() {
    var startTime = document.getElementById('start-time').value;
    var endTime = document.getElementById('end-time').value;
    var dayMon = document.getElementById('monBox').value;
    var dayTue = document.getElementById('tueBox').value;
    var dayWed = document.getElementById('wedBox').value;
    var dayThu = document.getElementById('thuBox').value;
    var dayFri = document.getElementById('friBox').value;
    var listContainer = document.getElementById("list-container");

    var courseNameElement = document.querySelector(".course-name");
    if (courseNameElement) {
        let li = document.createElement("li");
        li.innerHTML = courseNameElement.innerText;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        courseNameElement.remove();
    }

    document.getElementById("course-details").style.display = "none";

    var rowElement = document.getElementsByClassName("row")[0];
    rowElement.style.maxHeight = rowElement.scrollHeight + "px";

    setTimeout(function() {
        rowElement.style.maxHeight = "100px";
    }, 0);
});


document.getElementById('list-container').addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    
}, false);

document.getElementById("course-details").style.display = "none";

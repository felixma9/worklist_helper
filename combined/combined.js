
var listContainer = document.getElementById("list-container");

//Responsible for page function after user presses "continue"
document.getElementById("continue-button").addEventListener("click", function() {
    
    //Check to see if the input is empty
    if (!document.getElementById("input-box").value) {
        alert("Please enter a course!")
    } else {

        //Reveals the course-details page element
        document.getElementById("course-details").style.display = "block"

        //Responsible for the "closing" animation of the initial text input box
        var rowElement = document.getElementsByClassName("row")[0];
        rowElement.style.maxHeight = rowElement.scrollHeight + "px";
        setTimeout(function() {
            rowElement.style.maxHeight = "0px";
        }, 0);

        //Adds the user's input text as a heading of the course-details page
        var inputBoxValue = document.getElementById('input-box').value;
        var courseName = document.createElement('h3');
        courseName.innerText = inputBoxValue;
        courseName.className = "course-name"
        var courseDetails = document.getElementById('course-details');
        courseDetails.prepend(courseName);

        //Clears the input field of the initial text box
        document.getElementById('input-box').value = "";
    }
});

//Responsible for page function after user presses "accept"
document.getElementById("choose-button").addEventListener("click", function() {

    
    //Checks validity of the user input
    if (!document.getElementById("start-time").value === "" || document.getElementById("start-time").value >= document.getElementById("end-time").value) {
        alert("Please enter a valid time range.")
    } else {

        //Obtaining the start-time/end-time inputs from the user
        var startTime = document.getElementById('start-time').value;
        var endTime = document.getElementById('end-time').value;

        //Obtaining the days-of-the-week input from the user (stores it in an array)
        var checkBoxes = document.querySelectorAll(".form-check-input");
        var checkedDays = [];
        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                checkedDays.push(checkBoxes[i].value)
            }
        }

        //Obtaining the checklist element and the course-name  
        var listContainer = document.getElementById("list-container");
        var courseNameElement = document.querySelector(".course-name");

        //Creates an object representing the course with all the info provided
        var course = {
            name: courseNameElement.innerText,
            start: startTime,
            end: endTime,
            days: checkedDays,
        }

        //Adds the course to a checklist along with a 'remove cross'
        if (courseNameElement) {
            let li = document.createElement("li");
            let courseDiv = document.createElement('div');
            let timeDiv = document.createElement('div');
            let dayDiv = document.createElement('div');     

            courseDiv.className = 'course';
            timeDiv.className = 'time';
            dayDiv.className = 'day';

            courseDiv.textContent = course.name;
            timeDiv.textContent = course.start + " - " + course.end;
            dayDiv.textContent = course.days;

            li.appendChild(courseDiv);
            li.appendChild(timeDiv);
            li.appendChild(dayDiv);


            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            courseNameElement.remove();
        }


        //Hides the course-details box
        document.getElementById("course-details").style.display = "none";
        saveData();

        //Responsible for animation of initial "row" text field re-appearing
        var rowElement = document.getElementsByClassName("row")[0];
        rowElement.style.maxHeight = rowElement.scrollHeight + "px";
        setTimeout(function() {
            rowElement.style.maxHeight = "100px";
        }, 0);

    }
});


//Responsible for page function after user clicks checklist item or "remove" on checklist item
document.getElementById('list-container').addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
<<<<<<< Updated upstream
=======

        //Retrieving the course (using the ID) from the 'courses' array
        var course = findCourseById(parseInt(e.target.dataset.courseId));
        if (course) {

            //Store the start and end times, as well as start/end hours as integers
            var filteredStart = course.start.replace(':', '');
            var filteredEnd = course.end.replace(':', '');

            var intStart = parseInt(filteredStart);
            var intEnd = parseInt(filteredEnd);

            var intStartHour = parseInt(course.start);
            var intEndHour = parseInt(course.end);

            //Does the course begin and end after the half-hour?
            let startAfterHalf = (intStart % 100) >= 30;
            let endAfterhalf = (intEnd % 100) >= 30;

            //Calculate the length of the course
            var courseLength;
            
            if (startAfterHalf == endAfterhalf) {
                courseLength = intEndHour - intStartHour;
            } else if (startAfterHalf && !endAfterhalf) {
                courseLength = intEndHour - intStartHour - 0.5;
            } else {
                courseLength = intEndHour - intStartHour + 0.5;
            }

            var startHourTag = (intStartHour - 8) * 2 

            if (startAfterHalf) startHourTag++;

            //Get the slots to be filled in
            var slotIds = [];
            for (date of course.days) {
                for (let i = 0; i < courseLength; i++) {
                    var stringTag = startHourTag + i;
                    slotIds.push(date + stringTag);
                    console.log(slotIds);
                }
            }

            //Fill in the appropriate slots
            for (id of slotIds) {
                document.getElementById(id).className = "filled";
            }

            // console.log(intStart);
            // console.log(intEnd);
            // console.log(intStartHour);
            // console.log(intEndHour);
            // console.log(startAfterHalf);
            // console.log(endAfterhalf);
            // console.log(courseLength);
            // console.log(course.days);
            // console.log(startHourTag);


        } else {
            console.log("Course not found");
        }
        
>>>>>>> Stashed changes
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();

        //Remove this course from the array of active courses

        saveData();
    }
    
}, false);

//Initially hides the course details page
document.getElementById("course-details").style.display = "none";


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();
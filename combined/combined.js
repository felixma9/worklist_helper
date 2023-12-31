var courses = [];
var courseId = 0;

var listContainer = document.getElementById("list-container");

// Add an event listener to the "input-box" element to convert the input value to uppercase
document.getElementById("input-box").addEventListener("input", function() {
    this.value = this.value.toUpperCase();
});

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
        var hiddenCheckedDays = [];

        //Replace all 'Th' with 'X' in a new checked days array
        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                if (checkBoxes[i].value === "Th") {
                    hiddenCheckedDays.push("X");
                    checkedDays.push(checkBoxes[i].value);
                } else {
                    checkedDays.push(checkBoxes[i].value);
                    hiddenCheckedDays.push(checkBoxes[i].value);
                }
            }
        }

        console.log(checkedDays);
        console.log(hiddenCheckedDays);
        console.log(checkBoxes);

        //Obtaining the checklist element and the course-name  
        var listContainer = document.getElementById("list-container");
        var courseNameElement = document.querySelector(".course-name");

        //Each course object has an array with all of the slots it takes up
        var filteredStart = startTime.replace(':', '');
        var filteredEnd = endTime.replace(':', '');

        var intStart = parseInt(filteredStart);
        var intEnd = parseInt(filteredEnd);

        var intStartHour = parseInt(startTime);
        var intEndHour = parseInt(endTime);
        
        //Does the course begin/end after the half hour?
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

        //Get the first slot the course fills in
        var startHourTag = (intStartHour - 8) * 2 
        if (startAfterHalf) startHourTag++;

        //Get the exact slots to be filled in
        var slotIds = [];
        for (date of hiddenCheckedDays) {
            for (let i = 0; i < courseLength * 2; i++) {
                var stringTag = startHourTag + i;

                if (stringTag > 27 || stringTag < 0) break;

                slotIds.push(date + stringTag);
                //console.log(slotIds);
            }
        }

        //Creates an object representing the course with all the info provided
        var course = {
            id: courseId++,
            name: courseNameElement.innerText,
            start: startTime,
            end: endTime,
            days: checkedDays,
            slots: slotIds,
            checked: false,
            hidDays: hiddenCheckedDays
        }

        console.log(course.hidDays);

        //Add course to array
        courses.push(course);

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
            
            //Links to checklist item ID to the courseId for the 'courses' array
            li.dataset.courseId = course.id;

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



//Finds the course using the ID from the 'courses' array and returns it
function findCourseById(id) {
    return courses.find(course => course.id === id);
    
}

//Responsible for page function after user clicks checklist item or "remove" on checklist item
document.getElementById('list-container').addEventListener("click", function(e){

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        //Retrieving the course (using the ID) from the 'courses' array
        var course = findCourseById(parseInt(e.target.dataset.courseId));

        if (course) {

            //Display course if checked, hide if unchecked
            if (e.target.classList.contains("checked")) {
                course.checked = true;
                console.log(course.name);
                showCourse(course);
            } else {
                course.checked = false;
                hideCourse(course);
                hideAll();
                showAllChecked();
            }

        } else {
            console.log("Course not found");
        }
        saveData();
        
    } else if (e.target.tagName === "SPAN") {

        
        //Retrieving the course (using the ID) from the 'courses' array
        var course = findCourseById(parseInt(e.target.parentElement.dataset.courseId));

        if (course) {
            //Hide course on timetable and remove it
            course.checked = false;
            hideCourse(course);
            hideAll();
            showAllChecked();
        }

        e.target.parentElement.remove();

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

//Colours in all the slots that this course corresponds to
function showCourse(course) {

    //Placeholder day
    var currentDay = 'P';

    for (slot of course.slots) {

        console.log(currentDay);

        if (slot.charAt(0) != currentDay && (document.getElementById(slot).classList.contains("filled") || document.getElementById(slot).classList.contains("conflict"))) {
            currentDay = slot.charAt(0);
            document.getElementById(slot).className = "conflict";

            document.getElementById(slot).innerHTML = course.name;
        } 
        
        else if (slot.charAt(0) != currentDay) {
            currentDay = slot.charAt(0);
            document.getElementById(slot).className = "filled";

            document.getElementById(slot).innerHTML = course.name;
        }
        
        else if (document.getElementById(slot).classList.contains("filled") || document.getElementById(slot).classList.contains("conflict")) {
            document.getElementById(slot).className = "conflict";
        } else {
            document.getElementById(slot).className = "filled";
        }
    }
}

//Removes the given course from the timetable
function hideCourse(course) {
    for (slot of course.slots) {
        document.getElementById(slot).classList.remove("filled");
        document.getElementById(slot).classList.remove("conflict");
        document.getElementById(slot).classList.remove("first-block");
        document.getElementById(slot).innerHTML = "";
    }
}

function showAllChecked() {
    for (course of courses) {
        if (course.checked == true) {
            showCourse(course);
        }
    }
}

function hideAll() {
    for (course of courses) {
        hideCourse(course);
    }
}
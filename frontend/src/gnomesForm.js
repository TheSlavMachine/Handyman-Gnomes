var pageState = 0;
var pageList = [];
//Include JSON objects when storing the data from the form
//Swap order of previous and next buttons for each form that contains both

//The arrays only store the buttons, one for the next buttons and one for the previous buttons
//None of the data is stored in the arrays. Will include the program for storing the data in JSON object later
const nextButtons = Array.from(document.querySelectorAll("form .next-button"));
const prevButtons = Array.from(document.querySelectorAll("form .prev-button"));
const submitButton = document.querySelectorAll("form .submit-button")

//Event listener for the next button where when the next button is clicked, it calls
//the getNextPage function to go to the next page of the form
nextButtons.forEach((button)=> {
    button.addEventListener("click", ()=> {
        getNextPage();
    });
});

//Event listener for the next button where when the next button is clicked, it calls
//the getPreviousPage function to go to the previous page of the form
prevButtons.forEach((button)=> {
    button.addEventListener("click", ()=> {
        getPreviousPage();
    });
});

//Ensures the next button of the current goes to the next page linked to that next button
function getNextPage() {
    //if page state is 0 or we're on the first page, get all the pages of the 
    //corresponding selected checkboxes in the order of the checkboxes
    //This is done through the getAllpages function
    if (pageState == 0) {
        pageList = getAllPages();
    }
    //Makes the visibility of the current page we're on to none when next button is clicked
    //Makes visibility of the next button of the current page to none
    pageList[pageState].classList.remove("active");
    nextButtons[pageState].style.display="none";
    //Make the visiblity previous button of the page we're on to none
    //If we are not on the first page
    if (pageState > 0) {
        prevButtons[pageState].style.display="none";
    }
    
    //Increment pageState by 1 to ensure we are on the pageState of the next page
    //Makes the next page visible as well as the previous button of that next page
    pageState++;
    pageList[pageState].classList.add("active");
    //prevButtons[pageState].style.display="block";

    //If the page we're on is not the first page
    //Get the previous button of that page and make is visible
    if (pageState > 0) {
        prevButtons[pageState].style.display = "block";
    }

    //If the page we're on is not the last page, get next button of that page
    //and make that button visible
    if (pageState < pageList.length - 1) {
        nextButtons[pageState].style.display="block";
    }
}

//
function getPreviousPage() {
    pageList[pageState].classList.remove("active");
    prevButtons[pageState].style.display="none";
    if (pageState < pageList.length - 1) {
        nextButtons[pageState].style.display="none";
    }
    pageState--;
    pageList[pageState].classList.add("active");
    nextButtons[pageState].style.display="block";
    if (pageState > 0) {
        prevButtons[pageState].style.display="block";
    }
    if (pageState < pageList.length - 1) {
        nextButtons[pageState].style.display = "block";
    }
}
function getAllPages() {
    document.querySelector("form .alert").style.display="none"
    let checkList = Array.from(document.querySelectorAll("form .FormContents .ApplianceItem"))
    const applianceTypes = {
        cooktop: "cookTop-page",
        dishwasher: "dishwasher-page",
        dryer: "dryer-page"
    };
    var listOfPages = [document.querySelector("form .FormContents #appliance-range")];
    for(let i = 0; i < checkList.length; i++) {
        if (checkList[i].checked && applianceTypes[checkList[i].name]) {
            listOfPages.push(document.querySelector(`#${applianceTypes[checkList[i].name]}`));
        }
    }
    if (listOfPages.length == 1) {
        document.querySelector("form .FormContents .alert").style.display="block"
        return [];
    }
    listOfPages.push(document.querySelector("form .FormContents #account-page"))
    return listOfPages;
    
}
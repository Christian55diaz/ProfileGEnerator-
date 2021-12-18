// get all the needed elements needed for the program
const Manager= require("./lib/Manager");
const Engineer= require("./lib/Engineer");
const Intern= require("./lib/Intern");
const inquirer= require("inquirer");
const path= require("path");
const fs= require("fs");

// make an output folder named output/.resolve means that it will add that folder in this case inside the main folder
const output_dir= path.resolve(__dirname, "output");
// this will add into the folder, a file called team.html
// as of right now i'm not sure how to actually go about saving the data I have made with this method. I'm probably missing something that's right under my nose but I will leave it here for when I do find out :D
const outputPath= path.join(output_dir, "team.html");
// this is how the html is going to be generated
const renderHtml= require("./src/template-page");
// make sure to have the members and ids into arrays that way we can just add
// the answers in the form and then push that to the html
const teamMembers= [];
const ids= [];
// this is where all the magic happens
// start off with the manager then make an option where you can add an engineer or an intern
// added a defualt where if they choose an option to not add anyone then if just makes the team
function teamBuilderMenu(){
        console.log("Start building your team!")
        // manager starts here
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?",
                validate: answer =>{
                    if (answer.length<=1){
                        console.log(" Please type more than one letter")
                    }
                    else{
                        return true
                    }
                }

            },
            {
                type: "input",
                name: "managerId",
                message: "What is the manager's id?",
                validate: answer =>{
                    if (answer.match(/^\d+$/)){
                        return true
                    }
                    else{
                        console.log("Please enter a number, must be exactly one number")
                    }
                }
            
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email address?",
                validate: answer =>{
                    if (answer.match(/\S+@\S+\.\S+/)){
                        return true
                    }
                    else{
                        console.log("Please enter a correct email address")
                    }
                }
            
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the manager's office number?",
                validate: answer =>{
                    if (answer.match(/^\d+$/)){
                        return true
                    }
                    else{
                        console.log("Please enter a number, must be exactly one number")
                    }
                }
            
            }
        ]).then(answers =>{
            const manager= new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager);
            ids.push(answers.managerId);
            generateTeam();
        });
    

    function generateTeam(){
        inquirer.prompt([
            {
                type:"list",
                name:"teamMemberChoices",
                message:"Which type of team member would you like to add",
                choices:[
                    "Engineer",
                    "Intern",
                    "I don't want to add anymore members"
                ]
            }
        ]).then(userChoice =>{
            switch(userChoice.teamMemberChoices){
                case "Engineer":
                    addEngineer();
                    break;
                    case "Intern":
                        addIntern();
                        break;
                    default:
                        createTeam();
            }
        });
    }

    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: answer =>{
                    if (answer.length<=1){
                        console.log(" Please type more than one letter")
                    }
                    else{
                        return true
                    }
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's id number?",
                validate: answer =>{
                    if (answer.match(/^\d+$/)){
                        return true
                    }
                    else{
                        console.log("Please enter a number, must be exactly one number")
                    }
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
                validate: answer =>{
                    if (answer.match(/\S+@\S+\.\S+/)){
                        return true
                    }
                    else{
                        console.log("Please enter a correct email address")
                    }
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's github account?",
                validate: answer =>{
                    if (answer.length<=1){
                        console.log(" Please type more than one letter")
                    }
                    else{
                        return true
                    }
                }
            }
        ]).then(answers=>{
            const engineer= new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer);
            ids.push(answers.engineerId);
            generateTeam();
        });
    }

    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
                validate: answer =>{
                    if (answer.length<=1){
                        console.log(" Please type more than one letter")
                    }
                    else{
                        return true
                    }
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's id number?",
                validate: answer =>{
                    if (answer.match(/^\d+$/)){
                        return true
                    }
                    else{
                        console.log("Please enter a number, must be exactly one number")
                    }
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
                validate: answer =>{
                    if (answer.match(/\S+@\S+\.\S+/)){
                        return true
                    }
                    else{
                        console.log("Please enter a correct email address")
                    }
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school's name?",
                validate: answer =>{
                    if (answer.length<=1){
                        console.log(" Please type more than one letter")
                    }
                    else{
                        return true
                    }
                }
            }
        ]).then(answers=>{
            const intern= new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern);
            ids.push(answers.internId);
            generateTeam();
        });
    }
};
function createTeam(){
    if (!fs.existsSync(output_dir)) {
        fs.mkdirSync(output_dir)
    }
    const htmlTeamPage= renderHtml(teamMembers, ids);
        writeToFile(outputPath, htmlTeamPage)
        console.log("team saved!!")
};
// function to save file
function writeToFile(fileName, data) {
    // this writes the 
    fs.writeFileSync(fileName, data, err =>{
        if (err) {
           return console.error("err");
        }
    });
}


// call the menu to start the app :)
teamBuilderMenu();


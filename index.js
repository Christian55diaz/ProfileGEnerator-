// all needed components for this application
const Manager= require("./lib/Manager");
const Engineer= require("./lib/Engineer");
const Intern= require("./lib/Intern");
const inquirer= require("inquirer");
const path= require("path");
const fs= require("fs");

// make an output folder named output/.resolve means that it will add that folder in this case inside the main folder
const output_dir= path.resolve(__dirname, "output");
// this will add into the folder, a file called teampgen.html
const outputPath= path.join(output_dir, "teampgen.html");
// render the html(created)
const renderHtml= require("./src/template-page");
//make sure team membber roles are in an array so that answers go in that form when pushed to the html
const teamMembers= [];
const ids= [];
//down below is where the array of roles come in and the questions/prompts so that the html can be created
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
// add engineer
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
 //function to add the intern
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
// function to save file(shout out Brandon for helping me out with this save file function)
function writeToFile(fileName, data) {
    // this writes the 
    fs.writeFileSync(fileName, data, err =>{
        if (err) {
           return console.error("err");
        }
    });
}


// calling the menu to start the application
teamBuilderMenu();


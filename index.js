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
const renderHtml= require("./src/temppage");
//make sure team membber roles are in an array so that answers go in that form when pushed to the html
const teamMembers= [];
const ids= [];
//down below is where the array of roles come in and the questions/prompts so that the html can be created
function teamGeneratorMenu(){
        console.log("Welcome, to the team profile generator, build your team with the following questions.")
        // manager starts here
    function addManager(){
            inquirer.prompt([
                {
                    type: "input",
                    name: "managerName",
                    message: "What's the manager's name?",
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
                    message: "What's the manager's id?",
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
                    message: "What's the manager's email address?",
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
                    message: "What's the manager's office number?",
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
        }
        addManager();
    function generateTeam(){
        inquirer.prompt([
            {
                type:"list",
                name:"teamMemberChoices",
                message:"Would you like to add another member? Choose the member you want to add, if not choose I don't want to add anymore members.",
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
                message: "What's the engineer's name?",
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
                message: "What's the engineer's id number?",
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
                message: "What's the engineer's email?",
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
                message: "What's the engineer's github account?",
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
                message: "What's the intern's name?",
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
                message: "What's the intern's id number?",
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
                message: "What's the intern's email?",
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
                message: "What's the intern's school's name?",
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
        console.log("Team saved!!")
};
// function to save file(shout out Brandon for helping me out with this save file function)
function writeToFile(fileName, data) {
    // this writes the html file to the file system
    fs.writeFileSync(fileName, data, err =>{
        if (err) {
           return console.error("err");
        }
    });
}


//calling team generator menu to start the team generator app
teamGeneratorMenu();
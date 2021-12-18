// generate the team's html
const generateTeam= team =>{
    // start with the manager, then engineer, then the intern
    const generateManager = manager =>{
        return `
        <div class="employee-card">
    <div class="card-header">
            <h2 class="name-title">${manager.getName()}</h2>
            <h3 class="job-title"><i class="lni lni-briefcase"></i> ${manager.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="emp-list">
                <li class="list-item">ID:${manager.getId()}</li>
                <li class="list-item">Email:<a href = "mailto: ${manager.getEmail()}">${manager.getEmail()}</a></li>
                <li class="list-item">Office Number:${manager.getOfficeNumber()}</li>
            </ul>
        </div>
    </div>
         `;
    };
    const generateEngineer = engineer =>{
        return `
        <div class="employee-card">
    <div class="card-header">
            <h2 class="name-title">${engineer.getName()}</h2>
            <h3 class="job-title"><i class="lni lni-discord"></i> ${engineer.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="emp-list">
                <li class="list-item">ID:${engineer.getId()}</li>
                <li class="list-item">Email:<a href = "mailto: ${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                <li class="list-item">Github:<a href= "https://github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></li>
            </ul>
        </div>
    </div>
         `;
    };
    const generateIntern = intern =>{
        return `
        <div class="employee-card">
    <div class="card-header">
            <h2 class="name-title"> ${intern.getName()}</h2>
            <h3 class="job-title"><i class="lni lni-graduation"></i> ${intern.getRole()}</h3>
        </div>
        <div class="card-body">
            <ul class="emp-list">
                <li class="list-item">ID:${intern.getId()}</li>
                <li class="list-item">Email:<a href = "mailto: ${intern.getEmail()}">${intern.getEmail()}</a></li>
                <li class="list-item">School:${intern.getSchool()}</li>
            </ul>
        </div>
    </div>
         `;
    };
    // this allow to generate the html and push into a team html
    const html= [];
    //manager
    html.push(team
        .filter(employee => employee.getRole()=== "Manager")
        .map(manager => generateManager(manager))
    );
    //engineer
    html.push(team
        .filter(employee => employee.getRole()=== "Engineer")
        .map(engineer => generateEngineer(engineer))
    // make sure to join the string that way we get the manager and this
        .join("")
    );
    //intern
    html.push(team
        .filter(employee => employee.getRole()=== "Intern")
        .map(intern => generateIntern(intern))
        .join("")
    );
    // reutrn function
    return html.join("")
};

// function to export this function into a team html defining which employees are who
module.exports= team =>{
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team B)</title>
    <link rel="stylesheet" href="./dist/stylesheet.css">
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
</head>
<body>
<div class="team-header-container">
    <div class="team-header">
        <h1>My Team</h1>
    </div>
</div>
            <div class="team-container">
                ${generateTeam(team)}
            </div>
</body>
</html>
`;
};

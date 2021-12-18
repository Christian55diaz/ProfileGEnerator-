// generate the team's html with one big function
const generateTeam= team =>{
    // start with the manager
    const generateManager = manager =>{
        return `
        <div class="employee-card-container">
    <div class="card-header">
            <h2 class="name">${manager.getName()}</h2>
            <h3 class="job-title"><i class="lni lni-briefcase"></i> ${manager.getRole()}</h3>
        </div>
        <div class="employee-card-container">
            <ul class="employee-list">
                <li class="list-item">ID:${manager.getId()}</li>
                <li class="list-item">Email:<a href = "mailto: ${manager.getEmail()}">${manager.getEmail()}</a></li>
                <li class="list-item">Office Number:${manager.getOfficeNumber()}</li>
            </ul>
        </div>
    </div>
         `;
    };
    // next with the engineer
    const generateEngineer = engineer =>{
        return `
        <div class="employee-card-container">
    <div class="card-header">
            <h2 class="name">${engineer.getName()}</h2>
            <h3 class="job-title"><i class="lni lni-bolt-alt"></i> ${engineer.getRole()}</h3>
        </div>
        <div class="employee-card-container">
            <ul class="employee-list">
                <li class="list-item">ID:${engineer.getId()}</li>
                <li class="list-item">Email:<a href = "mailto: ${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                <li class="list-item">Github:<a href= "https://github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></li>
            </ul>
        </div>
    </div>
         `;
    };
// intern best for last
    const generateIntern = intern =>{
        return `
        <div class="employee-card-container">
    <div class="card-header">
            <h2 class="name"> ${intern.getName()}</h2>
            <h3 class="job-title"><i class="lni lni-discord"></i> ${intern.getRole()}</h3>
        </div>
        <div class="employee-card">
            <ul class="employee-list">
                <li class="list-item">ID:${intern.getId()}</li>
                <li class="list-item">Email:<a href = "mailto: ${intern.getEmail()}">${intern.getEmail()}</a></li>
                <li class="list-item">School:${intern.getSchool()}</li>
            </ul>
        </div>
    </div>
         `;
    };
    // puts the html code in an array and pushes that array to the html file
    const html= [];
    // add manager
    html.push(team
        .filter(employee => employee.getRole()=== "Manager")
        .map(manager => generateManager(manager))
    );
    // add engineer
    html.push(team
        .filter(employee => employee.getRole()=== "Engineer")
        .map(engineer => generateEngineer(engineer))
        .join("")
    );
    // add intern
    html.push(team
        .filter(employee => employee.getRole()=== "Intern")
        .map(intern => generateIntern(intern))
        .join("")
    );
    // joins everything above and adds it to the export
    return html.join("")
};

// this is where it pushes to the html file
module.exports= team =>{
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
    <link rel="stylesheet" href="/dist/stylesheet.css">
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
</head>
<body>
<header>
        <h1>My Team</h1>
</header>
            <div class="team-container">
                ${generateTeam(team)}
            </div>
</body>
</html>
`;
};
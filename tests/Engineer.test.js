const Engineer= require("../lib/Engineer");

test("See if user can add github account via constructor arguments", ()=>{
    const testValue= "gitacc";
    const e= new Engineer("chris", 9, "test@gmail.com", testValue);
    expect(e.github).toBe(testValue);
});

test("Can get github account be returned via getGithub()", ()=>{
    const testValue= "gitacc";
    const e= new Engineer("chris", 9, "test@gmail.com", testValue);
    expect(e.getGithub()).toBe(testValue);
});

test("Can get Engineer to be returned via getrole()", ()=>{
    const testValue= "Engineer";
    const e= new Engineer("chris", 9, "test@gmail.com", "gitacc");
    expect(e.getRole()).toBe(testValue);
});


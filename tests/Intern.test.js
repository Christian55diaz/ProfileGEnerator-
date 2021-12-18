const Intern= require("../lib/Intern");

test("See if user can add school via constructor arguments",()=>{
    const testValue= "school";
    const e= new Intern("brad", 1, "test@gmail.com", testValue);
    expect(e.school).toBe(testValue);
});

test("Can get school returned via getSchool()",()=>{
    const testValue= "school";
    const e= new Intern("brad", 1, "test@gmail.com", testValue);
    expect(e.getSchool()).toBe(testValue);
});

test("Can get Intern returned via getRole()", ()=>{
    const testValue= "Intern";
    const e= new Intern ("brad", 1, "test@gmail.com", "school");
    expect(e.getRole()).toBe(testValue);
});
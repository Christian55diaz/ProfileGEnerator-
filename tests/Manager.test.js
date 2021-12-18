const Manager= require("../lib/Manager");

test("See if user can add office number via constructor arguments", ()=>{
    const testValue= 99
    const e= new Manager("Max", 2, "test@gmail.com", testValue)
    expect(e.officeNumber).toBe(testValue)
});

test("Can get office number returned via getOfficeNumber()", ()=>{
    const testValue= 99
    const e= new Manager("Max", 2, "test@gmail.com", testValue)
    expect(e.getOfficeNumber()).toBe(testValue)
});

test("Can get Manager returned via getRole()", ()=>{
    const testValue= "Manager"
    const e= new Manager("Max", 2, "test@gmail.com", 99)
    expect(e.getRole()).toBe(testValue)
});
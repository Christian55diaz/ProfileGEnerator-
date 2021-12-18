const Employee= require("../lib/Employee");

test("Can I start Employee?", () =>{
    // using to target/ assign employee
    const e= new Employee();
    // returning the string with the typeof func
    // employee being the object
    expect(typeof(e)).toBe("object");
});

test("See if user can add a name via constructor arguments", ()=>{
    const testValue= "chris";
    const e= new Employee(testValue);
    expect(e.name).toBe(testValue);
});

test("See if user can add id via constructor arguments", ()=>{
    const testValue= 90;
    const e= new Employee("stuff", testValue);
    expect(e.id).toBe(testValue);
});

test("See if user can add email via constructor arguments",()=>{
    const testValue= "test@gmail.com";
    const e= new Employee("stuff", 90, testValue);
    expect(e.email).toBe(testValue);
});

test("Can get name via getName()", ()=>{
    const testValue= "chris";
    const e= new Employee(testValue);
    expect(e.getName()).toBe(testValue);
});

test("Can get id via getId()", ()=>{
    const testValue= 90;
    const e= new Employee("stuff", testValue);
    expect(e.getId()).toBe(testValue);
});

test("Can get email via getEmail()", ()=>{
    const testValue= "test@gmail.com";
    const e= new Employee("stuff", 9, testValue);
    expect(e.getEmail()).toBe(testValue);
});

test("Can get Employee via getRole()", ()=>{
    const testValue= "Employee";
    const e= new Employee("stuff", 9, "test@gmail.com");
    expect(e.getRole()).toBe(testValue);
});
import deleteDataFromServer from "../deleteDataFromServer";

it("Test of 'deleteDataFromServer', with success request (return data from server)", ()=>{
    const mockReasult = {success: true};
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>mockReasult}));
    return deleteDataFromServer("some url").then(data=>{
        expect(data).toEqual(mockReasult);
    });
});

it("Test of 'deleteDataFromServer', with unsuccessful request (return null)", ()=>{
    global.fetch = jest.fn(()=>Promise.reject());
    return deleteDataFromServer("some url").then(data=>{
        expect(data).toBeNull();
    });
});

import putDataToServer from "../putDataToServer";

it("Test of 'putDataToServer', with success request (return data from server)", ()=>{
    const mockData = {success: true};
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>mockData}));
    return putDataToServer("some url", mockData).then(data=>{
        expect(data).toEqual(mockData);
    });
});

it("Test of 'putDataToServer', with unsuccessful request (return null)", ()=>{
    global.fetch = jest.fn(()=>Promise.reject());
    return putDataToServer("some url").then(data=>{
        expect(data).toBeNull();
    });
});

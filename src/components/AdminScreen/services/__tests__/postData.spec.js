import postData from "../postData";

it("Test of 'postData', with success request (return data from server)", ()=>{
    const mockData = {success: true};
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>mockData}));
    return postData("some url", mockData).then(data=>{
        expect(data).toEqual(mockData);
    });
});

it("Test of 'postData', with unsuccessful request (return null)", ()=>{
    global.fetch = jest.fn(()=>Promise.reject());
    return postData("some url").then(data=>{
        expect(data).toBeNull();
    });
});

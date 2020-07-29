export default (url, email)=>{
    fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({email}),
      });
};
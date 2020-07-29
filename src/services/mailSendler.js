export default (url, email)=>{
  console.log(JSON.stringify({email}))
    fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({email}),
      });
};
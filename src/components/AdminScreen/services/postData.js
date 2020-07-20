export default (url, newObj) =>{
  console.log(sessionStorage.getItem("token")? "Bearer " + sessionStorage.getItem("token") : "")
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: sessionStorage.getItem("token")? "Bearer " + sessionStorage.getItem("token") : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObj),
  })
    .then((json) => json.json())
    .catch((err) => {
      alert("Internal Server Error! Try again");
      console.log(err);
      throw err;
    });
}
  

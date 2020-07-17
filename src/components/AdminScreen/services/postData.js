export default (url, newObj) =>
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
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

export default (url, newObj) =>
  fetch(url, {
    method: "PUT",
    headers: {
      Authorization: sessionStorage.getItem("token")? "Bearer" + sessionStorage.getItem("token") : "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObj),
  }).then((json) => json.json());

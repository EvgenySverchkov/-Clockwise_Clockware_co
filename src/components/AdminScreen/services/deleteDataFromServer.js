export default (url) =>
  fetch(url, {
    method: "delete",
    headers: {
      Authorization: sessionStorage.getItem("token")
        ? "Bearer " + sessionStorage.getItem("token")
        : "",
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .catch(() => {
      return null;
    });

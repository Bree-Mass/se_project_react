const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const getItems = () => {
  return request(`${baseUrl}/items`);
};

const postItem = ({ _id, name, weatherType, link }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, name, weatherType, link }),
  });
};

const deleteItem = (_id) => {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
  });
};

export { request, getItems, postItem, deleteItem };

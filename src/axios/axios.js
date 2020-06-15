import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/project",
});

//it is asynchronous task so when it get redered token variable something store null before token is store in local storage
//of browser and skip this operation.
//Two solution:-
//1.Use async/await to wait to get token
//2. store in state
const token = localStorage.getItem("token");

//better to store token in state

instance.defaults.headers.common["Authorization"] = `bearer ${token}`;
export default instance;

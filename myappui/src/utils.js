import axios from 'axios'

//Users cals
async function getUsers() {
    return await axios.get("http://localhost:8000/api/persons");
}

async function addNewUser(user) {
    return await axios.post("http://localhost:8000/api/persons", user);
}

async function updateUser(id, obj) {
    return await axios.put(`http://localhost:8000/api/persons/${id}`, obj);
}

async function deleteUser(id) {
    return await axios.delete(`http://localhost:8000/api/persons/${id}`);
}

//Todos cals
async function getTodos() {
    return await axios.get("http://localhost:8000/api/todos");
}

async function deleteTodo(id) {
    return await axios.delete(`http://localhost:8000/api/todos/${id}`);
}

async function updateTodo(id, obj) {
    return await axios.put(`http://localhost:8000/api/todos/${id}`, obj);
}


async function addNewTodo(todo) {
    return await axios.post("http://localhost:8000/api/todos/", todo);
}

//Posts call
async function deletePost(id) {
    return await axios.delete(`http://localhost:8000/api/posts/${id}`);
}

async function addNewPost(post) {
    return await axios.post("http://localhost:8000/api/posts/", post);
}

async function getPosts() {
    return await axios.get("http://localhost:8000/api/posts");
}

export default { getUsers, getTodos, getPosts, updateUser, deleteUser, deleteTodo, deletePost, updateTodo, addNewTodo, addNewUser, addNewPost }
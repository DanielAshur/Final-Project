const todosReducer = (state = { todos: [] }, action) => {
    switch (action.type) {

        case 'GET_ALL_TODOS':
            return { ...state, todos: action.payload }

        case 'ADD_TODO':
            let currentTodos = state.todos;
            currentTodos.push(action.payload)
            return { ...state, todos: currentTodos }

        case 'UPDATE_TODO':
            let allTodos = state.todos;
            let todosFilter = allTodos.filter(x => x._id === action.payload._id)
            let todosIndex = allTodos.findIndex(x => x._id === action.payload._id);
            todosFilter[0] = action.payload
            if (todosFilter[0].completed === true) {
                allTodos[todosIndex] = todosFilter[0]
            }
            return { ...state, todos: allTodos }

        case 'DELETE_TODO':
            let filterTodos = state.todos.filter(todo => todo.userId !== action.payload)
            return { ...state, todos: filterTodos }

        default:
            return state
    }
}
export default todosReducer
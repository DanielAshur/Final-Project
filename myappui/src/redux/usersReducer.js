const usersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return { ...state, users: action.payload }

        case 'ADD':
            let currentUsers = state.users;
            currentUsers.push(action.payload)
            return { ...state, users: currentUsers }

        case 'UPDATE':
            let updateUsers = state.users;
            let usersFilter = updateUsers.filter(x => x._id === action.payload)
            let usersIndex = updateUsers.findIndex(x => x._id === action.payload);
            if(usersFilter.length > 0) {
                updateUsers[usersIndex] = usersFilter[0]
            }

            return { ...state, todos: updateUsers }

        case 'DELETE':
            let deletedUsers = state.users;
            let index = deletedUsers.findIndex(x => x._id === action.payload)
            if (index > -1) {
               deletedUsers.splice(index, 1)
            }
            return { ...state, users:  deletedUsers }

        default:
            return state
    }
}
export default usersReducer
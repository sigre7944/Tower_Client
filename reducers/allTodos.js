export const allTodos = (state= [], action) => {
    switch (action.type) {
        case 'ADD_ALL_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    completed: false
                }
            ]

        case 'TOGGLE_ALL_TODO':
            return state.map(todo => {
                todo.id === action.id ? {...todo, completed: !todo.completed} : todo
            })
        default:
            return state
    }
}

export const addTodoToAll = title => ({
    type: 'ADD_ALL_TODO',
    id: ('allTodo-' + new Date().getTime()),
    title
})

export const toggleAllTodo = id => ({
    type: 'TOGGLE_ALL_TODO',
    id
})


export const updateTask = (type, keyPath, notSetValue, updater) => ({
  type,
  keyPath,
  notSetValue,
  updater
});

export const returnNewTasks = (type, data) => ({
  type,
  data
});

export const deleteTask = (type, id) => ({
  type,
  id
});

export const deleteKeyPathTask = (type, keyPath) => ({
  type,
  keyPath
});

export const deleteAllTasksInCategory = (type, category_id) => ({
  type,
  id: category_id
});

export const returnNewCompletedTask = (type, data) => ({
  type,
  data
});

export const resetTasks = type => ({
  type
});

export const resetNewTask = type => ({
  type
});

export const updateEditTaskId = data => ({
  type: "UPDATE_EDIT_TASK_ID",
  data
});

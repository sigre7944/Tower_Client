import { fromJS, isKeyed, OrderedMap } from "immutable";

// let test_obj = {};

// for (let i = 0; i < 100; i++) {
//   test_obj[`cate_${i + 1}`] = {
//     id: `cate_${i + 1}`,
//     name: `cate_${i + 1}`,
//     color: "#F78096",
//     quantity: 0
//   };
// }

// let test_state = fromJS(test_obj, (key, value, path) => {
//   return isKeyed(value) ? value.toOrderedMap() : value.toList();
// });

let initialState = fromJS(
  {
    cate_0: {
      id: `cate_0`,
      name: "Inbox",
      color: "#F78096",
      quantity: 0,
      plan: "free",
      created_at: Date.now()
    }
  },
  (key, value, path) => {
    return isKeyed(value) ? value.toOrderedMap() : value.toList();
  }
);

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORY":
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "DELETE_CATEGORY":
      return state.delete(action.id);

    case "RETURN_NEW_CATEGORIES":
      return action.data.toOrderedMap();

    case "RESET_CATEGORIES":
      return initialState;

    default:
      return state;
  }
};

export const currentChosenCategory = (state = "cate_0", action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_CHOSEN_CATEGORY":
      return action.data;

    default:
      return state;
  }
};

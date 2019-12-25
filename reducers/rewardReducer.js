import { OrderedMap } from "immutable";

export const balance = (state = 0, action) => {
  switch (action.type) {
    case "DEPOSIT_BALANCE_AMOUNT":
      return state + action.amount;

    case "WITHDRAW_BALANCE_AMOUNT":
      return state - action.amount;

    case "UPDATE_BALANCE_AMOUNT":
      return action.amount;

    default:
      return state;
  }
};

export const rewards = (state = OrderedMap(), action) => {
  switch (action.type) {
    case "UPDATE_KEYPATH_REWARD":
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "DELETE_KEYPATH_REWARD":
      return state.deleteIn(action.keyPath);

    default:
      return state;
  }
};

export const main_reward = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_MAIN_REWARD":
      return action.id;

    default:
      return state;
  }
};

export const purchase_history = (state = OrderedMap(), action) => {
  switch (action.type) {
    case "UPDATE_KEYPATH_PURCHASE_ITEM":
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "DELETE_KEYPATH_PURCHASE_ITEM":
      return state.deleteIn(action.keyPath);

    case "REMOVE_PURCHASE_TIMESTAMP":
      return state.delete(action.timestamp);

    default:
      return state;
  }
};

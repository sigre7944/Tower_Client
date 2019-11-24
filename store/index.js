import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { batchDispatchMiddleware } from 'redux-batched-actions'
import { persistReducer, persistStore } from 'redux-persist'
import { AsyncStorage } from "react-native";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import autoMergeLevel2Immutable from "redux-persist/lib/stateReconciler/autoMergeLevel2-immutable"
import FSStorage  from "redux-persist-expo-fs-storage";
import immutableTransform from "redux-persist-transform-immutable";

import rootReducer from '../reducers'

const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage: FSStorage(),
    // stateReconciler: autoMergeLevel2Immutable,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, compose(
    applyMiddleware(batchDispatchMiddleware, thunk),
))
export const persistor = persistStore(store)
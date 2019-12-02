import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from "redux-saga";
import { batchDispatchMiddleware } from 'redux-batched-actions'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import autoMergeLevel2Immutable from "redux-persist/lib/stateReconciler/autoMergeLevel2-immutable"
import FSStorage from "redux-persist-expo-fs-storage";
import immutableTransform from "redux-persist-transform-immutable";
import rootReducer from '../reducers'
import rootSaga from "../saga";

const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage: FSStorage(),
    // stateReconciler: autoMergeLevel2Immutable,
    blacklist: ["toggleEditMultipleTasks"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleWare = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(batchDispatchMiddleware, thunk, sagaMiddleWare))

sagaMiddleWare.run(rootSaga)

export const persistor = persistStore(store)
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const theStore = createStore(persistedReducer);
const persistor = persistStore(theStore)


ReactDOM.render(
  <Provider store={theStore}>
     <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>,
  document.getElementById('root')
);

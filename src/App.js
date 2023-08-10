// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ItemList from './components/ItemList';

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">CRUD Data Barang</h1>
        <ItemList />
      </div>
    </Provider>
  );
}

export default App;

// itemReducer.js
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../constants/actionTypes';

// src/reducers/itemReducer.js
const initialState = [
  {
    id: 1,
    foto: 'Blue_denim_shirt.jpg',
    nama: 'Blue denim shirt',
    hargaBeli: 100000,
    hargaJual: 150000,
    stok: 10,
  },
  {
    id: 2,
    foto: 'Red_hoodie.jpg',
    nama: 'Red hoodie',
    hargaBeli: 120000,
    hargaJual: 180000,
    stok: 15,
  },
  {
    id: 3,
    foto: 'Red_denim_shirt.jpg',
    nama: 'Red denim shirt',
    hargaBeli: 100000,
    hargaJual: 150000,
    stok: 10,
  },
  {
    id: 4,
    foto: 'Blue_hoodie.jpg',
    nama: 'Blue hoodie',
    hargaBeli: 120000,
    hargaJual: 180000,
    stok: 15,
  },
  {
    id: 5,
    foto: 'Blue_denim_hoodie.jpg',
    nama: 'Blue denim hoodie',
    hargaBeli: 100000,
    hargaJual: 150000,
    stok: 10,
  },
  {
    id: 6,
    foto: 'Red_shirt.jpg',
    nama: 'Red shirt',
    hargaBeli: 120000,
    hargaJual: 180000,
    stok: 15,
  },
  {
    id: 7,
    foto: 'Blue_shirt.jpg',
    nama: 'Blue shirt',
    hargaBeli: 100000,
    hargaJual: 150000,
    stok: 10,
  },
  {
    id: 2,
    foto: 'Red_denim_hoodie.jpg',
    nama: 'Red denim hoodie',
    hargaBeli: 120000,
    hargaJual: 180000,
    stok: 15,
  },
  // ... tambahkan data barang lainnya di sini ...
];

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case UPDATE_ITEM:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload.updatedItem : item
      );
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default itemReducer;

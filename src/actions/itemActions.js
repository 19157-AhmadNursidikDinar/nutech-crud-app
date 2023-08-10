// itemActions.js
import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../constants/actionTypes';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItem = (id, updatedItem) => ({
  type: UPDATE_ITEM,
  payload: { id, updatedItem },
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

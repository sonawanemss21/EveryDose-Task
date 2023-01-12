import React from "react";
import { useReducer } from "react";
import { useState } from "react";

export const inventoryContext = React.createContext({
  inventory: [],
  addItem: () => {},
  removeItem: () => {},
  clearInventory: () => {},
  setData: () => {}
});

let initialState = {
  inventory: [
    // { item: "book", quantity: 1 },
    // { item: "pencil", quantity: 1 },
    // { item: "bag", quantity: 1 },
    // { item: "eraser", quantity: 1 },
  ],
};
const reducerFunction = (state, action) => {
  if (action.type === "Add") {
    let existingItemIndex = state.inventory.findIndex((item) => {
      return item.item === action.item.item;
    });
    const existingItem = state.inventory[existingItemIndex];

    let updatedInventory;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      updatedInventory = [...state.inventory];
      updatedInventory[existingItemIndex] = updatedItem;
    } else {
      updatedInventory = state.inventory.concat(action.item);
      console.log(updatedInventory);
    }

    return {
      inventory: updatedInventory,
    };
  }

  if (action.type === "Remove") {
    console.log(action.item);

    let existingItemIndex = state.inventory.findIndex((item) => {
      return item.item == action.item.item;
    });
    const existingItem = state.inventory[existingItemIndex];

    let updatedInventory = [];
    if (existingItem) {
      updatedInventory = state.inventory.filter(
        (item) => item.item != action.item.item
      );
    }

    return {
      inventory: updatedInventory
    }
  }

  if(action.type = "Clear") {
    return initialState;
  }
};

const InventoryProvider = (props) => {
  const [inventoryState, dispatchInventoryAction] = useReducer(
    reducerFunction,
    initialState
  );

  const addInventoryItemHandler = (item) => {
    dispatchInventoryAction({ type: "Add", item: item });
  };
  const removeInventoryItemHandler = (item) => {
    dispatchInventoryAction({ type: "Remove", item: item });
  };
  const clearInventoryHandler = () => {
    dispatchInventoryAction({ type: "Clear" });
  };
 
  const listContext = {
    inventory: inventoryState.inventory,
    addItem: addInventoryItemHandler,
    removeItem: removeInventoryItemHandler,
    clearInventory: clearInventoryHandler
  };

  return (
    <inventoryContext.Provider value={listContext}>
      {props.children}
    </inventoryContext.Provider>
  );
};

export default InventoryProvider;

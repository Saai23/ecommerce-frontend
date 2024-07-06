import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
    
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        
        return [
          ...state,
          {
            ...action.payload,
            quantity: 1,
          },
        ];
      }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  console.log(state, "context state");

  return (
    <CartContext.Provider
      value={{
        cart: state,
        dispatch,
      }}
    >
      {" "}
      {children}{" "}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

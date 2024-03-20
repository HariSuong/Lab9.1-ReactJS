import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  item: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    // Tìm index của sản phẩm hiện tại
    const existingCartItemIndex = state.item.findIndex(
      item => item.id === action.item.id
    )

    // Lấy sản phẩm đã tồn tại
    const existingCartItem = state.item[existingCartItemIndex]

    // Biến update các items
    let updatedItems

    // Nếu như có sản phầm đã tồn tại
    if (existingCartItem) {
      // Chỉ thay đổi số lượng sản phẩm của item đã có
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }

      // Sao chép tất cả các item trong mảng state cũ vào updateItems
      updatedItems = [...state.item]

      // Update lại vào vị trí đã tồn tại item đó
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.item.concat(action.item)
    }

    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'REMOVE') {
    // Tìm index của sản phẩm hiện tại
    const existingCartItemIndex = state.item.findIndex(
      item => item.id === action.id
    )

    // Lấy sản phẩm đã tồn tại
    const existingItem = state.item[existingCartItemIndex]

    // Update giá
    const updatedTotalAmount = state.totalAmount - existingItem.price

    let updatedItems

    if (existingItem.amount === 1) {
      updatedItems = state.item.filter(item => item.id !== action.id)
    } else {
      // Chỉ thay đổi số lượng sản phẩm của item đã có
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      }

      // Sao chép tất cả các item trong mảng state cũ vào updateItems
      updatedItems = [...state.item]

      // Update lại vào vị trí đã tồn tại item đó
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState
}

const CartProvider = ({ children }) => {
  const [stateCart, dispatchCart] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = item => {
    dispatchCart({
      type: 'ADD',
      item
    })
  }
  const removeItemToCartHandler = id => {
    dispatchCart({
      type: 'REMOVE',
      id
    })
  }
  const cartContext = {
    item: stateCart.item,
    totalAmount: stateCart.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  )
}

export default CartProvider

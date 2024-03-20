import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = ({ onShow }) => {
  const cartCtx = useContext(CartContext)
  const { item } = cartCtx
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      if (item.length === 0) {
        return
      }
      clearTimeout(timer)
    }
  }, [item])

  const numberOfCartItems = cartCtx.item.reduce((curNum, item) => {
    return curNum + item.amount
  }, 0)

  return (
    <button className={btnClasses} onClick={onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton

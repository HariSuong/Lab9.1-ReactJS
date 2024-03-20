import React, { useContext } from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'

const MealItem = ({ name, des, pricePd, id }) => {
  const cartCtx = useContext(CartContext)

  const price = `$${pricePd.toFixed(2)}`

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price: pricePd
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <p className={classes.description}>{des}</p>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem

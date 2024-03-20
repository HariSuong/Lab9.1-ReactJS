import { useContext } from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem/CartItem'

const Cart = ({ onHide }) => {
  const cartCtx = useContext(CartContext)

  const hasItem = cartCtx.item.length > 0

  const removepriceTotal = id => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.item.map(item => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removepriceTotal.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  const priceTotal = `$${cartCtx.totalAmount.toFixed(2)}`

  return (
    <Modal onHide={onHide}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{priceTotal}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onHide}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart

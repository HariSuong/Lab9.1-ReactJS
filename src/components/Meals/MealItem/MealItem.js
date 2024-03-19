import React from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MealItem = ({ name, des, pricePd, id }) => {
  const price = `$${pricePd.toFixed(2)}`

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <p className={classes.description}>{des}</p>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  )
}

export default MealItem

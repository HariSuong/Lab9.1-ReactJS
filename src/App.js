import { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import CartProvider from './store/CartProvider'

function App() {
  const [isShownCart, setIsShownCart] = useState(false)
  const showCartHandle = () => {
    setIsShownCart(true)
  }

  const hideCartHandle = () => {
    setIsShownCart(false)
  }

  return (
    <CartProvider>
      {isShownCart && <Cart onHide={hideCartHandle} />}
      <Header onShow={showCartHandle} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App

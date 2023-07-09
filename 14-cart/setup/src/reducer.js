const reducer = (state, action) => {
  if (action.type === 'CLEAR') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE') {
    let tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === 'INCREASE') {
            return { ...item, amount: item.amount + 1 }
          }
          if (action.payload.type === 'DECREASE') {
            return { ...item, amount: item.amount - 1 }
          }
        }
        return item
      })
      .filter((item) => item.amount !== 0)
    return { ...state, cart: tempCart }
  }
  if (action.type === 'AMOUNT_TOTAL') {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = amount * price

        cartTotal.amount += amount
        cartTotal.total += itemTotal

        return cartTotal
      },
      {
        amount: 0,
        total: 0,
      }
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, amount, total }
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'DISPLAY') {
    return { ...state, cart: action.payload, loading: false }
  }
  return state
}

export default reducer

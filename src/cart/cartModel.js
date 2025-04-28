let cartModel = [
  {
    id: 1,
    productID: 1,
    userID: 2,
    quantity: 3,
  },
];

export default cartModel;

export function findUser(id) {
  return cartModel.filter((data) => data.userID == id);
}

export function DeleteItem(cartId, userId) {
  let cartModelIndex = cartModel.findIndex((data) => {
    return data.id != cartId && data.userID != userId;
  });

  if (cartModelIndex == -1) {
    return "Item not found";
  } else {
    cartModel.splice(cartModelIndex, 1);
  }
}

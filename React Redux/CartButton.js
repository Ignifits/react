import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slices';
import classes from './CartButton.module.css';
import cartSlices from '../../store/cart-slices';
import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const total    = useSelector(state => state.cart.totalQuantity)

  const toggleCartHandler = () =>{
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;

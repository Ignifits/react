import { uiActions } from "./ui-slices";
import { cartActions } from "./cart-slices";

export const fetchCartData = () =>{
    return async dispatch =>{
        const fetchData = async () => {
            const response = await fetch('https://react-proyect-eee9b-default-rtdb.firebaseio.com/cart.json', {
                method: 'GET'});
            
            if (!response.ok ){
                throw new Error('Sending cart data failed')
            }
            
            const responseData = await response.json();
            return responseData;
        }


        try{
            let data = await fetchData()
            console.log(1);
            data.items.forEach(element => {
                dispatch(cartActions.addItems(element))
            });

            dispatch(uiActions.showNotification({
                status:'success',
                title: 'Success!',
                message:'Get cart data successfully'
            }));
        }catch(e){
            dispatch(uiActions.showNotification({
                status:'error',
                title: 'Error!',
                message: e.message
              }));
        }

    }
}

export const sendCartData = (cartData) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status:'pending',
            title: 'Sending...',
            message:'Sending cart data!'
          }));
    
          const fetchData = async () => {

            const response = await fetch('https://react-proyect-eee9b-default-rtdb.firebaseio.com/cart.json', {
              method: 'PUT',
              body: JSON.stringify(cartData),
            })
    
            if (!response.ok ){
              throw new Error('Sending cart data failed')
            }
      
            const responseData = await response.json();
            return responseData;
          }

        try{
            await fetchData()

            dispatch(uiActions.showNotification({
                status:'success',
                title: 'Success!',
                message:'Sent cart data successfully'
            }));
        }catch(e){
            dispatch(uiActions.showNotification({
                status:'error',
                title: 'Error!',
                message: e.message
              }));
        }

    }
}
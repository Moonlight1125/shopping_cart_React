import React, { useContext } from 'react'
import Header from './Header'
import Assortment from './Assortment'
import { itemContext } from './Context'

// What is Children https://choippo.com/react-component-children/

const Origin = () => {
  const mycontext = useContext(itemContext);
  const itemData = mycontext.data;
  const total = mycontext.total;
  const clear = mycontext.clearCart;
  const condition = mycontext.condition;

  return (
    <div>
      <Header />
      <div className={"yourBag"}>
        <h1>YOUR BAG</h1>
      </div>
      {condition &&
        <div>
          <div className={"AssortmentContainer"}>
            {itemData?.map((item, index) =>
              <div key={index} className={"AssortmentOutline"}>
                <Assortment item={item} />
              </div>
            )}
          </div>
          <div className={"accounting"}>
            <div className={"accountingInfo"}>
              <p>Total</p>
              <span>${total}</span>
            </div>
          </div>
          <div className={"clearBtnContainer"}>
            <button onClick={clear} className={"clearBtn"}>CLEAR CART</button>
          </div>
        </div>
      }
      {condition ||
        <div className={"alert"}>is currently empty</div>
      }
    </div>
  )
}

export default Origin

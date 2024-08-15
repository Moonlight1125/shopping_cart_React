import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

export const itemContext = createContext();

export const Context = ({children})=>{
  const ItemData = [
    {
      id: 1,
      title: 'Samsung Galaxy S7',
      price: 100,
      img: 'https://online.aniplex.co.jp/on/demandware.static/-/Sites-all-master-catalog/ja_JP/dw613aa2b0/items/items4000/4688/contents/16519.jpg',
      amount: 1,
    },
    {
      id: 2,
      title: 'google pixel ',
      price: 100,
      img: 'https://online.aniplex.co.jp/on/demandware.static/-/Sites-all-master-catalog/ja_JP/dw36dfb44d/items/items3000/3324/contents/11527_re.jpg',
      amount: 1,
    },
    {
      id: 3,
      title: 'Xiaomi Redmi Note 2',
      price: 100,
      img: 'https://online.aniplex.co.jp/on/demandware.static/-/Sites-all-master-catalog/ja_JP/dw3f6a428b/items/title-H/fgo/seiko-muramasa/8_600.jpg',
      amount: 1,
    }
];
  const [amount,setAmount] = useState(0);
  const [total,setTotal] = useState(0);
  const [data,setData] = useState([]);
  const [condition,setCondition] = useState(true);

  let intitialData = {
    initialValue:0,
    total:0,
    amount:0,
  }

  const handleData = (currentNum,id)=>{
    const dataDummy = [...data];
    let newData = dataDummy.map(cartItem=>{
      if(cartItem.id===id){
        return {...cartItem,
               amount:cartItem.amount+currentNum,
              }
      }
      return cartItem
    })
    console.log(newData)
    setData(newData)
    updateTotals(newData);
  }
  
    useEffect(()=>{
      setData(ItemData);
      ItemData.map((itm)=>{
        setTotal(prev=>prev+itm.price)
        setAmount(prev=>prev+itm.amount)
      })
    },[])

    const handleDelete = (id)=>{
      const newArray = data.filter(itm=>{
       return id!==itm.id
      })
      if(newArray.length===0)setCondition(false)
      setData(newArray);
      updateTotals(newArray);
    }

    const updateTotals = (newData)=>{
      let amountData = newData.map(elm=>elm.amount);
      let totalAmount = amountData.reduce((prev,current)=>prev+current,intitialData.initialValue);
      setAmount(totalAmount)
      let priceData = newData.map(elm=>elm.price*elm.amount);
      let totalPrice = priceData.reduce((prev,current)=>prev+current,intitialData.initialValue);
      setTotal(totalPrice)
    }
    const clearCart = ()=>{
      setAmount(0);
      setData([]);
      setTotal(0)
      setCondition(!condition)
    }
    return(
        <itemContext.Provider value={
          {data,
          handleData,
          amount,
          handleDelete,
          total,
          clearCart,
          condition,
          }}>
            {children}
        </itemContext.Provider>
    )
}



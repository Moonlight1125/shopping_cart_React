import React, { useContext,useEffect,useReducer, useRef, useState } from 'react'
import { GoChevronUp } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import { itemContext} from './Context'

const Assortment = (datas) => {
    const mycontext = useContext(itemContext);
    const handleAmount = mycontext.handleData;
    const handleRemove = mycontext.handleDelete;
    const {id,title,price,img,amount} = datas.item;
    const [outlineV1,setOutlineV1] = useState(false);
    const [outlineV2,setOutlineV2] = useState(false);
    const refBtnV1 = useRef(null);
    const refBtnV2 = useRef(null);

    const toggleOutlineV1 = ()=>{
        setOutlineV1(true);
        document.body.addEventListener("click",checkV1)
      }
      const toggleOutlineV2 = ()=>{
        setOutlineV2(true);
        document.body.addEventListener("click",checkV2)
      }
      const checkV1 = (e)=>{
        if(!refBtnV1.current.contains(e.target)){
            setOutlineV1(false);
            document.body.removeEventListener("click",checkV1);
        }
      }
      const checkV2 = (e)=>{
        try{
            if(!refBtnV2?.current.contains(e.target)){
                setOutlineV2(false);
                document.body.removeEventListener("click",checkV2);
            }
        }catch{
            return null
        }
      }
    
    const reducer = (state,action)=>{
        switch(action.type){
            case 'increment':
                handleAmount(+1,id);
                return state+1;
            case 'decrement':
                handleAmount(-1,id);
                return state-1;
            default:
                return state;
        }
    }

    const [state,dispatch] = useReducer(reducer,0);

    useEffect(()=>{
        setOutlineV2(false)
    },[id])//idが再代入でレンダリングをジャッジする
           //datasは毎回レンダリングするたびに変化するから1以上のときに
           //decボタンを押すとfalseになってしまう

    const handleDecrement = ()=>{
        if(state<=0){
            handleRemove(id)
        }else{
            dispatch({type:"decrement"})
        }
    }
    const handleRemoveBtn = ()=>{
        handleRemove(id);
    }

  return (
    <div className={"Assortment"}>
        <img src={img} alt={img} />
        <div className={"details"}>
            <article>
                <dl>
                    <dt>{title}</dt>
                    <dd>${price}</dd>
                </dl>
                <button onClick={handleRemoveBtn}>remove</button>
            </article>
            <div className={"countup"}>
                <div ref={refBtnV1} onClick={toggleOutlineV1} className={outlineV1?"active ICON":"ICON"}>
                    <GoChevronUp className={"realcon"} onClick={()=>{dispatch({type:"increment"})}}/>
                </div>
                <span>{amount}</span>
                <div ref={refBtnV2} onClick={toggleOutlineV2} className={outlineV2?"active ICON":"ICON"}>
                    <GoChevronDown className={"realcon"} onClick={handleDecrement}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Assortment

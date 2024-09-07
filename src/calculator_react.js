import React from "react";
import { useState,useEffect,useRef } from "react";
export default function Calculator(){
    const [resultat,setResultat]=useState("");
    const [numberOne,setNumberOne]=useState();
    const [numberTwo,setNumberTwo]=useState();
    const [number1,setNumber1]=useState([]);
    const [symbol,setSymbol]=useState([]);
    const [number2,setNumber2]=useState([]);
    const [numbers,setNumbers]=useState(document.getElementsByClassName("numbers"));
    const removeNumber1ListenerRef = useRef(null);
  
  
    useEffect(()=>{
      for(let n=0;n<numbers.length;n++){
        numbers[n].addEventListener("click",number1_event)
      }
      function removeNumber1Listener(){
        for (let n = 0; n < numbers.length; n++) {
          numbers[n].removeEventListener('click', number1_event);
        }}
      removeNumber1ListenerRef.current = removeNumber1Listener;
      
    },[])
    
    function number1_event(event){
      const numberOneValue=event.target;
      number1.push(numberOneValue.textContent)
      setResultat(number1.join(""))
    }
  
    function symbol_event(event){
      const symbolValue=event.target;
      if(symbol.length>=1){
        setNumber1([calcul_resultat()])
        symbol.splice(0,symbol.length)
        symbol.push(symbolValue.textContent)
        number2.splice(0,number2.length)
        console.log(number1.join("")+"1 "+number2+"2  "+calcul_resultat()+"3 "+symbol.join(""))
      }else{
        symbol.push(symbolValue.textContent)
        removeNumber1ListenerRef.current()
        for(let n=0;n<numbers.length;n++){
          numbers[n].addEventListener("click",number2_event)
        }
      }
      setResultat(symbol.join(""));
    }
  
    function number2_event(event){
      const numberTwoValue=event.target;
      number2.push(numberTwoValue.textContent)
      
      setResultat(number2.join(""));
    }
  
    function calcul_resultat(){
      if(symbol[0]=="+"){
        return parseFloat(number1.join(""))+parseFloat(number2.join(""))
      }else if(symbol[0]=="-"){
        return parseFloat(number1.join(""))-parseFloat(number2.join(""))
      }    if(symbol[0]=="X"){
        return parseFloat(number1.join(""))*parseFloat(number2.join(""))
      }else if(symbol[0]=="/"){
        return parseFloat(number1.join(""))/parseFloat(number2.join(""))
      }
    }
  
    function show_resultat(event){
      console.log(number1.join("") +"  n2 "+number2.join(""))
      if(isNaN(calcul_resultat())){
        setResultat("tape only numbers")
      }else{
        setResultat(calcul_resultat)
      }
      console.log(calcul_resultat())
    }
  
    function clear_all(){
      /**number1.splice(0,number1.length+1)
      number2.splice(0,number2.length+1)
      symbol.splice(0,symbol.length+1)
      console.log(number1+" "+number2+" "+symbol)
      for(let n=0;n<numbers.length;n++){
        numbers[n].removeEventListener("click",number2_event)
      }
      for(let n=0;n<numbers.length;n++){
        numbers[n].addEventListener("click",number1_event)}**/
        window.location.reload()
    
    }
    function change_color(color){
      let calculator=document.getElementById("App");
      let resultat=document.getElementById("resultat");
      let buttons = document.querySelectorAll(".numbers")
      if(color=="black"){
        resultat.style.backgroundColor="white"
        resultat.style.color="black"
      }
      calculator.style.backgroundColor=color
    }
  
    return (
      <div className="App" id="App">
        <div className='resultat' id="resultat">{resultat}</div>
        <div className='content'>
        <div className='row'>
          <div className='col-sm-3 col'><button className='btn' onClick={(event)=>{return symbol_event(event)}}>+</button></div>
          <div className='col-sm-3 col'><button className='btn' onClick={(event)=>{return symbol_event(event)}}>-</button></div>
          <div className='col-sm-3 col'><button className='btn' onClick={(event)=>{return symbol_event(event)}}>X</button></div>
          <div className='col-sm-3 col'><button className='btn' onClick={(event)=>{return symbol_event(event)}}>/</button></div>
        </div>
        <div className='row'>
        <div className='col-sm-3 col'><button className='btn numbers'  >1</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >2</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >3</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >4</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >5</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >6</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >7</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >8</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >9</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >0</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'  >10</button></div>
        <div className='col-sm-3 col'><button className='btn numbers'>.</button></div>
        <div className='col-sm-6 col'><button className='btn' onClick={()=>{return clear_all()}}>C</button></div>
        <div className='col-sm-6 col'><button className='btn' onClick={(event)=>{return show_resultat(event)}}>=</button></div>
        </div>
        </div>
        <div className="colorContainer">
          <div className="green" onClick={()=>{return change_color("rgb(41, 160, 112)")}}><span>Green</span></div>
          <div className="red" onClick={()=>{return change_color("red")}}><span>Red</span></div>
          <div className="yellow" onClick={()=>{return change_color("yellow")}}><span>Yellow</span></div>
          <div className="black" onClick={()=>{return change_color("black")}}><span>Black</span></div>
          <div className="blue" onClick={()=>{return change_color("blue")}}><span>Blue</span></div>
        </div>
      </div>
    );
  
}
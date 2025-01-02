import { useState } from 'react';
import './App.css';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App(){
  const [oldFriend,setOldFriend]=useState(initialFriends)
  const [selectedFriend,setSelectedFriend]=useState(null);
  const [showAddFriend,setShowAddFriend]=useState(false);

  // console.log(oldFriend);
  function handleSelectedFriend(friend){
      // console.log(friend);
      setSelectedFriend(fri=>fri?.id===friend.id?null:friend)  
      setShowAddFriend(false)
  }
  
  function handShowAddFriend(){
//  console.log('only english');
    setShowAddFriend(showAddFriend=>!showAddFriend)
  }
  function handNewFriend(newfiend){
    //  console.log(newfiend);
   setOldFriend(fri=>[...fri,newfiend])
   setShowAddFriend(false);   
  }

  return<div className="app">
    <div className='sidebar'>
    <FriendList selectedFriend={selectedFriend} ints={oldFriend} onSelection={handleSelectedFriend}/>
    {showAddFriend&&<FormAddFriend onNewFriend={handNewFriend}/>}
    <Button onClick={handShowAddFriend}>{showAddFriend?'close':'Add Friend'}</Button>
    </div>
    {selectedFriend &&<FormSplitBill selectedFriend={selectedFriend}/>}
  
  </div>
}
function FriendList({ints,onSelection,selectedFriend}){
  const friends=ints;
  return <ul>{friends.map((friend)=><Friend selectedFriend={selectedFriend} key={friend.id} friend={friend} onSelection={onSelection}/>
    
)}</ul>
}

function Friend({friend,onSelection,selectedFriend}){
  const isSelected=selectedFriend?.id===friend.id;
     return <li className={isSelected?'selected':''}>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance<0 && (<p className='red'>You owe {friend.name} {Math.abs(friend.balance)} </p>)}
      {friend.balance===0 && (<p >You and {friend.name} are even</p>)}
      {friend.balance>0 && (<p className='green'> {friend.name} owes you {Math.abs(friend.balance)} </p>)}
       <Button onClick={()=>onSelection(friend)}>{isSelected?'Close':'Select'}</Button>
     </li>
}

function Button({children, onClick}){
  return  <button 
  onClick={ onClick}
  className='button'>{children}</button>
}

function FormAddFriend({ onNewFriend}){
  const [name,setname]=useState('');
  const [image,setImage]=useState('https://i.pravatar.cc/48?u=')

 function handleAddFriend(e){
  e.preventDefault();
  if(!name || !image) return;
//  console.log('okkk');
 let id=Date.now()
const newFri={
  name,
  image:`https://i.pravatar.cc/48?u=${id}`
  ,balance:0,
  id
}

onNewFriend(newFri)
setname('')
setImage('https://i.pravatar.cc/48?u=')

 
 }
  return <form className='form-add-friend' onSubmit={handleAddFriend}>
    <lable>Friend Name</lable>
    <input type='text' value={name} onChange={e=>setname(e.target.value)}/>
    <lable>Image Url</lable>
    <input type='text' value={image} onChange={e=>setImage(e.target.value)}/>
    <Button onClick={handleAddFriend}>Add</Button>
  </form>
}

function FormSplitBill({selectedFriend}){
  const [bill,setBill]=useState('');
  const [paidByUser,setPaidByUser]=useState('');
  const [whoisPaying,setWhoisPaying]=useState('User')
  const paidbyFriend=bill?bill-paidByUser:'';
  
  return <form className='form-split-bill'>
    <h2>Split a bill with {selectedFriend.name}</h2>
    <label>💰Bill value</label>
    <input type='text' value={bill} onChange={(e)=>(setBill(1*e.target.value))}/>
    <label>🧍‍♂️Your expance</label>
    <input type='text' value={paidByUser} onChange={(e)=>(setPaidByUser((1*e.target.value)>bill?paidByUser:1*e.target.value))}/>

    <label>🧑‍🤝‍🧑{selectedFriend.name}'s expence</label>
    <input type='text' disabled value={paidbyFriend}/>

    <label>🤑Who is Paying the bill</label>
    <select value={whoisPaying} onChange={(e)=>(setWhoisPaying(e.target.value))}>
      <option value='user'>You</option>
      <option value='friend'>{selectedFriend.name}'s</option>
    </select>
    <Button>Split Bill</Button>
  </form>
}
import { useState } from 'react'

export default function Player({ name, symbol, isActive }) {
  const [currEditable, setNewEditable] = useState(false) // State variable to track whether the player's name is currently editable or not
  const [initName, setInitName] = useState(name) // State variable to hold the current name of the player, initialized with the value of the 'name' prop

  let playerName = <span className="player-name">{ initName }</span>
  let btnCaption = 'Edit';

  function handleEdit() {
    // setNewEditable(!currEditable) // React does not guarantee that the state update is applied immediately, so using the previous state value directly can lead to unexpected results. Instead, you can use the functional form of setState to ensure that you are working with the most up-to-date state value.
    setNewEditable((editable) => !editable);
  }

  function setChange(event) {
    setInitName(event.target.value)
  }

  if(currEditable){
    playerName = <input type="text" defaultValue={name} required value={ initName } onChange={setChange}/>
    
    btnCaption='Save';
  }



  return(
        <li className={isActive ? 'active' : undefined}>
        <span className='player'>
          { playerName }
          <span className="player-symbol">{ symbol }</span>
        </span>
          <button onClick={handleEdit}>{ btnCaption }</button>
        </li>
  );
}
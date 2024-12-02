import { useState, useCallback, useEffect, useRef } from 'react'
function App() {
  const [length, setLength] = useState(9)
  const [numberAlolowed , setNumberAllowed]= useState(false)
  const [characterAlolowed , setCharacterAlolowed]= useState(false)
  const [password , setPassword]= useState('')

  // useRef Hook is testing

  const passRef = useRef(null)

  // useCallback hook  for password generator
  const passwordGenerator=useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTWXYDabcdefghijklmnopqrstwxyd'

    if(numberAlolowed) str +="0123456789"
    if(characterAlolowed) str +="!@#$%"

    for(let i=1; i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass +=str.charAt(char)

    }
    setPassword(pass)

  },[length,numberAlolowed,characterAlolowed,setPassword])


 // useCallback hook  for copy password
  const copyPasswordToClip=useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,25)
    window.navigator.clipboard.writeText(password)

  },[password])


  // use Hook
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAlolowed,characterAlolowed,passwordGenerator])


  return (
    <>
<div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-6 my-8 text-orange-500 bg-gray-800">
  <h1 className="text-white text-center text-2xl font-semibold my-4">Password Generator</h1>
  <div className="shadow-md rounded-lg overflow-hidden mb-4 flex items-center">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-2 px-4 bg-gray-700 text-white placeholder-gray-400 rounded-md"
      placeholder="Your password"
      readOnly
      ref={passRef}
    />
    <button onClick={copyPasswordToClip} className='ml-2 outline-none bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
      Copy
    </button>
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" min={6} max={25} value={length} className="cursor-pointer" onChange={(e) =>{setLength(e.target.value)}}/>
      <label> Length:{length}</label>

    </div>

    <div className="flex items-center gap-x-1">
      <input type="checkbox" dafultChecked={numberAlolowed} id="numberInput" onChange={()=>{
        setNumberAllowed((pre) =>! pre);}}/>
         <label htmlFor='numberInput'> Numbers</label>

    </div>


    <div className="flex items-center gap-x-1">
      <input type="checkbox" dafultChecked={characterAlolowed} id="characterInput" onChange={()=>{
        setCharacterAlolowed((pre) =>! pre);}}/>
         <label htmlFor='characterInput'> Characters</label>

    </div>

  </div>
</div>



    </>
  )
}

export default App

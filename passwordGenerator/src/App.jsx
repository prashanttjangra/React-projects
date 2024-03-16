import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null); // useRef hook

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvzxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%&-+~.";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); // extracting the character from the index value returned by the char fn
    }
    setPassword(pass);
  }, [length, number, character, setPassword])

  const copy = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 font-bold bg-gray-500'>
        <h1 className='text-xl text-white text-center my-4'>Password Generator</h1>
        <div className='relative flex-shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passRef}
          />
          <button
            onClick={copy}
            className='absolute top-0 right-0 outline-none bg-blue-700 text-white px-3 py-1 shrink-0'>copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={14}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-black font-medium'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberinput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberinput" className='text-black font-medium'>Numbers?</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={character}
              id="charinput"
              onChange={() => {
                setCharacter  ((prev) => !prev);
              }}
            />
            <label htmlFor="charinput" className='text-black font-medium'>Characters?</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

import { useState } from "react";
import { Link } from "react-router-dom";

export default function PassWordGenerator() {
  const [letters, setLetters] = useState(0);
  const [symbols, setSymbols] = useState(0);
  const [numbers, setNumbers] = useState(0);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGeneratePassword = () => {
    const allLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allSymbols = "!@#$%^&*()_+";
    const allNumbers = "0123456789";

    let generatedPassword = "";
    const options = [];

    for (let i = 0; i < letters; i++) {
      options.push(allLetters[Math.floor(Math.random() * allLetters.length)]);
    }

    for (let i = 0; i < symbols; i++) {
      options.push(allSymbols[Math.floor(Math.random() * allSymbols.length)]);
    }

    for (let i = 0; i < numbers; i++) {
      options.push(allNumbers[Math.floor(Math.random() * allNumbers.length)]);
    }

    while (options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      generatedPassword += options.splice(randomIndex, 1);
    }

    setPassword(generatedPassword);
    setCopySuccess(false); // Reset copy success state
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopySuccess(true);
  };

  return (
    <div className="">
      <div className="grid place-content-end p-2">
        <Link to={'/'} className="rounded-md p-2 bg-slate-100 hover:bg-slate-300 active:bg-slate-400 w-10">
          <img src="/home-icon-silhouette-svgrepo-com.svg" alt="home-icon" className="" />
        </Link>
      </div>
      <div className="mx-auto p-5 bg-gray-800 rounded-lg shadow-lg shadow-black text-white">
        <h1 className="text-2xl font-bold text-center mb-5">
          Password Generator
        </h1>

        <div className="mb-4">
          <label htmlFor="letters" className="block text-sm font-medium">
            How many Letters? {letters}
          </label>
          <input
            type="range"
            id="letters"
            min="0"
            max="50"
            value={letters}
            onChange={(e) => setLetters(Number(e.target.value))}
            className="w-full mt-2"
          />
          <input
            type="number"
            id="lettersInput"
            min="0"
            max="50"
            value={letters}
            onChange={(e) => setLetters(Number(e.target.value))}
            className="w-full mt-2 p-2 bg-gray-700 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="symbols" className="block text-sm font-medium">
            How many Symbols? {symbols}
          </label>
          <input
            type="range"
            id="symbols"
            min="0"
            max="50"
            value={symbols}
            onChange={(e) => setSymbols(Number(e.target.value))}
            className="w-full mt-2"
          />
          <input
            type="number"
            id="symbolsInput"
            min="0"
            max="50"
            value={symbols}
            onChange={(e) => setSymbols(Number(e.target.value))}
            className="w-full mt-2 p-2 bg-gray-700 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numbers" className="block text-sm font-medium">
            How many Numbers? {numbers}
          </label>
          <input
            type="range"
            id="numbers"
            min="0"
            max="50"
            value={numbers}
            onChange={(e) => setNumbers(Number(e.target.value))}
            className="w-full mt-2"
          />
          <input
            type="number"
            id="numbersInput"
            min="0"
            max="50"
            value={numbers}
            onChange={(e) => setNumbers(Number(e.target.value))}
            className="w-full mt-2 p-2 bg-gray-700 rounded"
          />
        </div>

        <button
          onClick={handleGeneratePassword}
          className="w-full py-2 mt-4 bg-orange-400 hover:bg-orange-600 active:bg-orange-800 text-white font-medium rounded-md"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-5">
            <h2 className="text-xl font-bold">Generated Password:</h2>
            <div className="flex items-center justify-between mt-2 bg-white p-2 rounded">
              <span className="text-center line-clamp-1 text-black w-28">{password}</span>
              <button
                onClick={handleCopyToClipboard}
                className="py-1 px-2 rounded ml-2"
              >
                <img src="/copy-svgrepo-com.svg" alt="copy-icon" className="w-6" />
              </button>
            </div>
            {copySuccess && (
              <p className="mt-2 text-green-400 text-sm">
                Password copied to clipboard!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import './App.css';
import fetchSynonyms from './api/apiService'
import { useState } from 'react';

function App() {
  const [errorMessage, setErrorMessage] = useState(false)
  const [word, setWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);

  const handleSynonymsClick = async () => {
    const allSynonyms = await fetchSynonyms(word)
    setSynonyms(allSynonyms);
    setErrorMessage(allSynonyms.length === 0);
  }

  const handleUpdateSynonymsClick = async (newWord) => {
    setWord(newWord)
    const allSynonyms = await fetchSynonyms(newWord);

    setSynonyms(allSynonyms);
    setErrorMessage(allSynonyms.length === 0);
  }

  return (
    <>
      <div className='App'>
        <label htmlFor='synonymsInput'>Enter a Word To Get it's Synonyms</label>
        <input
          type='text'
          id='synonymsInput'
          value={word}
          onChange={(e) => setWord(e.target.value)}
        ></input>
        <button disabled={word.length === 0} onClick={handleSynonymsClick}>Get Synonyms</button>
        {
          synonyms.length ?
            <table>
              <thead>
                <tr>
                  <th>Synonyms</th>
                </tr>
              </thead>
              <tbody>
                {synonyms.map((synonym) => <tr key={synonym.word}><td onClick={(e) => handleUpdateSynonymsClick(e.target.innerText)}>{synonym.word}</td></tr>)}
              </tbody>
            </table>
            : null
        }
        {errorMessage ? <p>Sorry, No Synonyms found for this word! Please try another word.</p> : null}
      </div>
    </>
  );
}

export default App;

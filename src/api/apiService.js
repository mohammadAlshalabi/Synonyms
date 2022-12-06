const DATA_MUSE_API = 'https://api.datamuse.com/words?rel_syn=';

const fetchSynonyms = (word) => {
  return fetch(`${DATA_MUSE_API}${word.replace(' ', '_')}`)
    .then(res => res.json())
    .then(data => data)
    .catch((error) => console.log(error));
};

export default fetchSynonyms;

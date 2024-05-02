import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1); // 初期値は1
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = "https://narutodb.xyz/api/character";

    const result = await axios.get(apiUrl, { params: { page: page }}); // データが帰ってくるのを待ってresultに代入
    setCharacters(result.data.characters); // データをセット
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage); // 現在のステートを更新
  };

  return (
    <div className="container">
      <main>
        <div className='cards-container'>
          {characters.map((character) => { // foreach文のようなものでキャラクターをそれぞれ表示
            return <div className="card" key={character.id}>
              <img 
                src={character.images[0] != null ? character.images[0] : 'dummy.png'} // 三項演算子で画像がない場合はダミー画像を表示
                alt="character" 
                className="card-image" 
              />
              <div class="card-content">
                <h3 className="card-title">
                  {character.name}
                </h3>
                <p className="card-description">
                  {character.debut != null ? character.debut.appearsIn : 'Unknown'}
                </p>
                <div className="card-footer">
                  <span className="affiliation">
                    {character.personal?.affiliation ?? 'Unknown'}
                  </span>
                </div>
              </div>
            </div>;
          })}
        </div>
        <div className="pager">
          <button className="prev">Previous</button>
          <span className="page-number">{page}</span>
          <button className="next" onClick={handleNext}>Next</button>
        </div>
      </main>
    </div>
  );
}

export default App;

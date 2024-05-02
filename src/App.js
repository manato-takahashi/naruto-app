import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1); // 初期値は1
  const [isLoading, setIsLoading] = useState(false);

  // 初回のみ実行される、ひとまず1ページ目のキャラクターを取得する
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = "https://narutodb.xyz/api/character";
    setIsLoading(true); // ローディング中はtrue
    const result = await axios.get(apiUrl, { params: { page: page }}); // データが帰ってくるのを待ってresultに代入
    setCharacters(result.data.characters); // データをセット
    setIsLoading(false); // ローディングが終わったらfalse
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage); // 現在のステートを更新
  };

  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage); // 現在のステートを更新
  };

  return (
    <div className="container">
      {/* ロード中かどうかで表示する内容を変える：ロード中はロードマーク、ロード完了後は通常表示 */}
      {isLoading ? (
        <div>Now Loading...</div>
      ) : (
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
            <button className="prev" onClick={handlePrev}>Previous</button>
            <span className="page-number">{page}</span>
            <button className="next" onClick={handleNext}>Next</button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;

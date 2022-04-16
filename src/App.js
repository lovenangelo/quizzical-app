import React from 'react';
import Intro from "./components/Intro";
import Questions from "./components/Items";

function App() {
  const [showIntro, setShowIntro] = React.useState(true);

  const [items, setItems] = React.useState([]);
  const [isFetched, setIsFetched] = React.useState(false)

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      const data = await res.json()
      setItems(data.results)
      setIsFetched(true)
    }
    if (!isFetched)
      fetchData()
  }, [isFetched])

  function handleShowIntro() {
    setShowIntro(false)
  }

  return (
    <main className="app--main">
      {showIntro && <Intro handleShowIntro={handleShowIntro} />}
      {!showIntro && <Questions apiIsFetched={isFetched} items={items} />}
    </main>
  )
}

export default App;

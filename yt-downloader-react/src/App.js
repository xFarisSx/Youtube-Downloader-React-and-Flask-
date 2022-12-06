import { useState, useEffect , useRef} from "react";
import YoutubeVideo from "./YoutubeVideo";
import History from "./History";
import { click } from "@testing-library/user-event/dist/click";

function App() {
  const isDownloadable = useRef(false)
  const [url, setUrl] = useState('')
  const [history, setHistory] = useState(localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [])
  const [youtube, setYoutube] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  const clearHistory = () => {
    setHistory([])
  }

  const downloadAgain = (url) => {
    isDownloadable.current = true
    setUrl(url)
  }

  const clickhandle = () => {
    isDownloadable.current = true
    download()
  }
  
  const download = () => {
    if (url) {
      setLoading(true)
      setYoutube(false)
      fetch(`http://127.0.0.1:5000/api/youtube?url=${url}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setYoutube(data)
        if (!history.find(h => h.url === url)) {
          let newHistory = {
            url: url,
            title: data.info.title,
          }
          setHistory([
            ...history, 
            newHistory
          ])
          
        }
        
      })
      
    }
  }
  useEffect(() => {
    if (isDownloadable.current === true) {
      download()
    }
  }, [url])

  return (
    <div className="App">
      <form action="" method="post" onSubmit={e => e.preventDefault()}>
        <h3>Youtube Downloader</h3>
        <div className="search">
          <input type="text" onFocus={() => isDownloadable.current = false} onChange={ e => setUrl(e.target.value)} placeholder="Youtube URL" />
          <button type="submit" onClick={clickhandle}>Download</button>
        </div>
      </form>
      {loading && (
      <div className="loader">
        Loading ...
      </div>
      )}
      {youtube && loading === false && <YoutubeVideo youtube={youtube}/>}
      {history && <History list={history} downloadAgain={downloadAgain} clearHistory={clearHistory} />}
    </div>
  );
}

export default App;

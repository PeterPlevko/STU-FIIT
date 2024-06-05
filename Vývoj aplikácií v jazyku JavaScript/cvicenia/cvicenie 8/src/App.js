import './App.css';

function App() {

  function changeText(){
    let txt = document.getElementById("text");
    txt.innerText = "Hi\"" + document.getElementById("inp").value + "\"";
  }

  return (
    <div className="App">
      <header className="App-header">
        <p id="text">
          Hi ""
        </p>
        <input type="text" id="inp"/>
        <button onClick={changeText}> Change </button>
      </header>
    </div>
  );
}

export default App;

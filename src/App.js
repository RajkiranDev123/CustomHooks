import "./App.css";
import Countdown from "./components/Countdown";
import Stopwatch from "./components/Stopwatch";

function App() {
  return (
    <>
      <h2 style={{textAlign:"center"}}>Custom Hook Design Pattern</h2>
      <div style={{display:"flex",justifyContent:"center",gap:6}}>
      <Stopwatch />
      <Countdown initialSeconds={60} />
      </div>
    </>
  );
}

export default App;

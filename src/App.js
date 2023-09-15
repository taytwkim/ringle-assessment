import Reserve from './Components/Reserve.js';
import './App.css';

const userInfo = require("./UserInfo.json");
const tutorInfo = require("./TutorInfo.json");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Reserve/>
      </header>
    </div>
  );
}

export default App;

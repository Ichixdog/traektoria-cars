import { useEffect } from "react";
import Main from "../src/components/main/main"
import './App.scss';
import { useVehiclesStore } from "./store/useVehiclesStore";

function App() {
  const setInitialData = useVehiclesStore(state => state.setInitialData)

  useEffect(() => {
    fetch("https://task.tspb.su/test-task/vehicles")
      .then(res => res.json())
      .then(data => setInitialData(data))
      .catch(err => console.error(err));
  }, [setInitialData])

  
  return (
    <div >
      <Main />
    </div>
  );
}

export default App;

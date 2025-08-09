import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import { Browse } from "./components/Browse";



function App() {







  return (

    <Provider store={appStore}> 
    <Body />
    </Provider>

  );
}

export default App;

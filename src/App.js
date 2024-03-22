import { Fragment } from "react";
import FmgRoutes from "./routes/FmgRoutes";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Fragment>  
      <Provider store={store}>
        <FmgRoutes/>
      </Provider>
    </Fragment>
  );
}

export default App;

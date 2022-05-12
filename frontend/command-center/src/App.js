import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/auth/Login";

library.add(fas);

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;

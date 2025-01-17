import Login from "./Pages/Login/LoginPages";
import Dashboard from "./Pages/Dashboard/DashboardPages";
import FileDetail from "./Pages/Details/Details";
import EditDetail from "./Pages/Edit/EditPages";
import { Switch } from "react-router-dom";
import PublicRoute from "./Utilities/PublicRoute";
import PrivateRoute from "./Utilities/PrivateRoute";

function App() {
  return (
    <main className="App">
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/file/:name" component={FileDetail} />
        <PrivateRoute
          path="/edit/:name/page/:currentImageIndex"
          component={EditDetail}
        />
      </Switch>
    </main>
  );
}

export default App;

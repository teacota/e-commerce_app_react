import AuthPage from "./pages/AuthPage/AuthPage";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Nav from "./common/components/Nav/Nav";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Homepage from "./pages/Homepage/Homepage";
import PrivateRoute from "./common/components/PrivateRoute/PrivateRoute";
import AdminPanel from "./pages/Homepage/AdminPanel";
import AddProducts from "./pages/Homepage/AddProducts";
import Cart from "./pages/Cart/Cart"
import PaymentForm from "./common/components/PaymentForm/PaymentForm";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/authenticate" component={AuthPage} />
          <Route exact path="/home" component={Homepage} />
          <PrivateRoute exact path="/admin-panel" component={AdminPanel} />
          <PrivateRoute exact path="/add-product" component={AddProducts} />
          <Route exact path="/card" component={Cart} />
          <Route exact path="/payment-form" component={PaymentForm} />
          <Redirect exact to="/home" />
          
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}


export default App;

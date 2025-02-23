import React from "react";
import { Provider } from "react-redux";
import store from "./constants/store";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./components/Header";
import Body from "./components/Body";
import RestaurantDetail from "./components/RestaurantDetail";

const App = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/restaurants/:resId" element={<RestaurantDetail />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;

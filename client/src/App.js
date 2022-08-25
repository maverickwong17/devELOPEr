import "./App.css";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <>
      <LandingPage>
        <Header />
      </LandingPage>

      <Layout />
    </>
  );
}

export default App;

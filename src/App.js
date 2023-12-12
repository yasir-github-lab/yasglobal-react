import logo from './logo.svg';
import './Assets/css/header.css'

import Header from './Components/common/Header'
import Home from './Components/homePage/Home'
import Footer from './Components/common/Footer'
import About from './Components/pages/About'
import Page from './Components/pages/Page'
import Blog from './Components/blog/Blog'
import BlogSingle from './Components/blog/BlogSingle'
import Other from './Components/pages/Other'



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { function1 } from './Assets/js/script'

function App() {
  return (
    <Router>
    <div className="App">
      
      <Header />
     
      <Routes>
          <Route path="/Assets" render={() => null} />
          <Route path="/"  element={<Home/>} ></Route>
          <Route exact path="/about/"  element={<About/>} ></Route>     
          <Route exact path="/blog/"  element={<Blog/>} ></Route>         
          <Route path="/blog/:slug"  element={<BlogSingle/>} ></Route> 
          <Route path="/:slug"  element={<Page/>} ></Route>         
          <Route path="/:slug/:slug"  element={<Page/>} ></Route>
          <Route path="/*"  element={<Other/>} ></Route>
       </Routes>          
    
      <Footer />

    </div>
   

    </Router>
  );
}


export default App;

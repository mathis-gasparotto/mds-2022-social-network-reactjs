import { Footer } from "../layouts/footer";
import { Header } from "../layouts/header";

const root = document.getElementById('root');

function App(){
  return(
    <React.Fragment>
      <Header/>
      <Footer/>
    </React.Fragment>
  )
}

ReactDOM.render(<App/>, root)
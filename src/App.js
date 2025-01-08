import s from './components/list.module.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { List } from "./components/list";
import { DetalesBond } from './components/detalesBond';
import { ChartQuotes } from './components/chartQuotes';
import { ChartQuotesGpt } from './components/gptQuotes';
import { Provider } from 'react-redux'
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <List/>,

  },
  {
    path: '/detales',
    element: <DetalesBond/>
  }
])
function App() {
  return (
    <div  >
      {/* <ChartQuotesGpt/> */}
      <Provider store = {store}>
        <ChartQuotes/>
      <RouterProvider router = {router} />
      </Provider>
      
     {/* Project
     <List/> */}
    </div>
  );
}

export default App;

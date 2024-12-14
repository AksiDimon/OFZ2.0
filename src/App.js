import s from './components/list.module.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { List } from "./components/list";
import { DetalesBond } from './components/detalesBond';
import { ChartQuotes } from './components/chartQuotes';
const router = createBrowserRouter([
  {
    path: '/',
    element: <List/>,

  },
  {
    path: "/detales",
    element: <DetalesBond/>
  }
])
function App() {
  return (
    <div  >
      <ChartQuotes/>
      <RouterProvider router = {router} />
     {/* Project
     <List/> */}
    </div>
  );
}

export default App;

import s from './components/list.module.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { List } from "./components/list";
import { DetalesBond } from './components/detalesBond';
import { ChartQuotes } from './components/chartQuotes';

import {TestMyHook} from './components/testMyHook';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { Ofz } from './components/ofz';
import { Corporates } from './components/corporates';
import { Replays } from './components/replays';
import { Layout } from './components/layout'; // Общий макет
import { MeasuredBox } from './components/MesureBox';
const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />, // Общий макет
    children: [
      { path: "bonds/corporates", element: <Corporates /> }, // Вложенные маршруты
      { path: "bonds/ofz", element: <Ofz /> },
      {path: 'bonds/replays', element: <Replays/>},
      {path: '/detales',element: <DetalesBond/>},
    ],
  },
]);

// const router = createBrowserRouter([
//   // {
//   //   path: '/main',
//   //   element: <MainPage/>
//   // },
//   {
//     path: '/bonds/corporates',
//     element: <Corporates/>
//   },
//   {
//     path: '/bonds/ofz',
//     element: <Ofz/>,

//   },
//   {
//     path: '/detales',
//     element: <DetalesBond/>
//   },
//   {
//     path: '/newWindow',
//     element: <TestMyHook/>
//   }
// ])
function App() {
  return (
    <div  >
      
      <Provider store = {store}>
      <RouterProvider router = {router} />
       {/* <TestMyHook/> */}
        <MeasuredBox/>
      </Provider>
      
     {/* Project
     <List/> */}
    </div>
  );
}

export default App;

import router from "./router";
import "./style/index.css"
import {  RouterProvider } from 'react-router-dom';


function App() {
  return (
    <div className="">
      <main className="">
        <RouterProvider router={router}/>
      </main>
    </div>
  )
}

export default App

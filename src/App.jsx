import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import router from './config/router';
// import { Signup } from './components/Signup';
// import { Req } from './components/Req';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

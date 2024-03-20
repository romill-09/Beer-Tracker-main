import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;

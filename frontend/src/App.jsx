import { Toaster } from "react-hot-toast";
import {useUser } from '@clerk/react'
import { Routes, Route, Navigate } from 'react-router'

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";

function App() {

  const {isSignedIn, isLoaded} = useUser();

  // this gets rid of flickering effect
  if(!isLoaded) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ?<HomePage/> :  <Navigate to={"/dashboard"}/>}/>
        <Route path="/dashboard" element={isSignedIn? <DashboardPage/> : <Navigate to={"/"}/>}/>
        <Route path="/problems" element={isSignedIn? <ProblemsPage/> : <Navigate to={"/"}/>}/>
      </Routes>
      <Toaster position='top-right' toastOptions={{duration: 2000}}/>
    </>
  )
}

export default App 
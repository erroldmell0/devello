import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import toast from 'react-hot-toast'

const HomePage = () => {
  return (
    <>
      <header>
        <button onClick={() => toast.success("this is a success")}>Toast Success</button>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SignIn</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SignUp</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">HomePage</h1>
      </div>
    </>
  )
}

export default HomePage
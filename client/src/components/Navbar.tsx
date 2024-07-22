import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
// import Cookies from 'js-cookie';


function Navbar() {
  const [userDetails, setUserDetails] = useState<any>()

  //get login user
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_ORIGIN}/profile/getUser`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json()
      setUserDetails(data)
    } catch (error) {
      throw new Error(`Cannot find user ${error}`)
    }
  }

  // User logout function
  const handleLogOut = async () => {
    if (!userDetails) return 'User is alerady logout'
    await fetch(`${import.meta.env.VITE_ORIGIN}/profile/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUserDetails(data))
    localStorage.removeItem('accessToken')
    toast("Logout Successfully!", { type: 'success' })
  }
  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <>
      <ToastContainer autoClose={2500} />
      
      <nav className="bg-slate-200 border-gray-200 dark:bg-gray-900 dark:border-gray-700 ">
        <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <img src="./logo2.png" className=" h-5 md:h-10" alt="Cart Logo" />
            <div className="font-semibold md:text-lg text-sm uppercase">Cartify</div>
          </a>

          <div className="" id="navbar-dropdown">
            <ul className="flex items-center gap-2 font-medium p-4 md:p-0  md:space-x-4 md:flex-row md:bg-slate-200 dark:bg-gray-800 md:dark:bg-gray-900 ">
              {userDetails?.userData ? <img src={userDetails?.userData?.avatar} className="h-5 md:h-10 hidden md:block" alt={userDetails?.userData?.username} /> : <img src={'./user.png'} className="h-5 md:h-10 hidden md:block" alt={userDetails?.userData?.username} />}
              {userDetails?.userData && <a href="/add-product" className="bg-blue-700 whitespace-nowrap text-white text-sm md:text-lg p-2 rounded-lg">Add Product</a>}
              <li className="border border-red-400 py-2 px-3 rounded-md bg-rose-600 ">
                {userDetails?.userData ? <button onClick={handleLogOut} className="block font-semibold rounded text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button> :
                  <a href="/login" className="block font-semibold rounded text-sm md:text-lg text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
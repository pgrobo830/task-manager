
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUP from './pages/Auth/SignUP';
// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import CreateTasks from './pages/admin/CreateTasks';
import ManageTasks from './pages/admin/ManageTasks';
import ManageUsers from './pages/admin/manageUsers';

import UserDashboard from './pages/user/UserDashboard';
import MyTasks from './pages/user/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import PrivateRoute from './routes/PrivateRoute';

function App() {
 

  return (
    <>
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element = {<Login/>} />
        <Route path = "/SignUP" element = {<SignUP/>} />
        
        {/* Admin Routes */}
        <Route  element = {<PrivateRoute allowedRoles = {["admin"]}/>}>
          <Route path ="admin/dashboard" element ={< Dashboard/>}/>
          <Route path ="admin/tasks" element={<ManageTasks/>}/>
          < Route path ="admin/create-task" element={<CreateTasks/>}/>
          < Route path ="admin/users" element={<ManageUsers/>}/>
        </Route>
      
        {/* User Routes */}
        <Route  element = {<PrivateRoute allowedRoles = {["user"]}/>}>
          <Route path ="user/dashboard" element ={<UserDashboard/>}/>
          <Route path ="user/tasks" element={<MyTasks/>}/>
          <Route path ="user/task-details:id" element={<ViewTaskDetails/>}/>
        </Route>

        {/* Other Routes  */}
      <Route path= "*" element = {<h1 className='text-center text-4xl'>Not found </h1>}/>
      </Routes>
    </Router>
    </>
 )
}

export default App

import {React,useState} from 'react'
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleLogin =async (e)=>{
    e.preventDefault();
    
    if(!email || !password){
      console.log("All Field are required");
    }
  };
  return (
    <div className="md:h-full h-100vh flex flex-col  justify-center items-center">
      <h3>Welcome back |</h3>
      <p>Please enter your detail to log in </p>

      <form className='flex flex-col gap-4 border rounded-2xl p-10 ' onSubmit={handleLogin}>
        {/* email */}
        <div>
          <label htmlFor="email">email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
          />
        </div>
        {/* password */}
         <div>
          <label htmlFor="password">password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
          />
        </div>
        {/* submit */}
        <div>
         <button onSubmit={handleLogin}>Log In</button>
        </div>
      </form>
    </div>
  )
}

export default Login
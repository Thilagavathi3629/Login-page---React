import { useState } from 'react';
import { CheckCircle, XCircle, User, Lock } from 'lucide-react';

const App = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showConditions, setShowConditions] = useState(false);

  const validatePassword = password.length > 8;
  const validateUppercase = /[A-Z]/.test(password);
  const validateNumber = /[0-9]/.test(password);
  const validateSpecialChar = /[!@#$%&*]/.test(password);

  // Calculate how many conditions are met (0-4)
  const conditionsMet = [validatePassword, validateUppercase, validateNumber, validateSpecialChar].filter(Boolean).length;

  const handleClick = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      return alert('Fields should not be empty');
    }

    if (username.trim().length < 3) {
      return alert('Username should be more than 3 characters');
    }

    if (!validatePassword || !validateUppercase || !validateNumber || !validateSpecialChar) {
      return alert(
        !validatePassword ? 'Password should contain at least 8 characters' :
        !validateUppercase ? 'It should contain at least one uppercase letter' :
        !validateNumber ? 'It should contain numbers' :
        'It should contain a special character !@#$%&*'
      );
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert(`${username} is trying to login`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-indigo-650 to-purple-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Login container */}
      <div className="max-w-sm w-full p-8 bg-white rounded-xl shadow-2xl z-10">
        <div className="flex justify-center -mt-20 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            <User size={48} className="text-white" />
          </div>
        </div>

        <form onSubmit={handleClick}>
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!showConditions && e.target.value) {
                    setShowConditions(true);
                  }
                }}
                onFocus={() => setShowConditions(true)}
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800"
                placeholder="Enter your password"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
            </div>
          </div>
          
          {/* Password strength indicator */}
          {password.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Password Strength</span>
                <span className="text-sm font-medium">
                  {conditionsMet === 0 && "Very Weak"}
                  {conditionsMet === 1 && "Weak"}
                  {conditionsMet === 2 && "Fair"}
                  {conditionsMet === 3 && "Good"}
                  {conditionsMet === 4 && "Strong"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    conditionsMet === 0 ? "w-0 bg-red-500" :
                    conditionsMet === 1 ? "w-1/4 bg-red-500" :
                    conditionsMet === 2 ? "w-2/4 bg-yellow-500" :
                    conditionsMet === 3 ? "w-3/4 bg-blue-500" :
                    "w-full bg-green-500"
                  }`}
                ></div>
              </div>
            </div>
          )}
          
          {/* Password conditions - only shown after user starts typing */}
          {showConditions && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mt-2">
                {validatePassword && (
                  <div className="flex items-center gap-1 p-2 bg-purple-100 text-purple-800 rounded-full text-sm px-3 transition-all duration-300 transform scale-105">
                    <CheckCircle className="text-purple-600" size={14} />
                    <span>8+ chars</span>
                  </div>
                )}
                
                {validateUppercase && (
                  <div className="flex items-center gap-1 p-2 bg-purple-100 text-purple-800 rounded-full text-sm px-3 transition-all duration-300 transform scale-105">
                    <CheckCircle className="text-purple-600" size={14} />
                    <span>Uppercase</span>
                  </div>
                )}
                
                {validateNumber && (
                  <div className="flex items-center gap-1 p-2 bg-purple-100 text-purple-800 rounded-full text-sm px-3 transition-all duration-300 transform scale-105">
                    <CheckCircle className="text-purple-600" size={14} />
                    <span>Number</span>
                  </div>
                )}
                
                {validateSpecialChar && (
                  <div className="flex items-center gap-1 p-2 bg-purple-100 text-purple-800 rounded-full text-sm px-3 transition-all duration-300 transform scale-105">
                    <CheckCircle className="text-purple-600" size={14} />
                    <span>Special char</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 hover:from-purple-700 hover:to-blue-600 hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
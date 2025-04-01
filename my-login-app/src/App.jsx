import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { CheckCircle, User, Lock } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const App = () => {
  const [showConditions, setShowConditions] = useState(false);
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      localStorage.setItem('username', values.value.username);
      localStorage.setItem('password', values.value.password);
      alert(`${values.value.username} is trying to login`);
      console.log(values.value.username)

      navigate({ to: '/home' });
    }
  });

  return (
    <div className="h-screen flex items-center justify-center bg-[#0b0b2a]">
      <div className="max-w-sm w-full p-8 bg-[#1a1a3a] rounded-xl shadow-2xl border border-white/10">
        <div className="flex justify-center -mt-20 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center border-4 border-white/20 shadow-lg">
            <User size={48} className="text-white" />
          </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}>
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>

          {/* Username Field using form.Field */}
          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                !value.trim().endsWith('@gmail.com') ? '': undefined,
              onBlur: ({ value }) =>
                value.trim() === '' ? 'Username is required' : undefined
            }}
          >
            {(field) => {
              const hasError = field.state.meta.errors && field.state.meta.errors.length > 0;

              return (
                <div className="mb-4">
                  <label htmlFor={field.name} className="block text-white mb-2 font-medium">
                    Username
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-400"
                    placeholder="Enter your username"
                  />
                  {hasError && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors.join(', ')}
                      </p>
                      {!field.state.value.endsWith('@gmail.com') && (
                        <div className="flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3">
                          <CheckCircle className="text-purple-400" size={14} />
                          <span>Must end with @gmail.com</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Password Field using form.Field */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (value.length < 8) return 'Password should be at least 8 characters';
                if (!/[A-Z]/.test(value)) return 'It should contain at least one uppercase letter';
                if (!/[0-9]/.test(value)) return 'It should contain a number';
                if (!/[!@#$%&*]/.test(value)) return 'It should contain a special character (!@#$%&*)';
              },
              onBlur: ({ value }) => value.trim() === '' ? 'Password is required' : undefined
            }}
          >
            {(field) => {
              const password = field.state.value;
              const validatePassword = password.length >= 8;
              const validateUppercase = /[A-Z]/.test(password);
              const validateNumber = /[0-9]/.test(password);
              const validateSpecialChar = /[!@#$%&*]/.test(password);

              const conditionsMet = [validatePassword, validateUppercase, validateNumber, validateSpecialChar].filter(Boolean).length;

              return (
                <div className="mb-4">
                  <label htmlFor={field.name} className="block text-white mb-2 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="password"
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onFocus={() => setShowConditions(true)}
                      className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-400"
                      placeholder="Enter your password"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock size={18} className="text-white/50" />
                    </div>
                  </div>

                  {field.state.meta.errors && (
                    <p className="text-red-500 text-sm mt-1">{field.state.meta.errors.join(', ')}</p>
                  )}

                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70">Password Strength</span>
                        <span className="text-sm font-medium text-white">
                          {conditionsMet === 0 && "Very Weak"}
                          {conditionsMet === 1 && "Weak"}
                          {conditionsMet === 2 && "Fair"}
                          {conditionsMet === 3 && "Good"}
                          {conditionsMet === 4 && "Strong"}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
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

                  {/* Password Conditions */}
                  {showConditions && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {validatePassword && (
                        <div className="flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3">
                          <CheckCircle className="text-purple-400" size={14} />
                          <span>8+ chars</span>
                        </div>
                      )}
                      {validateUppercase && (
                        <div className="flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3">
                          <CheckCircle className="text-purple-400" size={14} />
                          <span>Uppercase</span>
                        </div>
                      )}
                      {validateNumber && (
                        <div className="flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3">
                          <CheckCircle className="text-purple-400" size={14} />
                          <span>Number</span>
                        </div>
                      )}
                      {validateSpecialChar && (
                        <div className="flex items-center gap-1 p-2 bg-white/10 text-white rounded-full text-sm px-3">
                          <CheckCircle className="text-purple-400" size={14} />
                          <span>Special char</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
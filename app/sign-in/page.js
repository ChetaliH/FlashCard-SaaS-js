'use client'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign-in successful:', res);
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Failed to sign in. Please check your credentials and try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  };

  const inputContainerStyle = {
    marginBottom: '20px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1>StudyOwl.AI</h1>
      <div style={{ fontSize: '24px', marginBottom: '20px' }}>Sign In</div>
      <div style={inputContainerStyle}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <input
          type="button"
          onClick={handleSignIn}
          value="Sign In"
          style={buttonStyle}
        />
      </div>
      <div>
        <a href="/sign-up" style={{ color: '#007bff', textDecoration: 'none' }}>
          Don't have an account? Sign up here
        </a>
      </div>
    </div>
  );
};

export default SignIn;

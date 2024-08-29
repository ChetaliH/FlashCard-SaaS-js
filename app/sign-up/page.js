'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure the path is correct
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ userCredential });
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (error) {
      console.error("Error signing up:", error);
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
      <div style={{ fontSize: '24px', marginBottom: '20px' }}>Sign-up</div>
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
          onClick={handleSignUp}
          value="Sign-up"
          style={buttonStyle}
        />
      </div>
      <div>
        <a href="/sign-in" style={{ color: '#007bff', textDecoration: 'none' }}>
          Already have an account? Sign in here
        </a>
      </div>
    </div>
  );
};

export default SignUp;

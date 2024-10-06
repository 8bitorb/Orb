import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const useMetaMask = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const connectWallet = async () => {
    setIsLoading(true);
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts);
        setIsConnected(true);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('MetaMask não encontrada!');
      setIsLoading(false);
    }
  };


  const disconnectWallet = async () => {
    setIsConnected(false);
    setAccounts([]);
  };


  return { isConnected, accounts, error, isLoading, connectWallet, disconnectWallet };
};


const ErrorComponent = ({ error }) => {
  return (
    <div className="error-container">
      <h2>Erro</h2>
      <p>{error.message}</p>
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <h2>Conectando...</h2>
      <div className="loading-spinner"></div>
    </div>
  );
};


const DisconnectButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="disconnect-button">
      Desconectar
    </button>
  );
};


const ConnectButton = ({ onClick, isLoading }) => {
  return (
    <button onClick={onClick} className="login-button">
      {isLoading ? 'Conectando...' : 'Conectar com MetaMask'}
    </button>
  );
};


function Login() {
  const navigate = useNavigate();
  const { isConnected, accounts, error, isLoading, connectWallet, disconnectWallet } = useMetaMask();


  useEffect(() => {
    if (isConnected) {
      navigate('/feed');
    }
  }, [isConnected, navigate]);


  return (
    <div className="login-container">
      <h1>Bem-vindo à Orb</h1>
      {error ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          {isConnected ? (
            <DisconnectButton onClick={disconnectWallet} />
          ) : (
            <ConnectButton onClick={connectWallet} isLoading={isLoading} />
          )}
        </>
      )}
      {isLoading && <LoadingComponent />}
    </div>
  );
}

<div class="orb-3d">
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
  <div class="face"></div>
</div>

export default Login;
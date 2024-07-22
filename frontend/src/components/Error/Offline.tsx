import { useState, useEffect } from 'react';


export const Offline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnlineStatus() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        display: isOnline ? 'none' : 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          alt="ofline"
          src={'https://static.vecteezy.com/system/resources/thumbnails/025/263/071/small_2x/no-internet-connection-you-are-offline-sign-on-white-background-no-wifi-illustration-vector.jpg'}
          style={{ width: '200px', height: 'auto', opacity: 0.8 }}
        />
       
        <div style={{ marginTop: '10px' }}>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            type="button"
            onClick={handleReload}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offline;

import * as React from 'react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';



const SecurePage = ({children}) => { 
  const { oktaAuth, authState } = useOktaAuth();
  const pendingLogin = React.useRef(false);
  const [handleLoginError, setHandleLoginError] = React.useState(null);

  React.useEffect(() => {
    const handleLogin = async () => {
      if (pendingLogin.current) {
        return;
      }

      pendingLogin.current = true;

      const originalUri = toRelativeUrl(window.location.href, window.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      
      await oktaAuth.signInWithRedirect();
    };

    if (!authState) {
      return;
    }

    if (authState.isAuthenticated) {
      pendingLogin.current = false;
      return;
    }

    // Start login if app has decided it is not logged in and there is no pending signin
    if(!authState.isAuthenticated) { 
      handleLogin().catch(err => {
        setHandleLoginError(err);
      });
    }  

  }, [
    authState,
    oktaAuth
  ]);

  if (handleLoginError) {
    return <p>{handleLoginError.name}: {handleLoginError.message}</p>;
  }

  console.log('Auth State', authState);

  if (!authState || !authState.isAuthenticated) {
    return null;
  }

  return (
    <>{children}</>
  );
};

export default SecurePage;
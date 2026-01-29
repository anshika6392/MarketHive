import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

  const {
    user,
    loginWithRedirect,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
    isLoading,
    error
  } = useAuth0();


  return (
    <div className="w-full h-screen items-center justify-center bg-red-800 mt-24">
      <button
        onClick={() => loginWithRedirect()}
        className="button login "
      >
        Log In
      </button>

      {isAuthenticated && <img src={user.picture}></img>}
      {isAuthenticated && <h1>Hello {user.name}</h1>}


      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="button logout"
      >
        Log Out
      </button>
    </div>
  );
};

export default Login;
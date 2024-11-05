import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import CityForm from './components/CityForm';
import { Toaster } from 'react-hot-toast';
import logo from '/src/images/pngucobet.png';

function App() {
  return (
    <Auth0Provider
      domain="dev-g3qtue2ymqd1uqxf.us.auth0.com"
      clientId="gNwDzMsg3yr0qug7ycpYDSLYVdIzUX9z"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-g3qtue2ymqd1uqxf.us.auth0.com/api/v2/",
        scope: "openid profile email read:clients create:users"
      }}
    >
      <div className="min-h-screen bg-green-500 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
                  <h1 className="text-3xl font-bold text-center mb-8">Create City</h1>
                  <CityForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </Auth0Provider>
  );
}

export default App;
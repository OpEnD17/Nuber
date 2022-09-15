import awsExports from './aws-exports';
import Home from './home';

import './App.css';

import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

export default function App() {

  return (
    <div>
      <div className='header'>
        Nüber
      </div>
      <Authenticator socialProviders={['amazon', 'apple', 'facebook', 'google']}>
        {({ signOut, user }) => (
          <Home signOut={signOut} user={user}/>
        )}
      </Authenticator>
    </div>
  );
}

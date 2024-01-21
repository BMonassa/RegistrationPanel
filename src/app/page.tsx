
import  Login  from './Login/page';

import { UsersContext } from '@/context/UsersContext/UsersContext';
import RegistrationForm from './RegistrationForm/page';

export default function Home() {
  return (
    <UsersContext>
      <main className="flex min-h-screen flex-col ">
        <Login />
      </main>
    </UsersContext>
  );
}

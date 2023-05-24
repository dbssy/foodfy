import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';

import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';

import AllUsers from '@/pages/Users/AllUsers';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route path="/users" element={<AllUsers />} />
    </Routes>
  );
}

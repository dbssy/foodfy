import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import About from '@/pages/About';

import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';

import AllUsers from '@/pages/Users/AllUsers';
import ShowUser from '@/pages/Users/ShowUser';
import EditUser from '@/pages/Users/EditUser';

import AllRecipes from '@/pages/Recipes/AllRecipes';
import ShowRecipe from '@/pages/Recipes/ShowRecipe';
import NewRecipe from '@/pages/Recipes/NewRecipe';
import EditRecipe from '@/pages/Recipes/EditRecipe';

import PrivateRoute from '@/routes/PrivateRoute';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route path="/users" element={<AllUsers />} />
      <Route path="/users/show/:id" element={<ShowUser />} />

      <Route
        path="/users/edit/:id"
        element={(
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        )}
      />

      <Route path="/recipes" element={<AllRecipes />} />
      <Route path="/recipes/show/:id" element={<ShowRecipe />} />

      <Route
        path="/recipes/new"
        element={(
          <PrivateRoute>
            <NewRecipe />
          </PrivateRoute>
        )}
      />

      <Route
        path="/recipes/edit/:id"
        element={(
          <PrivateRoute>
            <EditRecipe />
          </PrivateRoute>
        )}
      />
    </Routes>
  );
}


import { RouterProvider } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { router } from './router';

const App: React.FC = () => {
  return (
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  );
};

export default App;

import React from 'react';
import { cssTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const rollingAnimation = cssTransition({
  enter:
    'animate__animated animate__rollIn animate__delay-0.1s animate__faster',
  exit: 'animate__animated animate__rollOut',
});

export const ToasterContext = (): React.ReactElement => {
  return (
    <ToastContainer
      limit={5}
      autoClose={2500}
      pauseOnFocusLoss={false}
      position={'top-center'}
      hideProgressBar={false}
      toastClassName="rounded-2xl pr-4"
      transition={rollingAnimation}
    />
  );
};

export default ToasterContext;

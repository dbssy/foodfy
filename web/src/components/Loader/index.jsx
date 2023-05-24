import PropTypes from 'prop-types';

import { Overlay } from './styles';

import useAnimatedUnmount from '@/hooks/useAnimatedUnmount';

import ReactPortal from '@/components/ReactPortal';
import Spinner from '@/components/Spinner';

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={6} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

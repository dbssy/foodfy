import { useEffect } from 'react';

import { Container } from './styles';

import useAnimatedList from '@/hooks/useAnimatedList';

import { toastEventManager } from '@/utils/toast';

import ToastMessage from '@/components/Toast/ToastMessage';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={isLeaving}
          onRemoveMessage={handleRemoveItem}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}

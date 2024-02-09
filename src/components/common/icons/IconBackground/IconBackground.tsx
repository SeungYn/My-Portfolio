import { PropsWithChildren } from 'react';

export default function IconBackground({ children }: PropsWithChildren) {
  return (
    <div className='border-2 border-green rounded-full p-1 bg-lightest-navy grow-0 h-max'>
      {children}
    </div>
  );
}

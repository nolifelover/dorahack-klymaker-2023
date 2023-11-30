import { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from '../redux';
import Lightbox from 'react-spring-lightbox';
import { setLightBoxPortal } from '../redux/layout';

export default function LightBoxPortal({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const { lightBoxPortal } = useSelector(state => state.layout);

  return (
    <>
      {children}
      <Lightbox
        isOpen={!!lightBoxPortal}
        onPrev={() => null}
        onNext={() => null}
        images={[
          {
            src: lightBoxPortal,
            alt: '',
          },
        ]}
        currentIndex={0}
        className="bg-black/50"
        onClose={() => dispatch(setLightBoxPortal(''))}
      />
    </>
  );
}

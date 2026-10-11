import type { ComponentProps, ReactNode } from 'react';

import Image from 'next/image';

import { Slot } from '@/common/components/board/slot';

type DetailBodyProps = Readonly<{
  code: string;
  cover: ComponentProps<typeof Image>['src'];
  children: ReactNode;
}>;

/** The cover hung in its slot, then the text on its own plate below. */
export function DetailBody({ code, cover, children }: DetailBodyProps) {
  return (
    <div className="space-y-10">
      <Slot code={code} plateClassName="overflow-hidden">
        <div className="relative aspect-[16/9]">
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="(max-width: 46rem) calc(100vw - 2rem), 44rem"
            className="object-cover"
          />
        </div>
      </Slot>
      <Slot plateClassName="px-5 py-8 sm:px-10 sm:py-12">{children}</Slot>
    </div>
  );
}

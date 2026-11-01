'use client';

import type { ComponentProps } from 'react';

import { useEffect, useRef, useState } from 'react';

import { Maximize2Icon, XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@/common/helpers/cn';

/** Space kept clear round the enlarged image, in CSS pixels. */
const DIALOG_PADDING = 16;

/** How much wider than the inline image the enlarged one must be to offer it. */
const MIN_GAIN = 1.15;

/**
 * The width the dialog would show the image at: its natural size, scaled down
 * to fit the viewport inside the padding.
 */
function enlargedWidth(image: HTMLImageElement): number {
  const maxWidth = window.innerWidth - 2 * DIALOG_PADDING;
  const maxHeight = window.innerHeight - 2 * DIALOG_PADDING;
  return Math.min(
    image.naturalWidth,
    maxWidth,
    (maxHeight * image.naturalWidth) / image.naturalHeight,
  );
}

/**
 * An image in an article or project body. When the dialog can show it
 * noticeably larger than the reading column does, clicking it opens the file
 * in a modal dialog. Otherwise it stays a plain image, as on most phones.
 */
export function ZoomableImage({
  className,
  alt = '',
  src,
  ...props
}: ComponentProps<'img'>) {
  const imageRef = useRef<HTMLImageElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isZoomable, setIsZoomable] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) {
      return;
    }

    function updateZoomable() {
      if (!image) {
        return;
      }
      setIsZoomable(
        image.complete &&
          image.naturalWidth > 0 &&
          enlargedWidth(image) > image.clientWidth * MIN_GAIN,
      );
    }

    updateZoomable();
    image.addEventListener('load', updateZoomable);
    window.addEventListener('resize', updateZoomable);

    return () => {
      image.removeEventListener('load', updateZoomable);
      window.removeEventListener('resize', updateZoomable);
    };
  }, []);

  const imageName = alt || 'Untitled image';

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <span className="relative block">
      {/* biome-ignore lint/performance/noImgElement: velite already copies body images to /static at their final size */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn('block', className)}
        {...props}
      />
      {isZoomable && (
        <>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-label={`Enlarge image: ${imageName}`}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => dialogRef.current?.showModal()}
          >
            <span className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-sm border border-rim bg-plate text-muted-foreground">
              <Maximize2Icon aria-hidden className="size-4" />
            </span>
          </button>
          {createPortal(
            // Any click inside closes it, so clicks on the image or the
            // backdrop dismiss it; Escape closes it natively. The scrim is
            // black, as under the mobile drawer.
            // biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes a modal dialog natively
            <dialog
              ref={dialogRef}
              // globals.css keys the page scroll lock on this slot with
              // `:has()`, so the lock can never outlive an open dialog.
              data-slot="image-zoom"
              aria-label={imageName}
              style={{ padding: DIALOG_PADDING }}
              className="m-0 h-dvh max-h-none w-dvw max-w-none cursor-zoom-out bg-transparent backdrop:bg-black/85 open:flex"
              onClick={closeDialog}
            >
              {/* biome-ignore lint/performance/noImgElement: shows the same /static file at its natural size */}
              <img
                src={src}
                alt={alt}
                className="m-auto max-h-full max-w-full object-contain"
              />
              <button
                type="button"
                aria-label="Close"
                className="absolute top-3 right-3 grid size-10 cursor-pointer place-items-center rounded-sm border border-rim bg-plate text-foreground hover:bg-muted"
                onClick={closeDialog}
              >
                <XIcon aria-hidden className="size-6" />
              </button>
            </dialog>,
            document.body,
          )}
        </>
      )}
    </span>
  );
}

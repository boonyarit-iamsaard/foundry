import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { defaultTitle } from '@/common/helpers/metadata';

export const previewImageSize = { width: 1200, height: 630 };

export const previewImageContentType = 'image/png';

// The day board from DESIGN.md. The image is always drawn by day: a preview has
// no theme to follow, and the light board reads on both light and dark feeds.
// Satori can't read the site's oklch tokens, so these are their hex values:
// change one here when its token changes.
const colors = {
  board: '#d2d6d4',
  perforation: '#babfbd',
  plate: '#f3f5f4',
  paint: '#16191c',
  muted: '#494e52',
  tape: '#f9cc21',
  tapeInk: '#13161a',
};

// Satori reads neither WOFF2 nor variable fonts, so the image uses static WOFF
// instances of the site's own faces at the weights it sets.
const fontsDir = join(process.cwd(), 'src/core/assets/fonts');

const fonts = [
  { name: 'Big Shoulders', file: 'big-shoulders-latin-800.woff', weight: 800 },
  { name: 'Big Shoulders', file: 'big-shoulders-latin-700.woff', weight: 700 },
  {
    name: 'Big Shoulders Stencil',
    file: 'big-shoulders-stencil-latin-700.woff',
    weight: 700,
  },
  { name: 'Barlow', file: 'barlow-latin-500.woff', weight: 500 },
] as const;

function loadFonts() {
  return Promise.all(
    fonts.map(async ({ name, file, weight }) => ({
      name,
      weight,
      style: 'normal' as const,
      data: await readFile(join(fontsDir, file)),
    })),
  );
}

type PreviewImageContent = Readonly<{
  /** The page's position code on the board, stencilled on the tape. */
  code: string;
  title: string;
  subtitle: string;
}>;

/**
 * A page's link preview: one slot on the pegboard holding the page title,
 * with the owner's name stamped along the bottom of the plate.
 */
export async function renderPreviewImage({
  code,
  title,
  subtitle,
}: PreviewImageContent) {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '52px 48px 40px',
        backgroundColor: colors.board,
        // Satori draws a radial gradient only when the circle has a size.
        backgroundImage: `radial-gradient(circle 4px at center, ${colors.perforation} 0%, ${colors.perforation} 75%, transparent 100%)`,
        backgroundSize: '36px 36px',
      }}
    >
      {/* The slot: painted outline, a gap, then the enamel plate. Its
          metrics are DESIGN.md's at about 2.5x, so the outline and tape
          still read when the image is shown small. */}
      <div
        style={{
          display: 'flex',
          position: 'relative',
          flex: 1,
          padding: 12,
          border: `5px solid ${colors.paint}`,
          borderRadius: 18,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            padding: '52px 56px 36px',
            backgroundColor: colors.plate,
            borderRadius: 12,
            color: colors.paint,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Words wrap whole, so "Iamsa-ard" never breaks at its hyphen. */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: 26,
                fontFamily: 'Big Shoulders',
                fontSize: 108,
                fontWeight: 800,
                lineHeight: 0.86,
                textTransform: 'uppercase',
              }}
            >
              {title.split(' ').map((word, index) => (
                // A title can repeat a word, and its words never reorder.
                // biome-ignore lint/suspicious/noArrayIndexKey: see above
                <span key={index}>{word}</span>
              ))}
            </div>
            <div
              style={{
                fontFamily: 'Barlow',
                fontSize: 32,
                lineHeight: 1.3,
                color: colors.muted,
              }}
            >
              {subtitle}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: 20,
              borderTop: `4px solid ${colors.paint}`,
              fontFamily: 'Big Shoulders',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            {defaultTitle}
          </div>
        </div>
        {/* Drawn after the plate so the tape lies over its edge. */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: -26,
            left: 40,
            padding: '4px 16px 2px',
            backgroundColor: colors.tape,
            color: colors.tapeInk,
            borderRadius: 2,
            fontFamily: 'Big Shoulders Stencil',
            fontSize: 36,
            letterSpacing: 3,
            lineHeight: 1.2,
          }}
        >
          {code}
        </div>
      </div>
    </div>,
    { ...previewImageSize, fonts: await loadFonts() },
  );
}

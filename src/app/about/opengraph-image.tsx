import { appConfig } from '@/core/configs/app.config';
import {
  previewImageContentType,
  previewImageSize,
  renderPreviewImage,
} from '@/common/components/preview-image';

import { about } from '@/velite';

export const alt = `About ${appConfig.title}`;

export const size = previewImageSize;

export const contentType = previewImageContentType;

export default function Image() {
  return renderPreviewImage({
    code: 'L-02',
    title: 'About',
    subtitle: about.description,
  });
}

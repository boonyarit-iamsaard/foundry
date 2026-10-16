import { appConfig } from '@/core/configs/app.config';
import { renderPreviewImage } from '@/common/components/preview-image';

import { about } from '@/velite';

export const alt = `About ${appConfig.title}`;

export {
  previewImageContentType as contentType,
  previewImageSize as size,
} from '@/common/components/preview-image';

export default function Image() {
  return renderPreviewImage({
    title: 'About',
    subtitle: about.description,
  });
}

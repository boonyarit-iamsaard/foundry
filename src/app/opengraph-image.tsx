import { appConfig } from '@/core/configs/app.config';
import { renderPreviewImage } from '@/common/components/preview-image';

export const alt = appConfig.title;

export {
  previewImageContentType as contentType,
  previewImageSize as size,
} from '@/common/components/preview-image';

export default function Image() {
  return renderPreviewImage({
    title: appConfig.title,
    subtitle: appConfig.description,
  });
}

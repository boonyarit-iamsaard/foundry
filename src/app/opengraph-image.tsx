import { appConfig } from '@/core/configs/app.config';
import {
  previewImageContentType,
  previewImageSize,
  renderPreviewImage,
} from '@/common/components/preview-image';

export const alt = appConfig.title;

export const size = previewImageSize;

export const contentType = previewImageContentType;

export default function Image() {
  return renderPreviewImage({
    code: 'B-00',
    title: appConfig.title,
    subtitle: appConfig.description,
  });
}

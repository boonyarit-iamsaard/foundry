import { appConfig } from '@/core/configs/app.config';
import {
  previewImageContentType,
  previewImageSize,
  renderPreviewImage,
} from '@/common/components/preview-image';
import { fixtureCodes } from '@/common/definitions/fixture-codes';

export const alt = appConfig.title;

export const size = previewImageSize;

export const contentType = previewImageContentType;

export default function Image() {
  return renderPreviewImage({
    code: fixtureCodes.home,
    title: appConfig.title,
    subtitle: appConfig.description,
  });
}

import { appConfig } from '@/core/configs/app.config';
import { renderPreviewImage } from '@/common/components/preview-image';
import { fixtureCodes } from '@/common/definitions/fixture-codes';

export const alt = appConfig.title;

export {
  previewImageContentType as contentType,
  previewImageSize as size,
} from '@/common/components/preview-image';

export default function Image() {
  return renderPreviewImage({
    code: fixtureCodes.home,
    title: appConfig.title,
    subtitle: appConfig.description,
  });
}

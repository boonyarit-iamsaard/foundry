import { appConfig } from '@/core/configs/app.config';
import { renderPreviewImage } from '@/common/components/preview-image';
import { articlesListing } from '@/features/articles/listing';

export const alt = `${articlesListing.title} by ${appConfig.title}`;

export {
  previewImageContentType as contentType,
  previewImageSize as size,
} from '@/common/components/preview-image';

export default function Image() {
  return renderPreviewImage({
    code: articlesListing.code,
    title: articlesListing.title,
    subtitle: articlesListing.description,
  });
}

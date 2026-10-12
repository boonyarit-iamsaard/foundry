import { appConfig } from '@/core/configs/app.config';
import {
  previewImageContentType,
  previewImageSize,
  renderPreviewImage,
} from '@/common/components/preview-image';
import { articlesListing } from '@/features/articles/listing';

export const alt = `${articlesListing.title} by ${appConfig.title}`;

export const size = previewImageSize;

export const contentType = previewImageContentType;

export default function Image() {
  return renderPreviewImage({
    code: articlesListing.code,
    title: articlesListing.title,
    subtitle: articlesListing.description,
  });
}

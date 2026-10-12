import { appConfig } from '@/core/configs/app.config';
import {
  previewImageContentType,
  previewImageSize,
  renderPreviewImage,
} from '@/common/components/preview-image';
import { projectsListing } from '@/features/projects/listing';

export const alt = `${projectsListing.title} by ${appConfig.title}`;

export const size = previewImageSize;

export const contentType = previewImageContentType;

export default function Image() {
  return renderPreviewImage({
    code: projectsListing.code,
    title: projectsListing.title,
    subtitle: projectsListing.description,
  });
}

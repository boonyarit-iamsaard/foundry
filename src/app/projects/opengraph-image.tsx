import { appConfig } from '@/core/configs/app.config';
import { renderPreviewImage } from '@/common/components/preview-image';
import { projectsListing } from '@/features/projects/listing';

export const alt = `${projectsListing.title} by ${appConfig.title}`;

export {
  previewImageContentType as contentType,
  previewImageSize as size,
} from '@/common/components/preview-image';

export default function Image() {
  return renderPreviewImage({
    title: projectsListing.title,
    subtitle: projectsListing.description,
  });
}

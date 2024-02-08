declare module '*.svg' {
  import React from 'react';
  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export const src: string;
  export default svg;
}

// this file is conditionally added/removed to next-env.d.ts
// if the static image import handling is enabled

declare module '*.png' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

declare module '*.jpg' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

declare module '*.jpeg' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

declare module '*.gif' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

declare module '*.webp' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

declare module '*.avif' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

declare module '*.ico' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

declare module '*.bmp' {
  const content: import('../dist/shared/lib/image-external').StaticImageData;

  export default content;
}

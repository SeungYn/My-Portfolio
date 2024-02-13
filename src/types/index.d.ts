export type Project = {
  title: string;
  date: string;
  serviceMaintain: string;
  description: string;
  skillList: string[];
  linkList: ReactNode;
  ImgComponent: ReactNode;
  detailSrc: string;
};

export type EmailDateType = {
  email?: string;
  title?: string;
  message?: string;
};

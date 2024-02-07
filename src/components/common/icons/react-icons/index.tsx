import { IconBaseProps } from 'react-icons';
import { FaGithub } from 'react-icons/fa';
import { PiGitlabLogoSimpleBold } from 'react-icons/pi';
import { FaBloggerB } from 'react-icons/fa';
import { FaRegFolder } from 'react-icons/fa6';
import { CiShare1 } from 'react-icons/ci';

export function GitHubIcon(props: IconBaseProps) {
  return <FaGithub {...props} />;
}
export function BlogIcon(props: IconBaseProps) {
  return <FaBloggerB {...props} />;
}
export function GitlabIcon(props: IconBaseProps) {
  return <PiGitlabLogoSimpleBold {...props} />;
}
export function FolderIcon(props: IconBaseProps) {
  return <FaRegFolder {...props} />;
}
export function ShareIcon(props: IconBaseProps) {
  return <CiShare1 {...props} />;
}

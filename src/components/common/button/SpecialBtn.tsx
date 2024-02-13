import { ComponentProps } from "react";

type Props = ComponentProps<"button">;

export default function SpecialBtn({ className, ...props }: Props) {
  return <button className={`specialBtn ${className}`} {...props} />;
}

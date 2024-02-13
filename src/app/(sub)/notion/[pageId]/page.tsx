import NotionContent from "@/components/main-projects/NotionContent/NotionContext";
import { NotionAPI } from "notion-client";

type Props = {
  params: { pageId: string };
};

const notion = new NotionAPI();

export default async function NotionPage({ params: { pageId } }: Props) {
  const recordMap = await notion.getPage(pageId);
  return <NotionContent recordMap={recordMap} />;
}

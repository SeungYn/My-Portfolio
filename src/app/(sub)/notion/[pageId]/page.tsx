import NotionContent from '@/components/main-projects/NotionContent/NotionContext';
import { normalizeNotionRecordMap } from '@/util/notion';
import { NotionAPI } from 'notion-client';

type Props = {
	params: Promise<{ pageId: string }>;
};

const notion = new NotionAPI();

export default async function NotionPage({ params }: Props) {
	const { pageId } = await params;
	const recordMap = await notion.getPage(pageId);
	return <NotionContent recordMap={normalizeNotionRecordMap(recordMap)} />;
}

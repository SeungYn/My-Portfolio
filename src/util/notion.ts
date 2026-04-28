import { ExtendedRecordMap } from 'notion-types';

type NotionRecord = {
	spaceId?: string;
	value?: {
		value?: unknown;
		role?: string;
	};
};

function unwrapRecordValues<T extends Record<string, unknown>>(table: T): T {
	if (!table) {
		return table;
	}

	return Object.fromEntries(
		Object.entries(table).map(([id, record]) => {
			const notionRecord = record as NotionRecord;

			if (notionRecord?.value?.value) {
				return [
					id,
					{
						...(record as object),
						value: notionRecord.value.value,
						role: notionRecord.value.role,
					},
				];
			}

			return [id, record];
		})
	) as T;
}

export function normalizeNotionRecordMap(
	recordMap: ExtendedRecordMap
): ExtendedRecordMap {
	return {
		...recordMap,
		block: unwrapRecordValues(recordMap.block),
		collection: unwrapRecordValues(recordMap.collection),
		collection_view: unwrapRecordValues(recordMap.collection_view),
		notion_user: unwrapRecordValues(recordMap.notion_user),
	};
}

import { open } from '@tauri-apps/plugin-dialog';
import { readFile } from '@tauri-apps/plugin-fs';
import { read, utils } from 'xlsx';

import type { CommonAppActivity } from '$lib/types';

export const getFilePath = async (): Promise<string> => {
	// Open a dialog and ask the user to choose a file
	return (
		(await open({
			multiple: false,
			directory: false,
			filters: [
				{
					name: 'Spreadsheets',
					extensions: ['xlsx', 'xls', 'csv']
				}
			]
		})) ?? ''
	);
};

export const openFile = async (
	filePath: string | null
): Promise<CommonAppActivity[] | undefined> => {
	if (!filePath) return;

	const data = await readFile(filePath);
	const wb = read(data, { type: 'array' });

	if (!wb.SheetNames.length) return; // empty workbook

	const activeSheet = wb.Sheets[wb.SheetNames[0]];
	const activities = utils.sheet_to_json(activeSheet) as CommonAppActivity[];
	return activities;
};

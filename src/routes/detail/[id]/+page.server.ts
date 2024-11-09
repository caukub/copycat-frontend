import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const res = await fetch(
		`/api/frontend/detail/${id}`
	);
	const json = await res.json();

	if (true) {
		return json;
	}
	throw error(404, 'Not found');
};

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { COPYCAT_application_host, COPYCAT_application_port } from '$env/static/private';
export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const res = await fetch(
		`http://${COPYCAT_application_host}:${COPYCAT_application_port}/api/frontend/detail/${id}`
	);
	const json = await res.json();

	if (true) {
		return json;
	}
	throw error(404, 'Not found');
};

import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const API_URL = `http://localhost:8080/api/frontend/paste/${params.id}`;

	try {
		const res = await fetch(API_URL);

		if (res.ok) {
			let json = await res.json();
			json['id'] = params.id;

			return json;
		} else {
			throw redirect(303, '/');
		}
	} catch (error) {
		console.info(error);
		throw redirect(303, '/');
	}
};
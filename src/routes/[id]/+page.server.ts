import { redirect } from '@sveltejs/kit';

export async function load({ params }){
	const API_URL = `http://nginx:80/api/frontend/paste/${params.id}`;

	try {
		const res = await fetch(API_URL);

		if (res.ok) {
			let json = await res.json();
			json['id'] = params.id;

			if (json["error"] === true) {
				console.debug("Received expected error")
				redirect(303, '/')
			}

			return json;
		} else {
			redirect(303, '/');
		}
	} catch (error) {
		console.error('Error', error);
		redirect(303, '/');
	}
}

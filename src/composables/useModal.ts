import { ref, type ModelRef } from "vue";

import type Note from "../models/Note";
import type Arrow from "../models/Arrow";

export default function useModal(model: ModelRef<Note|Arrow|null>) {
	const showModal = ref(false);
	
	function closeModal() {
		model.value = null;
		showModal.value = false;
	}

	return {
		showModal,
		closeModal,
	};
}

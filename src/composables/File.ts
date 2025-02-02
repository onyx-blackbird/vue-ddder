import { ref } from "vue";

export default function useFile(dropText?: string) {

	const fileMessage = ref(dropText || 'Drag file here or click to select from disk');
	const fileContents = ref('');

	function onLoadFile(event: Event): void {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput && fileInput.files && fileInput.files.length === 1) {
			const file = fileInput.files.item(0);
			if (file !== null) {
				const reader = new FileReader();
				reader.onload = (): void => {
					fileMessage.value = file.name;
					fileContents.value = reader.result as string;
				}
				reader.readAsText(file);
			}
		}
	}
	
	function downloadAsJson(fileName: string, fileContents: string): void {
		const extension = (fileName.endsWith('.json')) ? '' : '.json';
		const url = window.URL.createObjectURL(new Blob([fileContents]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', fileName + extension);
		document.body.appendChild(link);
		link.click();
	}

	return {
		downloadAsJson,
		onLoadFile,
		fileMessage,
		fileContents,
	};

}

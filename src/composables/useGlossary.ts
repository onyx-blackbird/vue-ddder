import { eventStormStore } from '../store/EventStorm';

export default function useGlossary() {

	function getJson(): string {
		const glossary = eventStormStore.exportGlossary();
		return JSON.stringify(Object.fromEntries(glossary));
	}

	function getSimpleMarkdown(): string {
		const markdown = new Array<string>();
		markdown.push('# Glossary');
		eventStormStore.exportGlossary().forEach((translations, language) => {
			markdown.push(`\n## ${language}\n  `);
			translations.forEach(translation => {
				if (translation.title) {
					markdown.push(`**${translation.title}**  `);
					markdown.push(`${translation.description}  `);
				}
			});
		});
		return markdown.join('\n');
	}

	function getExtendedMarkdown(): string {
		const markdown = new Array<string>();
		markdown.push('# Glossary  ');
		const titleRow = new Array<string>();
		const titleLine = new Array<string>();
		const languages = eventStormStore.getState().languages;
		languages.forEach(language => {
			titleRow.push(`Title (${language})`);
			titleLine.push('---');
			titleRow.push(`Description (${language})`);
			titleLine.push('---');
		});
		markdown.push(`| ${titleRow.join(' | ')} |  `)
		markdown.push(`| ${titleLine.join(' | ')} |  `)
		const notes = eventStormStore.getState().notes;
		notes.forEach(note => {
			const row = new Array<string>();
			languages.forEach(language => {
				const translation = note.getTranslation(language);
				if (translation && translation.title) {
					row.push(`**${translation.title}**`);
					row.push(`${translation.description}`);
				} else {
					row.push('');
					row.push('');
				}
			});
			markdown.push(`| ${row.join(' | ')} |  `)
		});
		return markdown.join('\n');
	}

	return {
		getJson,
		getSimpleMarkdown,
		getExtendedMarkdown,
	};
}

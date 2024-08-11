import ranges from '$lib/data/kanjivg-ranges.json' assert { type: 'json' };

const codes = new Set();

for (const range of ranges) {
	if (typeof range === 'number') {
		codes.add(range);
	} else {
		for (let i = range[0]; i <= range[1]; i++) {
			codes.add(i);
		}
	}
}

export default function charHasImage(char: string) {
	let charCode = char.charCodeAt(0);
	return codes.has(charCode);
}

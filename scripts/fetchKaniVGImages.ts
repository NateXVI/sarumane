import os from 'os';
import path from 'path';
import unzipper from 'unzipper';
import fs from 'fs';
import { optimize } from 'svgo';

const args = process.argv.slice(2);

const cache = !args.includes('--no-cache');

const savePath = path.resolve(os.tmpdir(), 'kanjivg-all.zip');

let imagesZip: Uint8Array;

if (cache && fs.existsSync(savePath)) {
	console.log('loading from cache', savePath);
	imagesZip = fs.readFileSync(savePath);
} else {
	console.log('fetching images');
	imagesZip = await fetch(
		'https://github.com/KanjiVG/kanjivg/releases/download/r20240807/kanjivg-20240807-all.zip'
	)
		.then((res) => res.arrayBuffer())
		.then((buf) => new Uint8Array(buf));

	if (cache) {
		fs.writeFileSync(savePath, imagesZip);
	}
}
console.log('unzipping images');
const directory = await unzipper.Open.buffer(imagesZip as Buffer);

const imageDir = path.resolve(__dirname, '../static/images/kanjivg');
if (!fs.existsSync(imageDir)) {
	fs.mkdirSync(imageDir, { recursive: true });
}

let nums = new Set<number>();
let files: string[] = [];
let uncompressedSize = 0;
let compressedSize = 0;

for (let file of directory.files) {
	let fileName = path.basename(file.path, '.svg');
	const num = parseInt(fileName, 16);
	if (isNaN(num)) {
		console.log(`skipping ${fileName}`);
		continue;
	}
	nums.add(num);

	fileName = path.basename(file.path);
	const filePath = path.resolve(imageDir, fileName);
	console.log(`writing ${fileName} to ${filePath}`);
	const buffer = await file.buffer();
	uncompressedSize += buffer.length;
	const svg = await file
		.buffer()
		.then((b) => b.toString())
		.then(replaceKVGAttrs)
		.then((svg) => optimize(svg, { multipass: true }))
		.then((svg) => Buffer.from(svg.data));
	compressedSize += svg.length;
	fs.writeFileSync(filePath, svg);
	files.push(fileName);
}

// taken from https://github.com/pritulaziah/kanji-react-icons/blob/53c355afecebb45d0d685198cb86c77cea8e0c09/scripts/utils.ts
function replaceKVGAttrs(str: string) {
	const kvgAttrs = [
		'type',
		'element',
		'variant',
		'partial',
		'original',
		'number',
		'tradForm',
		'radicalForm',
		'position',
		'radical',
		'part',
		'phon'
	];

	for (const kvgAttr of kvgAttrs) {
		str = str.replace(new RegExp(`kvg:${kvgAttr}="[^"]*"`, 'g'), '');
	}

	return str;
}

let sortedNums = [...nums].sort((a, b) => a - b);

let ranges: [number, number?][] = [];

for (let num of sortedNums) {
	if (ranges.length === 0) {
		ranges.push([num, num]);
		continue;
	}
	const lastIndex = ranges.length - 1;
	if (ranges[lastIndex][1] === num - 1) {
		ranges[lastIndex][1] = num;
	} else {
		if (ranges[lastIndex][0] === ranges[lastIndex][1]) {
			ranges[lastIndex] = [ranges[lastIndex][0]];
		}
		ranges.push([num, num]);
	}
}

for (let i = 0; i < ranges.length - 1; i++) {
	const firstRange = ranges[i];
	const secondRange = ranges[i + 1];
	const firstRangeEnd = firstRange[firstRange.length - 1]!;
	const secondRangeStart = secondRange[0];
	if (firstRangeEnd >= secondRangeStart - 1) {
		throw new Error(`rages ${firstRange} and ${secondRange} are overlapping`);
	}
}

const json = JSON.stringify(
	ranges
		.map((range) => {
			if (range.length === 1) {
				return range[0];
			}
			return [range[0], range[1]!] as [number, number];
		})
		.reduce(
			(acc, range) => {
				if (typeof range === 'number') {
					return [...acc, range];
				}
				if (range[0] === range[1] - 1) {
					return [...acc, range[0], range[1]];
				}
				return [...acc, range];
			},
			[] as (number | [number, number])[]
		)
);

const utf8Json = new TextEncoder().encode(json);
console.log(`writing ${utf8Json.length} bytes to kanjivg-ranges.json`);
fs.writeFileSync(path.resolve(__dirname, '../src/lib/data/kanjivg-ranges.json'), utf8Json);
console.log(`total files: ${files.length}`);
console.log(`total uncompressed size: ${uncompressedSize} bytes`);
console.log(`total compressed size:   ${compressedSize} bytes`);
console.log(`compression ratio: ${Math.round((compressedSize / uncompressedSize) * 100)}%`);

import fs from 'fs/promises';
import { Chunk, WPlace } from './lib/WPlace';
import Logger from './lib/logger';
import './lib/pollyfil';

const wPlace = new WPlace(true);

const start = {
    col: 479,
    row: 782
} satisfies Chunk;

const end = {
    col: 480,
    row: 783
} satisfies Chunk;

(async () => {
    const FILE_NAME = 'output.png';

    const cwd = process.cwd();

    const l = new Logger('Main', 'cyan');
    l.start('Starting download...');
    const chunks = await wPlace.fetchChunksInRange(start, end);
    const image = await wPlace.constructImage(chunks);
    await fs.writeFile(FILE_NAME, await image.toBuffer());
    l.stop(`Download complete! ${cwd}/${FILE_NAME}`);
})();

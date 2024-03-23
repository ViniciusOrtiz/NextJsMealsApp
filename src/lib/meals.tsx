import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { randomUUID } from 'node:crypto';

const db = sql('meals.db');

export async function getMeals() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error('Failed to fetch meals')
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug: any) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal: any) {
    const slug = slugify(meal.title, { lower: true });

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.title}-${randomUUID()}.${extension}`;
    console.log(meal)

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            console.error('Failed to save image', error);
            throw new Error('Failed to save image');
        }
    });

    const image = `/images/${fileName}`;
        
    const stmt = db.prepare(
        'INSERT INTO meals (slug, creator, creator_email, title, summary, instructions, image) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    stmt.run(
        slug,
        xss(meal.creator),
        xss(meal.creator_email),
        xss(meal.title),
        xss(meal.summary),
        xss(meal.instructions),
        xss(image)
    );
}
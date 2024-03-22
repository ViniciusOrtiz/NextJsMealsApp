import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error('Failed to fetch meals')
    return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug: any) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export function saveMeal(meal: any) {
    const slug = slugify(meal.title, { lower: true });
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
        xss(meal.image)
    );
}
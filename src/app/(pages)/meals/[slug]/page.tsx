import Image from 'next/image';
import { getMeal } from '../../../../lib/meals';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

export async function generateMetadata({params}: any) {
  var meal = getMeal(params.slug) as any

  if(!meal) {
    notFound()
  }
  
  return {
    title: meal.title,
    description: meal.summary
  };
}

export default async function MealsSlugPage({params}: any) {
  var meal = getMeal(params.slug) as any

  if(!meal) {
    notFound()
  }
  
  var instructions = meal.instructions.replace(/\n/g, '<br/>')
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.alt} fill/>
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${'EMAIL'}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>
            {meal.summary}
          </p>
        </div>
      </header>
      <main>
        <p className={styles.instructions} dangerouslySetInnerHTML={{
          __html: instructions
        }}></p>
      </main>
    </>
  )
}
'use client';

import MealsImagePicker from '@/components/meals-image-picker/meals-image-picker';
import styles from './page.module.css';
import { shareMeal } from '@/lib/action';
import MealsFormSubmit from '@/components/meals-form-submit/meals-form-submit';
import { useFormState } from 'react-dom';

export default function MealsSharePage() {
  const [state, formAction] = useFormState((previousState: { message: string; }, formData: FormData) => shareMeal(previousState, formData), { message: '' });

  return (
      <>
        <header className={styles.header}>
          <h1>
            Share your <span className={styles.highlight}>favorite meal</span>
          </h1>
          <p>Or any other meal you feel needs sharing!</p>
        </header>
        <main className={styles.main}>
          <form className={styles.form} action={formAction}>
            <div className={styles.row}>
              <p>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" name="name" required />
              </p>
              <p>
                <label htmlFor="email">Your email</label>
                <input type="email" id="email" name="email" required />
              </p>
            </div>
            <p>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required />
            </p>
            <p>
              <label htmlFor="summary">Short Summary</label>
              <input type="text" id="summary" name="summary" required />
            </p>
            <p>
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                rows={10}
                required
              ></textarea>
            </p>
            <MealsImagePicker label='Your Image' name='image'/>
            {state.message && <p>{state.message}</p>}
            <p className={styles.actions}>
              <MealsFormSubmit/>
            </p>
          </form>
        </main>
      </>
  );
}
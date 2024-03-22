'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text: string) {
    return !text || text.trim() == '';
}

export async function shareMeal(previousState: any, formData: FormData) {
    const meal = {
        creator: formData.get('name') as string,
        creator_email: formData.get('email') as string,
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        instructions: formData.get('instructions') as string,
        image: formData.get('image') as File,
    };

    if(
        isInvalidText(meal.creator) || 
        isInvalidText(meal.creator_email) || 
        isInvalidText(meal.title) || 
        isInvalidText(meal.summary) || 
        isInvalidText(meal.instructions) || 
        !meal.creator_email.includes('@') ||
        !meal.image ||
        meal.image.size === 0
    ) 
    {
        return {
            message: 'Invalid input',
        };
    }

    await saveMeal(meal);

    redirect('/meals');
}

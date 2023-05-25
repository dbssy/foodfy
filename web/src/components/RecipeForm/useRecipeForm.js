import { useImperativeHandle, useState } from 'react';

import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useErrors from '@/hooks/useErrors';

export default function useRecipeForm(onSubmit, ref) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [recipeUserId, setRecipeUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userId } = useAuthenticatedUser();

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (
    title
    && description
    && difficulty
    && prepTime
    && servings
    && ingredients.length > 0
    && instructions.length > 0
    && errors.length === 0
  );

  useImperativeHandle(ref, () => ({
    setFieldsValues: (recipe) => {
      setTitle(recipe.title ?? '');
      setDescription(recipe.description ?? '');
      setDifficulty(recipe.difficulty ?? '');
      setPrepTime(recipe.prepTime ?? 0);
      setServings(recipe.servings ?? 0);
      setIngredients(recipe.ingredients ?? []);
      setInstructions(recipe.instructions ?? []);
      setImage(recipe.imageUrl ?? '');
      setRecipeUserId(recipe.userId ?? null);
    },
  }), []);

  function handleTitleChange(event) {
    setTitle(event.target.value);

    if (!event.target.value) {
      setError({ field: 'title', message: 'O título deve ser fornecido.' });
    } else {
      removeError('title');
    }
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);

    if (!event.target.value) {
      setError({ field: 'description', message: 'A descrição deve ser fornecida.' });
    } else {
      removeError('description');
    }
  }

  function handleDifficultyChange(event) {
    setDifficulty(event.target.value);

    if (!event.target.value) {
      setError({ field: 'difficulty', message: 'A dificuldade deve ser fornecida.' });
    } else {
      removeError('difficulty');
    }
  }

  function handlePrepTimeChange(event) {
    setPrepTime(event.target.value);

    if (!event.target.value) {
      setError({ field: 'prepTime', message: 'O tempo de preparo deve ser fornecido.' });
    } else {
      removeError('prepTime');
    }
  }

  function handleServingsChange(event) {
    setServings(event.target.value);

    if (!event.target.value) {
      setError({ field: 'servings', message: 'O rendimento deve ser fornecido.' });
    } else {
      removeError('servings');
    }
  }

  function handleImageChange(event) {
    setFile(event.target.files[0]);
  }

  function handleInputChange(index, field, event) {
    const newArray = [...(field === 'ingredient' ? ingredients : instructions)];
    newArray[index] = event.target.value;

    if (!event.target.value) {
      setError({ field, message: `O campo de ${field === 'ingredient' ? 'ingrediente' : 'instrução'} deve ser fornecido.` });
    } else {
      removeError(field);
    }

    if (field === 'ingredient') {
      setIngredients(newArray);
    } else {
      setInstructions(newArray);
    }
  }

  function handleAdd(field) {
    if (field === 'ingredient') {
      setIngredients([...ingredients, '']);
    } else {
      setInstructions([...instructions, '']);
    }
  }

  function handleDelete(index, field) {
    const newArray = [...(field === 'ingredient' ? ingredients : instructions)];
    newArray.splice(index, 1);

    if (field === 'ingredient') {
      setIngredients(newArray);
    } else {
      setInstructions(newArray);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const formattedIngredients = JSON.stringify(ingredients).replace(/\[/g, '{').replace(/\]/g, '}');
    const formattedInstructions = JSON.stringify(instructions).replace(/\[/g, '{').replace(/\]/g, '}');
    const user_id = recipeUserId !== userId ? recipeUserId : userId;

    if (file) {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('difficulty', difficulty);
      formData.append('prep_time', prepTime);
      formData.append('servings', servings);
      formData.append('ingredients', formattedIngredients);
      formData.append('instructions', formattedInstructions);
      formData.append('image_url', file);
      formData.append('user_id', user_id);

      await onSubmit(formData);
    } else {
      await onSubmit({
        title,
        description,
        difficulty,
        prepTime,
        servings,
        ingredients: formattedIngredients,
        instructions: formattedInstructions,
        user_id,
      });
    }

    setIsSubmitting(false);
  }

  return {
    title,
    description,
    difficulty,
    prepTime,
    servings,
    ingredients,
    instructions,
    image,
    isFormValid,
    isSubmitting,
    getErrorMessageByFieldName,
    handleTitleChange,
    handleDescriptionChange,
    handleDifficultyChange,
    handlePrepTimeChange,
    handleServingsChange,
    handleImageChange,
    handleInputChange,
    handleAdd,
    handleDelete,
    handleSubmit,
  };
}

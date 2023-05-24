class RecipeMapper {
  toPersistence(domainRecipe) {
    return {
      id: domainRecipe.id,
      title: domainRecipe.title,
      description: domainRecipe.description,
      difficulty: domainRecipe.difficulty,
      prep_time: domainRecipe.prepTime,
      servings: domainRecipe.servings,
      ingredients: domainRecipe.ingredients,
      instructions: domainRecipe.instructions,
      image_url: domainRecipe?.file || domainRecipe?.image,
      user_id: domainRecipe.userId,
    };
  }

  toDomain(persistenceRecipe) {
    return {
      id: persistenceRecipe.id,
      title: persistenceRecipe.title,
      description: persistenceRecipe.description,
      author: persistenceRecipe.author,
      difficulty: persistenceRecipe.difficulty,
      prepTime: persistenceRecipe.prep_time,
      servings: persistenceRecipe.servings,
      ingredients: persistenceRecipe.ingredients,
      instructions: persistenceRecipe.instructions,
      imageUrl: persistenceRecipe.image_url,
      userId: persistenceRecipe.user_id,
    };
  }
}

export default new RecipeMapper();

/* eslint-disable react/no-array-index-key */
import { Plus } from 'phosphor-react';

import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Form, Section } from './styles';

import useRecipeForm from './useRecipeForm';

import Button from '@/components/Button';
import FormGroup from '@/components/FormGroup';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Select from '@/components/Select';

const RecipeForm = forwardRef(({ headerLabel, buttonLabel, onSubmit }, ref) => {
  const {
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
  } = useRecipeForm(onSubmit, ref);

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <header>
        <h2>{headerLabel}</h2>

        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </header>

      <Section>
        <div className="recipe-image">
          {image && (
            <img
              src={`http://localhost:3333/images/${image}`}
              alt="Capa da receita"
            />
          )}

          <label htmlFor="image">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />

            <span>
              <Plus size={32} />
            </span>
          </label>

          <p>* Selecione uma imagem para ser a capa da sua receita.</p>
        </div>

        <div className="recipe-info">
          <FormGroup error={getErrorMessageByFieldName('title')}>
            <label htmlFor="title">Título</label>
            <Input
              id="title"
              type="text"
              placeholder="Dê um título para a sua receita"
              value={title}
              onChange={handleTitleChange}
              error={getErrorMessageByFieldName('title')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('description')}>
            <label htmlFor="description">Descrição</label>
            <Textarea
              id="description"
              placeholder="Coloque uma descrição da sua receita"
              value={description}
              onChange={handleDescriptionChange}
              error={getErrorMessageByFieldName('description')}
              disabled={isSubmitting}
            />
          </FormGroup>

          <div className="three-columns">
            <div>
              <FormGroup error={getErrorMessageByFieldName('difficulty')}>
                <label htmlFor="difficulty">Dificuldade</label>
                <Select
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  error={getErrorMessageByFieldName('difficulty')}
                  disabled={isSubmitting}
                >
                  <option value="">Escolha a dificuldade</option>

                  <option value="fácil">Fácil</option>
                  <option value="médio">Médio</option>
                  <option value="difícil">Difícil</option>
                </Select>
              </FormGroup>
            </div>

            <div>
              <FormGroup error={getErrorMessageByFieldName('prepTime')}>
                <label htmlFor="prepTime">Tempo de Preparo</label>
                <Input
                  id="prepTime"
                  type="number"
                  placeholder="120 minutos"
                  value={prepTime}
                  onChange={handlePrepTimeChange}
                  error={getErrorMessageByFieldName('prepTime')}
                  disabled={isSubmitting}
                />
              </FormGroup>
            </div>

            <div>
              <FormGroup error={getErrorMessageByFieldName('servings')}>
                <label htmlFor="servings">Rendimento (em porções)</label>
                <Input
                  id="servings"
                  type="number"
                  placeholder="10 porções"
                  value={servings}
                  onChange={handleServingsChange}
                  error={getErrorMessageByFieldName('servings')}
                  disabled={isSubmitting}
                />
              </FormGroup>
            </div>
          </div>

          <div className="two-columns">
            <div>
              <FormGroup error={getErrorMessageByFieldName('ingredient')}>
                <label>Ingredientes</label>

                {ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      placeholder="Ingrediente"
                      value={ingredient}
                      onChange={(event) => handleInputChange(index, 'ingredient', event)}
                      error={getErrorMessageByFieldName('ingredient')}
                      disabled={isSubmitting}
                    />

                    <button
                      type="button"
                      className="remove"
                      onClick={() => handleDelete(index, 'ingredient')}
                    >
                      Remover
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="add"
                  onClick={() => handleAdd('ingredient')}
                >
                  Adicionar Ingrediente
                </button>
              </FormGroup>
            </div>

            <div>
              <FormGroup error={getErrorMessageByFieldName('instruction')}>
                <label>Instruções</label>

                {instructions.map((instruction, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      placeholder="Instrução"
                      value={instruction}
                      onChange={(event) => handleInputChange(index, 'instruction', event)}
                      error={getErrorMessageByFieldName('instruction')}
                      disabled={isSubmitting}
                    />

                    <button
                      type="button"
                      className="remove"
                      onClick={() => handleDelete(index, 'instruction')}
                    >
                      Remover
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="add"
                  onClick={() => handleAdd('instruction')}
                >
                  Adicionar Instrução
                </button>
              </FormGroup>
            </div>
          </div>
        </div>
      </Section>
    </Form>
  );
});

RecipeForm.propTypes = {
  headerLabel: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RecipeForm;

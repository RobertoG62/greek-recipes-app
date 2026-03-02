/* ======================================
   Data Layer — Fetch, Search, Filter
   ====================================== */

const RecipeData = (() => {
    const state = {
        recipes: [],
        filteredRecipes: [],
        searchQuery: '',
        activeCategory: 'הכל',
        categories: [],
        isLoaded: false,
    };

    async function fetchRecipes() {
        const response = await fetch('data/recipes.json');
        if (!response.ok) throw new Error('Failed to load recipes');
        const data = await response.json();
        state.recipes = data.recipes;
        state.filteredRecipes = [...state.recipes];
        state.categories = ['הכל', ...new Set(state.recipes.map(r => r.category))];
        state.isLoaded = true;
        return state;
    }

    function filterRecipes(query, category) {
        state.searchQuery = (query || '').trim();
        state.activeCategory = category || 'הכל';

        state.filteredRecipes = state.recipes.filter(recipe => {
            const matchesCategory = state.activeCategory === 'הכל' || recipe.category === state.activeCategory;
            if (!matchesCategory) return false;
            if (!state.searchQuery) return true;

            const q = state.searchQuery.toLowerCase();
            return (
                recipe.title.toLowerCase().includes(q) ||
                recipe.description.toLowerCase().includes(q) ||
                recipe.ingredients.some(ing => ing.name.toLowerCase().includes(q)) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(q))
            );
        });

        return state.filteredRecipes;
    }

    function getRecipeById(id) {
        return state.recipes.find(r => r.id === id) || null;
    }

    function getState() {
        return state;
    }

    return { fetchRecipes, filterRecipes, getRecipeById, getState };
})();

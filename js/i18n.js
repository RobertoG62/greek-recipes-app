const i18n = (() => {
    let currentLang = 'he';

    const translations = {
        he: {
            meta: {
                title: 'המטבח היווני — מתכונים אותנטיים',
                description: 'המטבח היווני — מתכונים אותנטיים מיווני, בעברית.'
            },
            header: {
                logo: 'המטבח היווני',
                backToRecipes: 'חזרה למתכונים'
            },
            hero: {
                title: 'המטבח',
                titleHighlight: 'היווני',
                subtitle: 'מתכונים אותנטיים מהלב של אתונה',
                searchPlaceholder: 'חיפוש מתכון...'
            },
            categories: {
                all: 'הכל',
                'מרקים': 'מרקים',
                'מנות עיקריות': 'מנות עיקריות',
                'מאפים ולחמים': 'מאפים ולחמים',
                'קינוחים': 'קינוחים',
                'רטבים ותוספות': 'רטבים ותוספות'
            },
            difficulty: {
                'קל': 'קל',
                'בינוני': 'בינוני',
                'מאתגר': 'מאתגר'
            },
            detail: {
                prepTime: 'זמן הכנה',
                cookTime: 'זמן בישול',
                servings: 'מנות',
                difficulty: 'רמת קושי',
                ingredients: 'מצרכים',
                instructions: 'הוראות הכנה',
                categories: 'קטגוריות',
                whatsappShare: 'שלח רשימת קניות ב-WhatsApp',
                minutes: 'דקות',
                people: 'אנשים'
            },
            search: {
                noResults: 'לא נמצאו מתכונים',
                tryAgain: 'נסו לשנות את מילות החיפוש או לבחור קטגוריה אחרת',
                clearFilters: 'נקה חיפוש',
                resultsCount: '{count} מתכונים'
            },
            loading: 'טוען מתכונים...',
            footer: {
                tagline: 'המטבח היווני — מתכונים אותנטיים מיוון, בעברית',
                backToHub: 'לעוד מתכוני עולם — חזרה לרכזת המתכונים'
            }
        },
        en: {
            meta: {
                title: 'The Greek Kitchen — Authentic Recipes',
                description: 'The Greek Kitchen — Authentic Greek recipes in English.'
            },
            header: {
                logo: 'The Greek Kitchen',
                backToRecipes: 'Back to Recipes'
            },
            hero: {
                title: 'The Greek',
                titleHighlight: 'Kitchen',
                subtitle: 'Authentic recipes from the heart of Athens',
                searchPlaceholder: 'Search recipe...'
            },
            categories: {
                all: 'All',
                'מרקים': 'Soups',
                'מנות עיקריות': 'Main Courses',
                'מאפים ולחמים': 'Baked Goods',
                'קינוחים': 'Desserts',
                'רטבים ותוספות': 'Sauces & Sides'
            },
            difficulty: {
                'קל': 'Easy',
                'בינוני': 'Medium',
                'מאתגר': 'Hard'
            },
            detail: {
                prepTime: 'Prep Time',
                cookTime: 'Cook Time',
                servings: 'Servings',
                difficulty: 'Difficulty',
                ingredients: 'Ingredients',
                instructions: 'Instructions',
                categories: 'Categories',
                whatsappShare: 'Share shopping list on WhatsApp',
                minutes: 'minutes',
                people: 'people'
            },
            search: {
                noResults: 'No recipes found',
                tryAgain: 'Try different search terms or select another category',
                clearFilters: 'Clear search',
                resultsCount: '{count} recipes'
            },
            loading: 'Loading recipes...',
            footer: {
                tagline: 'The Greek Kitchen — Authentic recipes from Greece',
                backToHub: 'More world recipes — Back to Recipe Hub'
            }
        }
    };

    function t(key) {
        const keys = key.split('.');
        let value = translations[currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value || key;
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language not supported: ${lang}`);
            return;
        }
        currentLang = lang;
    }

    function getLanguage() {
        return currentLang;
    }

    function detectLanguage() {
        const saved = localStorage.getItem('lang');
        if (saved && translations[saved]) {
            return saved;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('he')) return 'he';
        return 'en';
    }

    function init() {
        const detectedLang = detectLanguage();
        setLanguage(detectedLang);
        return detectedLang;
    }

    return {
        t,
        setLanguage,
        getLanguage,
        detectLanguage,
        init
    };
})();

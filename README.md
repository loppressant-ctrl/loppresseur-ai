# L'Oppresseur AI — Fix 404 (Vercel)

## Pourquoi tu voyais 404
Sur Vercel, le dossier /public est "spécial" pour Next.js.
Pour un projet statique simple, `index.html` doit être à la racine du projet.

## Déploiement (Vercel)
1) Remplace `logo_youtube2.png` par ton vrai logo (même nom).
2) Dans Vercel > Settings > Environment Variables:
   - OPENAI_API_KEY (obligatoire)
   - OPENAI_MODEL (optionnel, défaut: gpt-4.1-mini)
   - OPENAI_TEMPERATURE (optionnel)
   - OPENAI_MAX_TOKENS (optionnel)
3) Redeploy.

## Endpoint
Le frontend POST vers `/api/generate`.

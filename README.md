# famBeta

Acesta este un proiect React Native construit cu Expo si Expo Router. Aplicatia foloseste Supabase pentru backend.

## Instalare

1. Asigura-te ca ai instalat **Node.js** si **npm**.
2. Instaleaza dependentele:
   ```bash
   npm install
   ```
3. Copiaza fisierul `.env.example` la radacina proiectului sub numele `.env` si completeaza variabilele:
   ```bash
   cp .env.example .env
   ```
   Actualizeaza valorile pentru:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=<url_supabase>
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<cheie_anon>
   ```

## Rulare in modul de dezvoltare

Porneste serverul de dezvoltare folosind scriptul predefinit:
```bash
npm run dev
```

Comenzi utile pentru platforme specifice:
```bash
npm run android   # ruleaza pe emulator/dispozitiv Android
npm run ios       # ruleaza pe simulator iOS
npm run web       # ruleaza versiunea web
```

Pentru mai multe informatii consulta documentatia [Expo](https://docs.expo.dev/).

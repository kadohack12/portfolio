# Kadohack12 — Portfolio

Portfolio personnel de **Kadohack12** : cybersécurité, IA locale et automatisation.

Site statique construit avec React et Vite, déployé sur Cloudflare Pages.

**En ligne :** https://kadohack12.pages.dev

---

## Aperçu

Une page unique, éditoriale et sombre, qui présente un parcours, un profil orienté SOC
et huit projets. Le site est entièrement statique : aucun serveur, aucune base de
données, aucune donnée envoyée à un tiers.

### Contenu du site

| Section | Contenu |
| --- | --- |
| Profil | Manifeste, laboratoires (HTB, TryHackMe, Root-Me), stack principale |
| Dossier SOC | Classement TryHackMe, rooms, séries, badges, axes d'analyse |
| Journal d'opérations | Les huit projets, avec fiche détaillée par projet |
| Outils & méthodes | Quatre domaines de compétences et bande technologique |
| Trajectoire | Parcours : fondations, terrain, collectif, aujourd'hui |
| Contact | Canaux officiels et signature copiable |

### Projets présentés

Projets personnels, non publiés sur GitHub :

- **Agentic Cinema** — orchestration d'agents autonomes multi-étapes (Gemini API, ADK, MCP)
- **ICMP Ghost Tunnel** — stéganographie réseau autour des paquets ICMP (Python, Wireshark)
- **Signal Dispatch** — pipeline de veille RSS vers canaux de diffusion (n8n, Ollama)

Projets avec dépôt public :

- **[AdversarySim-AI](https://github.com/kadohack12/AdversarySim-AI)** — émulation d'adversaire assistée par LLM locaux
- **[Lockstate](https://github.com/kadohack12/Lockstate)** — audit de sécurité local en binaire unique (Go)
- **[CheckSafe](https://check-safe-beryl.vercel.app)** — détection d'arnaques numériques pour le grand public
- **[LootZero Engine](https://github.com/kadohack12/lootzero-engine)** — veille et diffusion automatisée multi-canal
- **[System Hardening Hub](https://github.com/kadohack12/system-hardening-hub)** — scripts de durcissement Windows et Linux

---

## Stack technique

- **React 19** avec **TypeScript**
- **Vite 7** — build et serveur de développement
- **Tailwind CSS 4** — styles
- **wouter** — routage côté client
- **framer-motion** — animations
- **Radix UI** — composants d'interface accessibles
- **lucide-react** — icônes

Le langage visuel du site s'appelle *Circuit de Lumen* : fond minéral sombre
(`#08131a`), accent cyan (`#4ff6d7`) et cuivre (`#d98d4c`).

---

## Démarrer en local

Prérequis : **Node.js 20.19 ou plus récent** et **pnpm**.

```bash
pnpm install
pnpm dev
```

Le site est servi sur `http://localhost:5173`.

### Scripts

| Commande | Rôle |
| --- | --- |
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production dans `dist/` |
| `pnpm preview` | Prévisualisation du build |
| `pnpm check` | Vérification TypeScript (`tsc --noEmit`) |
| `pnpm format` | Formatage avec Prettier |

---

## Structure

```text
.
├── client/
│   ├── index.html              # coquille HTML, métadonnées SEO, favicon
│   ├── public/
│   │   └── media/              # visuels SVG (hero, signal, core, mark)
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx        # page principale et contenu des projets
│       │   └── NotFound.tsx
│       ├── components/ui/      # composants d'interface
│       ├── contexts/           # thème
│       ├── hooks/
│       ├── lib/
│       ├── App.tsx             # point d'entrée et routage
│       └── index.css           # styles globaux
├── patches/                    # correctifs de dépendances
├── vite.config.ts
└── package.json
```

Le contenu éditorial — projets, compétences, parcours — se trouve dans
`client/src/pages/Home.tsx`.

---

## Déploiement

Le build produit un site statique dans `dist/`, déployé sur Cloudflare Pages.

```bash
pnpm build
```

---

## Licence et identité

Ce dépôt est publié pour consultation, pas pour réutilisation.

Le code et le contenu sont **tous droits réservés**. Le nom, l'alias et l'identité
**Kadohack12** ne sont couverts par aucune licence et ne peuvent pas être réutilisés.

Voir [LICENSE](LICENSE) pour les détails.

---

## Contact

- Site : https://kadohack12.pages.dev
- TryHackMe : https://tryhackme.com/p/kadohack12
- GitHub : https://github.com/kadohack12

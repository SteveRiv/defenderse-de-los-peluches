# 🎮 Defenderse de los Peluches

Un juego tower defense educativo construido con **Next.js + React + Phaser** donde los jugadores aprenden conceptos de programación mientras defienden su base contra enemigos.

## 🎯 Features

- 🕹️ **Gameplay**: Coloca defensas (torres) para eliminar enemigos (peluches)
- 📚 **Conceptos educativos**: Cada enemigo enseña un concepto de programación
- 💾 **Sincronización en tiempo real**: Progreso guardado en Supabase
- 🎨 **Animaciones suaves**: Transiciones con Framer Motion
- 📱 **Responsive**: Funciona en móvil y desktop
- 🏆 **Leaderboard**: Competir con otros jugadores en tiempo real

## 🛠️ Tech Stack

| Tecnología | Uso |
|-----------|-----|
| **Next.js 16** | Framework fullstack |
| **React 19** | UI components |
| **TypeScript** | Type safety |
| **Phaser 4** | Motor de juegos 2D |
| **Supabase** | Backend + Auth + Realtime |
| **Tailwind CSS** | Estilos |
| **Zustand** | State management |
| **Framer Motion** | Animaciones |
| **Vercel** | Deployment |

## 🚀 Demo en vivo

👉 **[Juega aquí](https://defenderse-de-los-peluches.vercel.app)**

## 📦 Instalación local

```bash
# Clonar repositorio
git clone https://github.com/SteveRiv/defenderse-de-los-peluches.git
cd defenderse-de-los-peluches

# Instalar dependencias
npm install

# Crear .env.local con tus keys de Supabase
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
EOF

# Ejecutar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

## 🎮 Cómo jugar

1. **Selecciona torres** de defensa en la tienda
2. **Colócalas en el mapa** para bloquear enemigos
3. **Aprende conceptos** leyendo las fichas de cada enemigo
4. **Sube de nivel** derrotando olas de enemigos
5. **Compra mejoras** para tus defensas

## 📊 Conceptos enseñados

- Variables y tipos de datos
- Loops (for, while)
- Condicionales (if/else)
- Funciones
- Arrays
- Objetos
- Recursión
- Scope y closures
- Promesas y async/await
- Y más...

## 🏗️ Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx           ← Landing/Login
│   ├── game/
│   │   └── page.tsx       ← Juego principal
│   └── leaderboard/
│       └── page.tsx       ← Top jugadores
├── components/
│   ├── GameBoard.tsx      ← Tablero principal
│   ├── TowerShop.tsx      ← Tienda de torres
│   └── ConceptCard.tsx    ← Fichas de conceptos
├── lib/
│   ├── gameLogic.ts       ← Lógica del juego
│   ├── supabase.ts        ← Cliente Supabase
│   └── types.ts           ← TypeScript types
└── styles/
    └── globals.css        ← Tailwind
```

## 🧪 Testing

```bash
npm run build    # Verificar build
npm run lint     # ESLint
```

## 📈 Monitoreo

- Performance: Vercel Speed Insights
- Errores: Sentry
- Analytics: Vercel Analytics

## 🎯 Skills demostrados

✅ Full-stack development (Next.js)
✅ Game development (Phaser)
✅ Real-time synchronization (Supabase)
✅ Responsive design (Tailwind)
✅ State management (Zustand)
✅ Deployment (Vercel)
✅ TypeScript + ESLint
✅ Animations (Framer Motion)

## 📝 Roadmap

- [ ] Más conceptos educativos
- [ ] Diferentes mapas y dificultades
- [ ] Sistema de logros
- [ ] Chat en tiempo real entre jugadores
- [ ] Mobile app (React Native)
- [ ] Integración con plataformas educativas

## 💡 Aprendizajes

Este proyecto me permitió aprender:
- Arquitectura de games en web
- Supabase Realtime para multiplayer
- Optimización de rendimiento en juegos
- Deployment en Vercel
- Game design principles

## 🔗 Enlaces

- 🎮 **Demo**: https://defenderse-de-los-peluches.vercel.app
- 💻 **GitHub**: https://github.com/SteveRiv/defenderse-de-los-peluches
- 📧 **Email**: steveriveraodar@gmail.com
- 🔗 **LinkedIn**: https://linkedin.com/in/steve-rivera-odar

## 📊 Métricas

- ✅ **TypeScript**: 0 errores
- ✅ **Performance**: Vercel Speed Insights > 80
- ✅ **Mobile responsive**: Tested en múltiples devices
- ✅ **ESLint**: 0 warnings

---

**Hecho con ❤️ usando Next.js, Phaser y Supabase**

*Aprende programación jugando | Educational Game | Perú 🇵🇪*

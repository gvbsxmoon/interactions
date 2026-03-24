# Learnings

## Coordinate polari per layout ad arco (Fan Menu)

### Il centro del sistema non e' il bottone

Quando le chip si dispongono su un arco, il centro del cerchio e' un punto esterno (es. angolo basso-sinistro del box), NON il bottone. Il bottone e' solo un punto sulla circonferenza.

### Calcolo del raggio

Il raggio e' la distanza tra il centro del sistema polare e il centro del bottone (teorema di Pitagora):

```
r = Math.sqrt(dx * dx + dy * dy)
```

### Angolo del bottone

L'angolo del bottone rispetto al centro si ricava con:

```
buttonAngle = Math.atan2(by, bx)
```

### Distribuzione delle chip sull'arco

Per N chip distribuite su un arco da `startAngle` a `endAngle`:

```
angle_i = startAngle + i * ((endAngle - startAngle) / (N - 1))
```

### Conversione a coordinate CSS

CSS ha l'asse Y invertito (cresce verso il basso), quindi:

```
x = r * Math.cos(angle_i)
y = -(r * Math.sin(angle_i))   // negato per CSS
```

### Offset relativo al bottone

Se le chip partono dalla posizione CSS del bottone, l'offset per framer-motion e':

```
x = chipX - buttonX
y = -(chipY - buttonY)
```

### Rotazione delle chip

Per rendere una chip perpendicolare all'arco (allineata al raggio), la rotazione e' semplicemente l'angolo stesso, negato per CSS:

```
rotate = -(angle_i * 180 / Math.PI)
```

---

## Framer Motion: controls vs animate inline

### Inline `animate`

Reagisce al cambio di valori. Per animazioni dichiarative:

```jsx
animate={{ x: isOpen ? 100 : 0 }}
```

### `useAnimation()` controls

Imperativo, per orchestrare sequenze di step:

```jsx
await controls.start({ scale: 1.15 })
await controls.start({ scale: 1, rotate: -45 })
```

### Regola pratica

- Animazione che risponde a uno stato -> **inline**
- Sequenza di step o trigger da codice -> **controls**
- Si possono mescolare nello stesso componente

---

## Framer Motion: Spring vs Easing

### Easing (duration-based)

- Durata fissa con `duration` e `ease`
- Per: opacity, colori, blur, layout transitions

### Spring (physics-based)

- La durata emerge dalla fisica, non si imposta direttamente
- `stiffness` — alto = veloce/scattante, basso = lenta/morbida
- `damping` — alto = si ferma subito, basso = rimbalza
- `mass` — alto = piu' inerzia, piu' lenta
- Per: posizione, scala, rotazione — tutto cio' che e' "fisico"

### Durata approssimativa di una spring

```
stiffness: 150, damping: 18 -> ~0.5s
stiffness: 300, damping: 20 -> ~0.3s
stiffness: 80,  damping: 12 -> ~0.8s
```

Critically damped (no rimbalzo): `damping >= 2 * sqrt(stiffness * mass)`

### Cheat sheet micro-interazioni

| Tipo                | Usa                                      |
|---------------------|------------------------------------------|
| Hover/press scale   | spring (stiffness: 400, damping: 17)     |
| Apertura menu/modal | spring (stiffness: 200, damping: 22)     |
| Fade in/out         | easing, 0.15-0.3s                        |
| Blur in/out         | easing, 0.2-0.4s                         |
| Slide in            | spring (stiffness: 300, damping: 25)     |
| Colore/background   | easing, 0.15s                            |
| Drag release        | spring (stiffness: 500, damping: 30)     |

### TL;DR

Spring per il movimento, easing per le proprieta' visive (opacity, blur, colore).

---

## Framer Motion: transition per proprieta'

Si possono dare timing diversi a ogni proprieta':

```jsx
transition: {
  opacity: { duration: 0.3, ease: "easeOut" },
  x: { type: "spring", stiffness: 150, damping: 18, delay: 0.3 },
  y: { type: "spring", stiffness: 150, damping: 18, delay: 0.3 },
}
```

### Blur in entrata

Usare `filter: "blur(Xpx)"` per effetto "materializzazione" piu' morbido della semplice opacity:

```jsx
initial={{ filter: "blur(8px)" }}
animate={{ filter: "blur(0px)" }}
```

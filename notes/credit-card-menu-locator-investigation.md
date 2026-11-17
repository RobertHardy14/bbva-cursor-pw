# Investigación de locators: menú de tarjetas BBVA

**Fecha:** 2026-11-16
**Página observada:** `https://www.bbva.mx/`
**Alcance de la investigación:** recorrido manual en navegador con inspección del DOM en cada paso. Esta nota conserva la evidencia previa a los cambios posteriores de implementación.

## Recorrido y evidencia

### 1. Inicio y apertura del menú

En la página inicial, el control **Menú** es un botón HTML:

```html
<button type="button" aria-label="Menú principal" aria-expanded="false"
        aria-haspopup="true" aria-controls="megamenu__wrapper">
```

Locator observado como funcional:

```ts
page.getByRole('button', { name: 'Menú principal', exact: true })
```

Después del clic, el mismo control aparece expandido (`aria-expanded="true"`) y el menú queda disponible.

### 2. Abrir «Tarjetas de crédito»

Aunque visualmente parece un elemento de navegación, en el DOM es un **enlace con rol accesible `button`**, no un `<button>` nativo:

```html
<a role="button" data-accordion-toogle=""
   data-menu-expand="tarjetas-de-credito"
   aria-expanded="false" aria-controls="accordion_panel_…"
   href="/personas/productos/tarjetas-de-credito.html">
  <span>Tarjetas de crédito</span>
</a>
```

El DOM contiene dos variantes responsive de este elemento. Una no tiene área visible (`0 × 0`); la otra es la opción visible del menú (`624 × 50` en esta sesión). El árbol accesible expone una opción visible con rol y nombre **button / Tarjetas de crédito**.

Locator observado como funcional; encontró una opción accesible y el clic expandió la sección:

```ts
page.getByRole('button', { name: 'Tarjetas de crédito', exact: true })
```

Tras el clic, `aria-expanded` cambia a `true` y aparece una región **Tarjetas de crédito** que contiene el siguiente enlace.

### 3. Abrir «Todas las tarjetas de crédito»

El elemento es un enlace HTML normal, con destino `/personas/productos/tarjetas-de-credito.html`. También hay dos copias responsive en el DOM: una sin área visible (`0 × 0`) y otra visible (`592 × 24`).

Locator observado como funcional; encontró una opción accesible y navegó al catálogo:

```ts
page.getByRole('link', {
  name: 'Todas las tarjetas de crédito',
  exact: true,
})
```

URL resultante:

```text
https://www.bbva.mx/personas/productos/tarjetas-de-credito.html
```

### 4. Seleccionar «Tarjeta Start BBVA» del catálogo

En el catálogo, la tarjeta está dentro de la región accesible **Conoce nuestras tarjetas de crédito BBVA**. El enlace del título es:

```html
<a aria-label="Tarjeta Start BBVA" class="card__title-link"
   href="/personas/productos/tarjetas-de-credito/tarjeta-de-credito-start.html">
  <h3>Tarjeta Start BBVA</h3>
</a>
```

También aparecen enlaces «Tarjeta Start BBVA» dentro de variantes responsive ocultas del mega menú. El locator global por rol/nombre encontró una opción accesible en el catálogo y navegó correctamente. Para mantener el destino limitado a la tarjeta del catálogo, conviene evaluar este locator con scope a la región observada:

```ts
page
  .getByRole('region', { name: 'Conoce nuestras tarjetas de crédito BBVA' })
  .getByRole('link', { name: 'Tarjeta Start BBVA', exact: true })
```

URL final observada:

```text
https://www.bbva.mx/personas/productos/tarjetas-de-credito/tarjeta-de-credito-start.html
```

La página de detalle muestra como `h1` **«Tarjeta de crédito sin anualidad* de por vida»** y contiene el texto **«Tarjeta Start BBVA: El punto es empezar»**.

## Implicación para la falla actual

`src/components/mainNav.component.ts` sí contiene los clics al elemento **Tarjetas de crédito** y después a **Todas las tarjetas de crédito**, pero ambos están después de sus assertions. Si falla `toHaveCount(1)` para `creditCardsSection`, la ejecución se detiene ahí y el primer clic nunca ocurre. En esta sesión, el locator por rol accesible `button` y nombre exacto funcionó en la página real. La implementación debe conservar la secuencia de clics y verificar que la sección se expandió antes de intentar el siguiente enlace.

Las dimensiones de los elementos ocultos son evidencia de esta sesión y pueden cambiar con el viewport; no conviene codificar selectores basados en índices, IDs UUID ni tamaños. Priorizar rol y nombre accesible, con scope al catálogo para seleccionar la tarjeta.

## Evidencia posterior del snapshot de Playwright

El snapshot de la ejecución aportado por el usuario muestra **Tarjetas de crédito** como `link`, con destino `/personas/productos/tarjetas-de-credito.html`. En esa variante navega directamente al catálogo; no aparece el paso **Todas las tarjetas de crédito**. Esto difiere de la variante manual documentada arriba, donde el elemento tiene rol `button` y expande un submenú.

El locator limitado a `button` bajo `#megamenu__wrapper` devolvía cero coincidencias y su assertion previa impedía llegar al clic. El snapshot no acredita ese scope para la variante de enlace. La implementación ahora admite ambos roles con nombre exacto y visibilidad desde `page`, ejecuta primero el clic real y espera después una de las dos salidas: URL del catálogo o enlace visible **Todas las tarjetas de crédito**. Solo en la segunda comprueba la expansión y realiza el clic adicional. Finalmente valida la URL exacta del catálogo. La unicidad de cada interacción la exige el modo estricto de `Locator.click()`.

En un reporte posterior, nueve tarjetas no aparecían entre los primeros resultados visibles; el catálogo mostraba el botón **Ver más**. `CreditCardsPage` ahora revela más tarjetas mientras el título buscado no esté visible, espera que aparezcan resultados y detiene la expansión si el botón desaparece o no hay progreso. El bucle está limitado por el número de tarjetas configuradas. Start y Azul, que aparecen al inicio, no requieren esa expansión.

La primera ejecución local del caso **Tarjeta Start BBVA** en el sandbox quedó bloqueada antes de abrir la página por falta de `chromium_headless_shell-1223`; por ello no fue posible validar allí el navegador. Después, el usuario reportó que pasaron las 11 pruebas de detalle y la suite completa. El selector del producto conserva el scope de región y el filtro por heading hijo para excluir enlaces auxiliares.

/* ══════════════════════════════════════════════════════════════
   caso_ui.js — Render e interactividad del caso pedagógico GPF
   
   Depende de: caso_data.js (debe cargarse antes)
   No tiene otras dependencias externas.
   
   ESTRUCTURA
   ──────────
   1. Helpers DOM
   2. render()   — construye toda la página desde CASO_DATA
   3. Eventos    — abrirDesarrollo(), elegirOpcion(), responder()
   4. mostrarResultado()
   5. Init       — llama render() al cargar el DOM
══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ════════════════════════════════════════
     1. HELPERS DOM
  ════════════════════════════════════════ */

  function $(id) {
    return document.getElementById(id);
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls)       e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function txt(id, content) {
    var node = $(id);
    if (node) node.textContent = content;
  }

  function append(parentId, child) {
    var p = $(parentId);
    if (p) p.appendChild(child);
  }

  function show(id) {
    var node = $(id);
    if (node) node.classList.remove('hidden');
  }

  function hide(id) {
    var node = $(id);
    if (node) node.classList.add('hidden');
  }

  function smoothScrollTo(id, delay) {
    delay = delay || 60;
    setTimeout(function () {
      var node = $(id);
      if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, delay);
  }


  /* ════════════════════════════════════════
     2. RENDER — construye la página
  ════════════════════════════════════════ */

  function render() {
    var D = window.CASO_DATA;
    if (!D) {
      console.error('caso_ui.js: CASO_DATA no encontrado. Carga caso_data.js primero.');
      return;
    }

    /* ── HERO ── */
    var heroImg = $('hero-img');
    if (heroImg) heroImg.src = D.imagenes.hero;
    txt('hero-kicker', D.meta.modulo + ' · ' + D.meta.codigo);
    txt('hero-titulo', D.portada.titulo);
    txt('hero-sub',    D.portada.subtitulo);

    /* ── KICKER ── */
    txt('kicker-modulo', D.meta.modulo);
    txt('kicker-codigo', D.meta.codigo);

    /* ── FICHA ── */
    var fichaEl = $('ficha');
    if (fichaEl) {
      D.portada.ficha.forEach(function (f) {
        var item = el('div', 'ficha__item');
        item.innerHTML =
          '<div class="ficha__label">' + f.label + '</div>' +
          '<div class="ficha__value">' + f.value + '</div>';
        fichaEl.appendChild(item);
      });
    }

    /* ── LEAD CON DROPCAP ── */
    var lead = D.portada.lead;
    var dropcap = $('dropcap');
    var leadResto = $('lead-resto');
    if (dropcap)   dropcap.textContent   = lead.charAt(0);
    if (leadResto) leadResto.textContent = lead.slice(1);

    /* ── CONTEXTO — fondo ── */
    var ctxBg = $('contexto-bg-img');
    if (ctxBg) ctxBg.src = D.imagenes.contextoBg;
    txt('contexto-titulo', D.contexto.titulo);
    txt('contexto-sub',    D.contexto.subtitulo);

    /* ── CONTEXTO — 3 cards individuales, imagen abre lightbox al clic ── */
    var grid = $('contexto-grid');
    if (grid) {
      grid.innerHTML = '';
      grid.setAttribute('role', 'list');

      /* Crear el lightbox una sola vez (oculto hasta que se active) */
      var lightbox = document.createElement('div');
      lightbox.className = 'contexto-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Imagen ampliada');
      lightbox.innerHTML =
        '<button class="contexto-lightbox__close" type="button" aria-label="Cerrar">&times;</button>' +
        '<img class="contexto-lightbox__img" src="" alt="">' +
        '<div class="contexto-lightbox__caption"></div>';
      document.body.appendChild(lightbox);

      var lbImg     = lightbox.querySelector('.contexto-lightbox__img');
      var lbCaption = lightbox.querySelector('.contexto-lightbox__caption');
      var lbClose   = lightbox.querySelector('.contexto-lightbox__close');
      var lastFocus = null;

      function openLightbox(src, alt, caption, returnEl) {
        lbImg.src         = src;
        lbImg.alt         = alt || '';
        lbCaption.textContent = caption || '';
        lastFocus = returnEl || null;
        lightbox.classList.add('is-open');
        document.body.classList.add('has-lightbox');
        lbClose.focus();
      }
      function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.classList.remove('has-lightbox');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }

      /* Cerrar: botón, clic fuera de la imagen, tecla ESC */
      lbClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function (ev) {
        if (ev.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && lightbox.classList.contains('is-open')) {
          closeLightbox();
        }
      });

      /* Render de cards */
      D.contexto.bloques.forEach(function (b) {
        var card = el('div', 'contexto-card');
        card.setAttribute('role', 'listitem');
        card.innerHTML =
          '<button class="contexto-card__img-btn" type="button" ' +
            'aria-label="Ver imagen: ' + b.heading + '">' +
            '<img class="contexto-card__img" src="' + b.imagen + '" alt="' + b.imgAlt + '" ' +
              'onerror="this.style.background=\'#2a2520\';this.removeAttribute(\'src\')">' +
          '</button>' +
          '<div class="contexto-card__body">' +
            '<div class="contexto-card__num">' + b.num + '</div>' +
            '<h4 class="contexto-card__heading">' + b.heading + '</h4>' +
            '<p class="contexto-card__texto">' + b.texto + '</p>' +
          '</div>';
        grid.appendChild(card);

        /* Click en la imagen → abre el popup */
        var btn = card.querySelector('.contexto-card__img-btn');
        btn.addEventListener('click', function () {
          openLightbox(b.imagen, b.imgAlt, b.heading, btn);
        });
      });
    }

    /* ── SITUACIÓN ── */
    txt('situacion-titulo', D.situacion.titulo);
    txt('situacion-sub',    D.situacion.subtitulo);
    txt('alerta-txt',       D.situacion.alerta);

    var hechosEl = $('hechos');
    if (hechosEl) {
      D.situacion.hechos.forEach(function (h) {
        var row = el('div', 'hecho-row');
        row.innerHTML =
          '<div class="hecho-row__hora">' + h.hora + '</div>' +
          '<div class="hecho-row__txt">'  + h.texto + '</div>';
        hechosEl.appendChild(row);
      });
    }

    /* ── DESARROLLO ── */
    txt('desarrollo-titulo',    D.desarrollo.titulo);
    txt('desarrollo-sub',       D.desarrollo.subtitulo);
    txt('decision-pregunta',    D.desarrollo.pregunta);
    txt('decision-ctx',         D.desarrollo.contexto);

    var opGrid = $('opciones-grid');
    if (opGrid) {
      D.desarrollo.opciones.forEach(function (o) {
        var btn = el('button', 'opcion-btn');
        btn.id = o.id;
        btn.innerHTML =
          '<div class="opcion-btn__icono">'  + o.icono       + '</div>' +
          '<div class="opcion-btn__titulo">' + o.titulo      + '</div>' +
          '<div class="opcion-btn__desc">'   + o.descripcion + '</div>';
        btn.addEventListener('click', function () { elegirOpcion(o.id); });
        opGrid.appendChild(btn);
      });
    }

    /* ── EVALUACIÓN ── */
    txt('eval-titulo', D.evaluacion.titulo);
    txt('eval-sub',    D.evaluacion.subtitulo);
    txt('pie-codigo',  D.meta.codigo);
    txt('pie-modulo',  D.meta.modulo);

    // Marco normativo
    var marcoEl = $('marco-normativo');
    if (marcoEl) {
      var marcoLbl = el('div', 'marco-box__label', 'Normativa aplicable al caso');
      marcoEl.appendChild(marcoLbl);
      D.marcoNormativo.forEach(function (n) {
        var row = el('div', 'norma-row');
        row.innerHTML =
          '<div class="norma-row__tag">' + n.tag      + '</div>' +
          '<div class="norma-row__art">' + n.articulo + '</div>' +
          '<div class="norma-row__txt">' + n.texto    + '</div>';
        marcoEl.appendChild(row);
      });
    }

    // Preguntas
    var pContainer = $('preguntas-container');
    if (pContainer) {
      D.evaluacion.preguntas.forEach(function (p, pidx) {
        var card = el('div', 'pregunta-card fade-in');
        card.id = 'card-' + p.id;

        var meta =
          '<div class="pregunta-card__meta">' +
            '<div class="pregunta-card__num">Pregunta ' + (pidx + 1) + ' / ' + D.evaluacion.preguntas.length + '</div>' +
            '<div class="pregunta-card__norma">' + p.norma + '</div>' +
          '</div>';

        var qtxt = '<p class="pregunta-card__txt">' + p.texto + '</p>';

        var opts = '<div class="opciones-list">';
        p.opciones.forEach(function (o, i) {
          opts +=
            '<button class="opcion-legal" id="' + p.id + '-o' + i + '">' +
              '<span class="radio-dot" id="' + p.id + '-o' + i + '-dot"></span>' +
              '<span>' + o.texto + '</span>' +
            '</button>';
        });
        opts += '</div>';

        var fbDiv = '<div class="feedback-legal hidden" id="' + p.id + '-feedback"></div>';

        card.innerHTML = meta + qtxt + opts + fbDiv;
        pContainer.appendChild(card);

        // Bind clicks después de insertar
        p.opciones.forEach(function (o, i) {
          var btn = $(p.id + '-o' + i);
          if (btn) {
            btn.addEventListener('click', function () { responder(p.id, i); });
          }
        });
      });
    }
  }


  /* ════════════════════════════════════════
     3. ESTADO DE INTERACTIVIDAD
  ════════════════════════════════════════ */

  var estado = {
    opcionElegida: null,
    respuestas:    {},
  };


  /* ════════════════════════════════════════
     3A. abrirDesarrollo()
  ════════════════════════════════════════ */

  window.abrirDesarrollo = function () {
    hide('cta-box');
    show('seccion-desarrollo');
    smoothScrollTo('seccion-desarrollo', 60);
  };


  /* ════════════════════════════════════════
     3B. elegirOpcion(id)
  ════════════════════════════════════════ */

  window.elegirOpcion = function (id) {
    if (estado.opcionElegida) return;
    estado.opcionElegida = id;

    var D = window.CASO_DATA;

    // Marcar botones
    D.desarrollo.opciones.forEach(function (o) {
      var btn = $(o.id);
      if (!btn) return;
      btn.disabled = true;
      btn.classList.add(o.id === id ? 'seleccionada' : 'otra');
    });

    // Construir feedback
    var opData = D.desarrollo.opciones.find(function (o) { return o.id === id; });
    var fb     = opData.feedback;

    var areaFb = $('area-feedback');
    if (!areaFb) return;

    // Panel de feedback
    var panel = el('div', 'feedback-panel feedback-panel--' + fb.tono + ' fade-in');
    panel.innerHTML =
      '<div class="feedback-panel__etiqueta">'  + fb.etiqueta    + '</div>' +
      '<div class="feedback-panel__titulo">'    + fb.titulo      + '</div>' +
      '<p class="feedback-panel__texto">'       + fb.texto       + '</p>'  +
      (fb.aprendizaje
        ? '<div class="feedback-panel__leccion">' +
            '<span class="feedback-panel__leccion-lbl">Lección</span>' +
            fb.aprendizaje +
          '</div>'
        : '');
    areaFb.appendChild(panel);

    // Imagen del feedback (solo si tiene)
    if (fb.imagen) {
      var imgWrap = el('div', 'feedback-img-wrap fade-in');
      imgWrap.innerHTML =
        '<img class="feedback-img-wrap__img" src="' + fb.imagen + '" alt="' + (fb.imgAlt || '') + '" ' +
          'onerror="this.parentElement.style.display=\'none\'">' +
        '<div class="feedback-img-wrap__caption">imagen 6 · decisión correcta</div>';
      areaFb.appendChild(imgWrap);
    }

    // Bloque "qué pasó realmente"
    var cierre = el('div', 'cierre-real fade-in');
    cierre.innerHTML =
      '<div class="cierre-real__label">Qué pasó realmente</div>' +
      '<p class="cierre-real__txt">' + D.desarrollo.cierreReal + '</p>';
    areaFb.appendChild(cierre);

    smoothScrollTo('area-feedback', 200);

    // Revelar evaluación
    setTimeout(function () {
      show('seccion-evaluacion');
      smoothScrollTo('seccion-evaluacion', 100);
    }, 1400);
  };


  /* ════════════════════════════════════════
     3C. responder(pId, idx)
  ════════════════════════════════════════ */

  window.responder = function (pId, idx) {
    if (estado.respuestas[pId] != null) return;
    estado.respuestas[pId] = idx;

    var D       = window.CASO_DATA;
    var pData   = D.evaluacion.preguntas.find(function (p) { return p.id === pId; });
    var correcta = pData.correcta;
    var nOpts   = pData.opciones.length;

    for (var i = 0; i < nOpts; i++) {
      var btn = $(pId + '-o' + i);
      var dot = $(pId + '-o' + i + '-dot');
      if (!btn || !dot) continue;
      btn.disabled = true;

      if (i === idx) {
        if (i === correcta) {
          btn.classList.add('opcion-legal--correcta');
          dot.classList.add('radio-dot--ok');
          dot.textContent = '✓';
        } else {
          btn.classList.add('opcion-legal--incorrecta');
          dot.classList.add('radio-dot--mal');
          dot.textContent = '✕';
        }
      } else if (i === correcta) {
        btn.classList.add('opcion-legal--correcta-sin-elegir');
        dot.classList.add('radio-dot--hint');
      } else {
        btn.style.opacity = '0.45';
      }
    }

    // Feedback textual
    var fbEl  = $(pId + '-feedback');
    var datos = pData.opciones[idx];
    var esOk  = idx === correcta;
    fbEl.className = 'feedback-legal feedback-legal--' + (esOk ? 'ok' : 'mal');
    fbEl.innerHTML  = '<strong>' + (esOk ? 'Correcto. ' : 'Revisa. ') + '</strong>' + datos.feedback;

    // ¿Todas respondidas?
    var total    = D.evaluacion.preguntas.length;
    var respondidas = Object.keys(estado.respuestas).length;
    if (respondidas === total) mostrarResultado();
  };


  /* ════════════════════════════════════════
     4. MOSTRAR RESULTADO FINAL
  ════════════════════════════════════════ */

  function mostrarResultado() {
    var D        = window.CASO_DATA;
    var total    = D.evaluacion.preguntas.length;
    var correctas = 0;

    D.evaluacion.preguntas.forEach(function (p) {
      if (estado.respuestas[p.id] === p.correcta) correctas++;
    });

    var h3El   = $('resultado-h3');
    var descEl = $('resultado-desc');
    if (h3El)   h3El.textContent   = correctas + ' de ' + total + ' preguntas correctas';
    if (descEl) descEl.textContent =
      correctas === total
        ? 'Dominio claro del marco normativo del caso. Tus respuestas reflejan comprensión de los Arts. 108, 110, 115, 118 y 122 de la Ley 21.600.'
        : correctas >= 2
          ? 'Buen nivel general. Repasa los artículos donde fallaste para afianzar la base legal del caso.'
          : 'Hay vacíos relevantes en la normativa. Revisa los artículos del marco legal antes de continuar al siguiente módulo.';

    show('resultado-final');
    show('pie-caso');
    smoothScrollTo('resultado-final', 200);
  }


  /* ════════════════════════════════════════
     5. INIT
  ════════════════════════════════════════ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();

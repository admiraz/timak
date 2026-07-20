// TIMAK multilingual engine — applies window.TIMAK_I18N translations to any page that
// loads this file after its i18n data file(s). No page reload on language switch;
// selection persists via localStorage so it survives navigation and refresh.
(function () {
	var STORAGE_KEY = 'timak_lang';
	var SUPPORTED = ['en', 'sq', 'ru', 'es', 'fr', 'ar'];
	var RTL_LANGS = ['ar'];

	function getDict(lang) {
		return (window.TIMAK_I18N && window.TIMAK_I18N[lang]) || {};
	}

	function translate(lang, key) {
		var dict = getDict(lang);
		if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
		var enDict = getDict('en');
		if (Object.prototype.hasOwnProperty.call(enDict, key)) return enDict[key];
		return key; // last-resort fallback so nothing ever renders blank
	}

	function getSavedLang() {
		var saved = null;
		try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
		return (saved && SUPPORTED.indexOf(saved) !== -1) ? saved : 'en';
	}

	function applyI18n(lang) {
		var t = function (key) { return translate(lang, key); };

		document.querySelectorAll('[data-i18n]').forEach(function (el) {
			el.textContent = t(el.getAttribute('data-i18n'));
		});
		document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
			el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
		});
		document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
			el.setAttribute('alt', t(el.getAttribute('data-i18n-alt')));
		});
		document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
			el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
		});
		document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
			el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label')));
		});
		document.querySelectorAll('[data-i18n-value]').forEach(function (el) {
			el.setAttribute('value', t(el.getAttribute('data-i18n-value')));
		});
		document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
			el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
		});
		var titleEl = document.querySelector('title[data-i18n-doctitle]');
		if (titleEl) document.title = t(titleEl.getAttribute('data-i18n-doctitle'));

		var rtl = RTL_LANGS.indexOf(lang) !== -1;
		document.documentElement.setAttribute('lang', lang);
		document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
		document.documentElement.classList.toggle('is-rtl', rtl);

		// Language switcher UI: highlight the active option and update the visible code
		// (e.g. "EN") in the toggle button — works for every [data-lang-switcher] instance
		// on the page (desktop nav + mobile offcanvas nav both have their own copy).
		document.querySelectorAll('[data-lang-switcher]').forEach(function (menu) {
			menu.querySelectorAll('a[data-lang]').forEach(function (a) {
				var active = a.getAttribute('data-lang') === lang;
				a.classList.toggle('active', active);
				if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
			});
			var toggle = menu.previousElementSibling;
			if (toggle) {
				for (var node = toggle.firstChild; node; node = node.nextSibling) {
					if (node.nodeType === 3 && node.textContent.trim() !== '') {
						node.textContent = lang.toUpperCase() + ' ';
						break;
					}
				}
			}
		});

		applyValidationMessages();

		document.dispatchEvent(new CustomEvent('timak:langchange', { detail: { lang: lang } }));
	}

	// Native browser validation bubbles ("Please fill out this field") aren't reachable
	// through data-i18n — they come from setCustomValidity(). Wired here once per field,
	// sitewide, for every required/email input so "Please fill out this field" and
	// "Please enter a valid email address" respect the active language on every form
	// (contact, career application, footer newsletter, etc.).
	function applyValidationMessages() {
		document.querySelectorAll('input, textarea, select').forEach(function (el) {
			if (!el.required && el.type !== 'email') return;
			if (el.__timakValidationBound) return; // bind once per element, not once per language switch
			el.__timakValidationBound = true;
			el.addEventListener('input', function () { el.setCustomValidity(''); });
			el.addEventListener('change', function () { el.setCustomValidity(''); });
			el.addEventListener('invalid', function () {
				// Look up the message fresh, at the moment validation actually fires, so it
				// always reflects whichever language is active then — not whichever language
				// happened to be active when this listener was first attached.
				var lang = getSavedLang();
				if (el.validity.valueMissing) el.setCustomValidity(translate(lang, 'form.validation.required'));
				else if (el.validity.typeMismatch && el.type === 'email') el.setCustomValidity(translate(lang, 'form.validation.email'));
				else el.setCustomValidity('');
			});
		});
	}

	function setLang(lang) {
		if (SUPPORTED.indexOf(lang) === -1) return;
		try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
		applyI18n(lang);
	}

	// Exposed for any page-specific script (e.g. products.html's dynamic catalog) that
	// needs to re-render JS-generated content with the current language.
	window.TIMAK_I18N_ENGINE = {
		// `fallback`, when given, is used instead of the raw key whenever no translation
		// exists in the current language OR in English — for content (like products.html's
		// catalog) whose English text already lives in a data array rather than the i18n
		// dictionary, so it doesn't need to be duplicated into the `en` dict as well.
		t: function (key, fallback) {
			var v = translate(getSavedLang(), key);
			return (v === key && fallback !== undefined) ? fallback : v;
		},
		translate: translate,
		getLang: getSavedLang,
		setLang: setLang,
		isRTL: function () { return RTL_LANGS.indexOf(getSavedLang()) !== -1; }
	};

	function init() {
		applyI18n(getSavedLang());
		document.querySelectorAll('[data-lang-switcher]').forEach(function (menu) {
			menu.addEventListener('click', function (e) {
				var a = e.target.closest('a[data-lang]');
				if (!a) return;
				e.preventDefault();
				setLang(a.getAttribute('data-lang'));
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

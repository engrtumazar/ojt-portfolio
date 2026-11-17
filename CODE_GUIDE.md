# Gabay sa portfolio code

Basahin ito kasabay ng comments sa source files. Unahin ang pag-unawa sa daloy ng data at sa sarili mong contributions bago mag-memorize ng syntax.

## 1. Ano ang trabaho ng bawat file?

| File                                                 | Trabaho                                                                                                   |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `index.html`                                         | Structure at semantic sections: header, navigation, hero, projects, skills, about, contact, at dialog.    |
| `content.js`                                         | Data: pangalan, contact links, skills, tools, at projects. Dito kadalasan mag-eedit ng content.           |
| `script.js`                                          | Binabasa ang data, gumagawa ng cards, at nagkokonekta ng buttons at events.                               |
| `styles.css`                                         | Colors, typography, layout, responsive rules, at animations. Numbered ang sections para madaling hanapin. |
| `projects/robotic-arm/ROBOTIC_ARM_COLOR_SORTING.ino` | Arduino sketch na ibinigay mo. Hiwalay ito sa JavaScript ng website.                                      |
| `scripts/update-source-preview.mjs`                  | Optional Node.js helper para i-regenerate ang static source-code page kapag binago ang sketch.            |

## 2. Ano ang unang nangyayari sa page?

1. Binabasa ng browser ang HTML at CSS.
2. Nilo-load ang `content.js`, na gumagawa ng `window.PORTFOLIO_DATA` object.
3. Nilo-load ang `script.js` pagkatapos ng HTML parsing dahil may `defer` ang script tags.
4. Tinatawag ang rendering functions sa ibaba ng `script.js`.
5. Ikinakabit ang click, keyboard, scroll, at resize event listeners.
6. Nagdadagdag ng optional entrance animations kung pinapayagan ng motion preference.

Mahalaga ang order: kailangan munang may data bago ito basahin ng rendering code.

## 3. JavaScript concepts na ginagamit

- **Object:** ang `PORTFOLIO_DATA` ay may named properties gaya ng `name`, `email`, at `projects`.
- **Array:** ang `projects`, `focus`, at `tools` ay lists. Bawat project ay isang object sa array.
- **Function:** magkakahiwalay ang `renderProjects`, `renderSkills`, at iba pang trabaho para madaling basahin at baguhin.
- **DOM:** ang browser representation ng HTML. `querySelector` ang panghanap ng element; `textContent` ang pangpalit ng text.
- **Template literal:** gumagamit ng backticks at `${value}` para magbuo ng HTML mula sa data.
- **map + join:** kino-convert ng `map` ang bawat object sa HTML string; pinagsasama ng `join` ang strings.
- **find:** hinahanap ang project na kapareho ng `data-project` value ng pinindot na button.
- **Event delegation:** isang listener sa projects grid ang humahawak sa lahat ng View details buttons.
- **IIFE:** ang function wrapper sa `script.js` ay agad tumatakbo at pinananatiling local ang helper functions.

## 4. Bakit may escapeHtml at getSafeUrl?

`escapeHtml` converts characters gaya ng `<` at `&` into text entities bago ilagay sa HTML templates. Halimbawa, ang project title na may `<script>` ay dapat text lang, hindi executable HTML.

`getSafeUrl` validates links. Website buttons accept HTTP/HTTPS URLs. Ang local images, PDF, at source files ay may hiwalay na allowance para sa relative paths.

`textContent` ang ginagamit kung plain text lang ang kailangang baguhin. Gumagamit lang ng HTML templates kapag may structure gaya ng cards at lists.

## 5. Paano gumagana ang View details?

1. May unique `id` ang bawat project sa `content.js`.
2. Ang button ay may `data-project` attribute na kapareho ng project id.
3. Hinahanap ng click handler ang matching project object.
4. Ginagawa ng `renderProjectDetails` ang laman ng dialog.
5. Binubuksan ng `showModal()` ang native HTML dialog.
6. Maaaring isara gamit ang Close, Escape, o click sa backdrop. Bumababalik ang focus sa button.

Ang website/source/download buttons ay conditional: lalabas lang kung may valid link sa project data.

## 6. Paano gumagana ang responsive layout?

- `--wide` ang maximum content width. Hindi lumalapad nang walang limit ang layout sa malaking monitor.
- CSS Grid ang ginagamit sa hero columns, projects, skills, at education facts.
- Flexbox ang ginagamit sa buttons, navigation, at tag lists.
- Media queries ang nagbabago ng layout kapag kulang na ang available width.
- `object-fit: contain` ang nagpapakita ng buong dashboard at robot images.
- `object-fit: cover` ang ginagamit sa portrait para mapuno ang bilog kahit may crop.
- May system font fallbacks para readable pa rin kapag offline o hindi available ang Google Fonts.

Hindi kailangan ng hiwalay na website code para sa MacBook. Ang mahalaga ay flexible sizing at pag-check sa target browsers at screen widths.

## 7. Paano gumagana ang animations?

CSS keyframes ang umiikot sa portrait orbit. Reverse ang rotation ng icons kaya nananatili silang upright.

Web Animations API ang ginagamit sa entrance effects. IntersectionObserver ang nagsasabi kung kailan pumasok sa viewport ang section o card. Isang beses lang ito nire-reveal.

Kapag naka-enable ang Reduce Motion sa device, itinitigil ang decorative motion. Visible pa rin ang content kapag walang animation support.

## 8. Portfolio frontend at VitaBand backend

Static frontend ang portfolio na ito: HTML, CSS, at browser JavaScript. Walang Firebase connection o backend server na pinapatakbo ang portfolio mismo.

Ang VitaBand project ay hiwalay na application. Screenshot at website link nito ang nasa portfolio. Kung tatanungin tungkol sa Firebase o API integration, ipaliwanag ang mismong ginawa mo sa VitaBand at ang parts na naiintindihan at nasubukan mo.

## 9. Robotic Arm sketch: saan magsisimulang mag-aral?

Hindi binago ng portfolio refactor ang original Arduino sketch o control values nito.

- `setup()` initializes serial output, the PCA9685 servo driver, LCD, and color sensor.
- `loop()` reads raw sensor values, checks object presence, identifies a dominant color, then picks and sorts the object.
- `angleToPulse()` maps an angle to the configured servo PWM range.
- `smoothMove()` moves in small steps using delays, then writes the final target.
- `goToCenter()`, `gripObject()`, and `releaseObject()` group repeated actions into named functions.
- `moveToBin()` lifts the arm before rotating and lowering it to the selected position.

Ang motor channels, thresholds, at positions ay specific sa actual setup. Hindi katumbas ng website preview test ang pag-compile at pag-test sa hardware.

Kapag inedit ang sketch, i-update ang static viewer bago mag-commit:

```powershell
node scripts/update-source-preview.mjs
```

## 10. Paano mag-check pagkatapos mag-edit?

Run `node scripts/check-portfolio.mjs` mula sa project folder. Chine-check nito ang asset filenames (pati capitalization), unique project IDs, website links, at kung tugma pa ang source viewer sa `.ino` file. Pagkatapos, buksan ang page at subukan ang buttons at layout sa browser.

## 11. Mga tanong na puwedeng pagpraktisan

- Ano ang pagkakaiba ng HTML, CSS, at JavaScript sa portfolio?
- Paano ka magdadagdag ng isang project nang hindi kinokopya ang buong card markup?
- Bakit may unique id ang bawat project?
- Kailan ginagamit ang textContent at HTML templates?
- Paano gumagana ang mobile menu at bakit may aria-expanded?
- Bakit may URL validation at escaping?
- Paano mo sinigurong kasya ang images sa phone?
- Aling parts ng VitaBand, Robotic Arm, at SumoBot ang ginawa mo mismo?
- Paano ka gumamit ng AI assistance, ano ang binago mo, at paano mo na-check ang resulta?

Sagutin mula sa actual experience. Kung may part na hindi mo pa naiintindihan, pag-aralan at subukan muna bago sabihing kaya mong gawin nang mag-isa.

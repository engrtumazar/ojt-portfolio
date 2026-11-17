BRYAN C. TUMAZAR - OJT PORTFOLIO
==============================

A static portfolio showing academic projects, individual contributions,
skills, and OJT interests. Built with HTML, CSS, and JavaScript.

Repository: https://github.com/engrtumazar/ojt-portfolio
Production: https://ojt-portfolio-plum.vercel.app/

RUN LOCALLY
-----------
Open index.html in a browser. From PowerShell inside MyPortfolio:

    Start-Process .\index.html

Live Server is optional. No app installation, backend, or build is needed.
Google Fonts are optional; system fonts remain available when offline.
Save changes and refresh the page with Ctrl + Shift + R.

FILE MAP
--------
index.html        Semantic sections and accessible controls.
content.js        Personal information, contact links, skills, tools, projects.
script.js         Rendering functions, project dialogs, menu, navigation, motion.
styles.css        Numbered style sections, theme tokens, responsive layouts.
CODE_GUIDE.md     Tagalog walkthrough and programming questions to practice.
.editorconfig     Shared editor indentation and line-ending settings.
.prettierrc.json   Formatting conventions for HTML, CSS, and JavaScript.
assets/           Portrait, resume PDF, dashboard screenshot, robot cutouts, SVGs.
projects/robotic-arm/
                  Original .ino file and its static source-code viewer.
scripts/update-source-preview.mjs
                  Optional Node helper to refresh that viewer after sketch edits.
scripts/check-portfolio.mjs
                  Checks asset paths, project IDs, website URLs, and source preview.

EDIT CONTENT
------------
Edit content.js first when changing text, images, skills, tools, or links.
Each property and the project schema have explanatory comments.

- Use complete HTTPS URLs for github, linkedin, and project website links.
- Empty optional links produce no corresponding button.
- image and resume paths must match actual filenames, including capitalization.
- imageFit: "contain" preserves the entire dashboard or robot image.
- imagePresentation: "product" applies the dark stage behind robot cutouts.
- role describes your individual contribution; keep team-project claims accurate.
- sourceCode and sourceDownload add source actions inside View details.

Project cards have static titles and images. View details opens the native
project dialog. Contact labels remain Email me, GitHub, and LinkedIn.

CURRENT MEDIA
-------------
assets/profile.jpg
assets/profile-placeholder.svg
assets/BRYAN_TUMAZAR - CV.pdf
assets/vitaband-dashboard.png
assets/robotic-arm-cutout.png
assets/sumobot-cutout.png
assets/abstract-background.svg
assets/favicon.svg

The VitaBand screenshot is a static preview. Its website is a separate app.
The original white-background robot pictures are not required by the site.
SumoBot source code is not linked until the actual sketch is provided.

SOURCE CODE VIEWER
------------------
The Arduino sketch is kept unchanged by the portfolio styling refactor.
Its viewer displays escaped source text and links to the real .ino download.

After editing the sketch, regenerate the viewer and commit both files:

    node scripts/update-source-preview.mjs

This optional editing helper requires Node.js. Hosting the portfolio does not.
The .ino program needs its Arduino libraries and actual hardware for testing.

CODE CONVENTIONS
----------------
Use two-space indentation, descriptive function names, and semicolons.
Comments explain each data group, rendering function, HTML section, and CSS
component. Read CODE_GUIDE.md to follow the complete data-to-page flow.

To format the website files with Prettier (optional, requires Node/npm):

    npx.cmd prettier --write index.html content.js script.js styles.css

Format source-viewer HTML after regeneration if desired:

    npx.cmd prettier --write projects/robotic-arm/index.html

Do not run a website formatter on the Arduino sketch.

CHECK BEFORE SHARING
--------------------
Test the portrait and all project images, View details, source and download
links, resume PDF, contact links, mobile menu, and keyboard navigation.
Run the portable content checks (requires Node.js):

    node scripts/check-portfolio.mjs

Check laptop and phone widths, plus Reduce Motion in the device settings.
Scrollbars are intentionally hidden; normal scrolling remains available.

UPLOAD CHANGES
--------------
Review files first, then commit and push from the project folder:

    git status
    git add .
    git commit -m "Refine portfolio design and document code"
    git push origin main

The existing Vercel GitHub integration deploys updates pushed to main.
Use the production domain when sharing the website.

VERCEL SETTINGS
---------------
Framework: Other
Root directory: .
Build command: empty
Output directory: .
Environment variables: none

Keep index.html, content.js, script.js, styles.css, assets/, and projects/
in the repository. scripts/ is an editing helper, not a required build step.

TROUBLESHOOTING
---------------
Missing image: check its exact path and filename in content.js.
Missing contact button: save a valid complete URL in the matching data field.
Unchanged online page: save, commit, push, and wait for the deployment to finish.
Then refresh with Ctrl + Shift + R or open the production URL in Incognito.
Source viewer differs from .ino: rerun scripts/update-source-preview.mjs.
Animations disabled: check the device's Reduce Motion preference.

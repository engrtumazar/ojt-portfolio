BRYAN C. TUMAZAR - OJT PORTFOLIO
==============================

A personal portfolio for a Computer Engineering student at Pamantasan ng
Lungsod ng Maynila, showcasing academic projects, skills, and OJT interests.

Repository: https://github.com/engrtumazar/ojt-portfolio


OVERVIEW
--------
- Dark theme with purple and mint accents and an abstract SVG background.
- Circular profile photo with orbiting software and hardware icons.
- Compact project cards: three columns on desktop, two on tablets, and one
  on smaller screens.
- "View details" opens a larger project image, contributions, technologies,
  and an external project link when one is configured.
- Scroll entrance animations, hover effects, and reduced-motion support.
- Mobile navigation, keyboard controls, and hidden scrollbars. The page and
  project dialogs still scroll normally.
- Email, GitHub, optional LinkedIn, and PDF resume links.

The portfolio uses plain HTML, CSS, and JavaScript. No npm installation,
framework, database, or build command is needed to run the portfolio itself.


FILES
-----
index.html                    Page structure and section headings.
styles.css                    Layout, responsive styles, backgrounds, animation.
script.js                     Content rendering, project dialogs, navigation.
content.js                    Personal information, skills, and project data.
README.txt                    Setup, editing, and publishing instructions.
assets/profile.jpg            Current profile photo.
assets/profile-placeholder.svg
                              Fallback for an unavailable configured photo.
assets/BRYAN_TUMAZAR - CV.pdf  Current resume.
assets/vitaband-dashboard.png  Static screenshot preview of the VitaBand UI.
assets/robot-arm.svg           Robotic arm illustration.
assets/sumobot-cutout.png      Background-removed SumoBot image used on the site.
assets/sumobot.png             Original supplied SumoBot image.
assets/abstract-background.svg
                              Decorative background artwork.
assets/favicon.svg            Browser tab icon.
assets/vitaband.svg            Earlier VitaBand illustration, kept as an asset.


RUN LOCALLY
-----------
1. Open the MyPortfolio folder in VS Code or Windows File Explorer.
2. Open index.html in Chrome, Edge, or Firefox.
3. After editing, save the files and refresh the browser with Ctrl + Shift + R.

Optional: from a PowerShell terminal inside the project folder, run:

    Start-Process .\index.html

Live Server is optional. Google Fonts load when available; the portfolio
remains usable with system fonts when offline. External project websites
require an Internet connection.


EDIT PERSONAL INFORMATION
-------------------------
Open content.js to update the following fields:

- name, firstName, role, headline, introduction, and about.
- school, degree, graduation, internshipHours, and location.
- email, github, and resume.
- profileImage for the portrait.
- focus for the skill groups and their tags.

An optional LinkedIn button can be added with a linkedin field containing
its full HTTPS profile URL. Empty or omitted optional links are not shown.

The nickname field is currently not displayed by script.js. Change
firstName to change the name shown in the introduction.

Some headings and education details are written directly in index.html,
including the leadership description and the "Fourth-year student" label.
Edit those there when needed.


PROFILE PHOTO AND RESUME
------------------------
Current settings in content.js:

    profileImage: "assets/profile.jpg",
    resume: "assets/BRYAN_TUMAZAR - CV.pdf",

To replace a file, keep its current name or update the corresponding path.
Keep the full filename, capitalization, extension, and spaces consistent.
JPG, PNG, and WebP portraits can be used.

The portrait is cropped into a circle. To adjust its framing, edit
object-position in .portrait-image-wrap img in styles.css.

To change the orbit speed, edit --orbit-period in .portrait-orbit-primary.
The icons remain upright as they orbit. Reduced-motion settings disable
these animations.


PROJECTS AND WEBSITE LINKS
--------------------------
Each item in the projects array in content.js contains:

- id and number: project identification; keep each id unique.
- title, category, status, and year: card information.
- image and imageAlt: preview file and descriptive alternative text.
- illustrative: true for concept artwork; false for a screenshot or photo.
- summary: short card description; longer text is available in the dialog.
- role: your individual contribution, shown under "My involvement".
- details, stack, and takeaway: expanded project information.
- link: the full HTTP or HTTPS address of the project website or repository.

Example website link:

    link: "https://vitaband2-0.onrender.com"

The project image and title are static on the card. Visitors select
"View details" to see the expanded image and project information.
"Open project website" appears inside that dialog when link is valid.
Leave link as an empty string when no external destination is available.

To use a new project photo or screenshot:
1. Put the file in assets/.
2. Set image to its relative path, for example "assets/my-project.jpg".
3. Write an accurate imageAlt description.
4. Set illustrative to false.
5. Remove or update imageCaption if an old caption no longer applies.

A landscape image near 16:9 works best for the card previews.

Current projects:
- VitaBand 2.0: dashboard preview and external website link.
- Automated Pill Color Sorting Robotic Arm: academic robotics project.
- Bluetooth-Controlled SumoBot: academic robot project, including hardware
  assistance under the individual contribution.

The VitaBand preview is a static image of its frontend in the waiting-for-
data state. Opening its website is separate and may require sign-in.
The robotic arm preview currently uses an illustration. Keep project
status and individual contributions accurate when updating this content.


SAVE UPDATES TO GITHUB
---------------------
The current checkout already uses branch main and has origin configured
for https://github.com/engrtumazar/ojt-portfolio.git.

From a terminal inside MyPortfolio, review and upload changes with:

    git status
    git add .
    git commit -m "Update portfolio"
    git push

To upload only a README edit instead:

    git add README.txt
    git commit -m "Update portfolio documentation"
    git push

If Git reports "Author identity unknown", configure the identity for this
repository. Replace YOUR_GITHUB_EMAIL before running the email command:

    git config user.name "Bryan C. Tumazar"
    git config user.email "YOUR_GITHUB_EMAIL"

Then retry the commit. Use an email associated with your GitHub account if
you want GitHub to attribute the commit to your profile.

If main has no upstream branch, run:

    git push -u origin main

Official identity references:
https://docs.github.com/en/get-started/git-basics/setting-your-username-in-git
https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address


PUBLISH WITH VERCEL
------------------
The portfolio is ready for static hosting. It does not require package.json,
an npm install, a build command, or environment variables.

1. Visit https://vercel.com/new and sign in with GitHub.
2. Allow Vercel to access the engrtumazar/ojt-portfolio repository.
3. Select that repository and import it.
4. Use these deployment settings:

       Framework Preset: Other
       Root Directory:   . (the repository root)
       Build Command:    enable Override and leave the command empty
       Output Directory: . (or its default for Other)
       Environment Variables: none

5. Deploy and wait until Vercel reports that the deployment is ready.
6. Open the project's production domain and test its images, resume link,
   mobile layout, and project details.
7. Test that production URL in an incognito window before sharing it.

Use the production domain shown by Vercel; no Vercel address has been
verified for this project yet. If visitors are asked to sign in to Vercel,
check Settings > Deployment Protection. The public production domain must
be accessible without authentication. Standard Protection can keep preview
deployments restricted while leaving production domains public.

With the GitHub integration connected, pushes to the production branch
(main for this project) trigger deployment updates. Use the Git commands
above after changing local files.

Keep index.html, styles.css, script.js, content.js, and assets/ in the
repository root. No vercel.json is needed for this buildless project.

Official references:
https://vercel.com/docs/getting-started-with-vercel
https://vercel.com/docs/builds/configure-a-build
https://vercel.com/docs/deployment-protection

QUICK TROUBLESHOOTING
---------------------
Changes do not appear:
Save the file, confirm you edited the current MyPortfolio folder, and use
Ctrl + Shift + R. For the hosted site, also commit and push the changes.

Photo or project image is missing:
Check its path in content.js and confirm the file exists in assets/.
Match capitalization exactly, particularly when publishing online.

Resume button is missing or opens an error:
Check resume in content.js against the actual PDF filename in assets/.
The current filename has one R at the end of TUMAZAR; spaces are supported.

Website button is missing from a project's details:
Set that project's link to a complete HTTP or HTTPS URL. Local paths such
as C:\... and localhost addresses are not public website links.

Animation is not moving:
Check the device or browser's reduced-motion setting. Content remains
visible when animations are disabled or unsupported.

Scrollbars are invisible:
This is intentional. Use the mouse wheel, touch, or keyboard to scroll.

Git says "nothing to commit":
There are no new staged changes to save. Use git status to inspect the
checkout; use git push if an existing local commit still needs uploading.

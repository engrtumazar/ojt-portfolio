/**
 * Editable portfolio content.
 * This file contains data, not page behavior. script.js reads this public object.
 * Strings use quotes, arrays use [], and objects use {}. Separate properties with commas.
 * File paths are relative to index.html and must match the real filename exactly.
 */
window.PORTFOLIO_DATA = {
  // Personal identity: rendered in the browser title, header, portrait caption, and footer.
  name: "Bryan C. Tumazar",
  // The name used in the introductory greeting.
  firstName: "Bryan",
  // An optional nickname kept for reference; the current page uses firstName.
  nickname: "Bry",
  // Your current role beneath the portrait.
  role: "Computer Engineering Student",
  // The actual photo file. CSS controls its circular crop and framing.
  profileImage: "assets/profile.jpg", // Put your photo in assets, then set this to "assets/profile.jpg".
  // The main headline. The default wording receives purple emphasis in script.js.
  headline: "I build where software meets hardware.",
  // Short introduction displayed below the headline.
  introduction:
    "I'm a fourth-year BS Computer Engineering student at Pamantasan ng Lungsod ng Maynila, interested in frontend development and embedded systems. I enjoy turning technical ideas into systems people can actually use.",
  // Education details displayed in the About section.
  school: "Pamantasan ng Lungsod ng Maynila",
  // Your degree, displayed beside the school name.
  degree: "BS Computer Engineering",
  // Expected graduation date, kept as text so it is easy to edit.
  graduation: "Expected 2027",
  // OJT duration; script.js adds the label around this value.
  internshipHours: "240 hours",
  // Location displayed in the hero and contact section.
  location: "Metro Manila, Philippines",
  // Contact email. The button opens the visitor's email application.
  email: "bryncstrtmzrr@gmail.com",
  // Public GitHub URL; use the full https:// address.
  github: "https://github.com/engrtumazar",
  // Public LinkedIn URL. Leave empty to hide its button.
  linkedin: "https://www.linkedin.com/in/bryantumazar/",
  // PDF path; spaces are allowed when they match the real filename.
  resume: "assets/BRYAN_TUMAZAR - CV.pdf",
  // A longer explanation of your interests and individual contributions.
  about:
    "My academic work combines electronics, sensor-based systems, and user-facing software. In team projects, I especially enjoy connecting device data to interfaces that make the information easier to understand. Outside technical work, serving as a block representative has helped me practice coordination and clear communication.",
  // Skill cards. Each object needs a number, title, description, and tags array.
  focus: [
    {
      number: "01",
      title: "Frontend development",
      description:
        "Building readable, responsive interfaces and connecting them to live application data.",
      tags: ["HTML", "CSS", "JavaScript", "Firebase Realtime Database"],
    },
    {
      number: "02",
      title: "Embedded systems & IoT",
      description:
        "Working with microcontrollers, sensors, wireless communication, and system integration.",
      tags: ["ESP32", "LoRa", "GPS", "Arduino Uno and Nano"],
    },
    {
      number: "03",
      title: "Backend & Database Integration",
      description:
        "Connecting web interfaces to backend services and real-time data through academic projects.",
      tags: ["Firebase Realtime Database", "API Integration"],
    },
  ],
  // Supporting tools appear in a compact row rather than as additional skill cards.
  tools: ["Git/GitHub", "Arduino IDE", "Visual Studio"],
  /**
   * Project schema (the same fields are used by cards and View details):
   * id: unique identifier connecting a button to its project object.
   * image / imageAlt: asset path and a useful accessible image description.
   * imageFit: "contain" fits the entire image; imagePresentation: "product" adds the robot stage.
   * illustrative: false means a real project photo or screenshot, rather than concept artwork.
   * role / details / stack / takeaway: contribution, work summary, technologies, and learning.
   * link: optional external website; sourceCode / sourceDownload: optional local source files.
   * Empty optional links produce no button. All text should describe your actual experience.
   */
  projects: [
    {
      id: "vitaband",
      number: "01",
      title: "VitaBand 2.0",
      category: "Wearable IoT · Monitoring dashboard",
      status: "Academic Project",
      year: "2026",
      image: "assets/vitaband-dashboard.png",
      imageFit: "contain",
      imageAlt:
        "VitaBand 2.0 dashboard screenshot showing heart rate, device status, location map, and activity",
      illustrative: false,
      summary:
        "A wearable monitoring system that connects sensor data, GPS location, and an SOS signal to a base station and web dashboard.",
      role: "Developed the project's frontend and backend components.",
      details: [
        "Implemented user-facing dashboard features for viewing device information.",
        "Worked with Firebase Realtime Database to present readings and device activity.",
        "Integrated the software workflow with an ESP32 / LoRa-based hardware setup.",
      ],
      stack: ["ESP32", "LoRa", "Firebase RTDB", "Web dashboard", "GPS"],
      takeaway: "Connecting hardware events to useful, readable software interfaces.",
      link: "https://vitaband2-0.onrender.com",
    },

    {
      id: "robotic-arm",
      sourceCode: "projects/robotic-arm/index.html",
      sourceDownload: "projects/robotic-arm/ROBOTIC_ARM_COLOR_SORTING.ino",
      number: "02",
      title: "Automated Pill Color Sorting Robotic Arm",
      category: "Robotics · Automation",
      status: "Academic Project",
      year: "2026",
      image: "assets/robotic-arm-cutout.png",
      imageFit: "contain",
      imagePresentation: "product",
      productIcon: "robotics",
      imageAlt:
        "Automated pill color sorting robotic arm prototype with a gripper, servos, and control board",
      illustrative: false,
      summary:
        "An academic robotics project centered on automatically sorting pills according to color.",
      role: "Helped design the sensing and control logic for the robotic arm's color sorting task.",
      details: ["Explored how mechanical movement and automated sorting can work together."],
      stack: ["Robotics", "Color Sorting", "Automation"],
      takeaway: "Understanding how sensing, movement, and control interact in a physical system.",
      link: "",
    },
    {
      id: "sumobot",
      number: "03",
      title: "Bluetooth-Controlled SumoBot",
      category: "Mobile robotics · Wireless control",
      status: "Academic Project",
      year: "2026",
      image: "assets/sumobot-cutout.png",
      imageFit: "contain",
      imagePresentation: "product",
      productIcon: "bluetooth",
      imageAlt: "Blue Bluetooth-controlled SumoBot prototype with a front wedge and headlights",
      illustrative: false,
      summary:
        "A Bluetooth-controlled robot project that provided hands-on experience with wireless commands and hardware integration.",
      role: "Assisted with the hardware components of the Bluetooth-controlled SumoBot.",
      details: [
        "Worked with the concept of controlling a mobile robot through Bluetooth commands.",
      ],
      stack: ["Bluetooth", "Robotics", "Hardware integration"],
      takeaway:
        "Translating user commands into physical movement through hardware and control logic.",
      link: "",
    },
  ],
};

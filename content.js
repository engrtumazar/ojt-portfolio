
window.PORTFOLIO_DATA = {
  name: "Bryan C. Tumazar",
  firstName: "Bryan",
  nickname: "Bry",
  role: "Computer Engineering Student",
  profileImage: "assets/profile.jpg", // Put your photo in assets, then set this to "assets/profile.jpg".
  headline: "I build where software meets hardware.",
  introduction: "I'm a fourth-year BS Computer Engineering student at Pamantasan ng Lungsod ng Maynila, interested in frontend development and embedded systems. I enjoy turning technical ideas into systems people can actually use.",
  school: "Pamantasan ng Lungsod ng Maynila",
  degree: "BS Computer Engineering",
  graduation: "Expected 2027",
  internshipHours: "240 hours",
  location: "Metro Manila, Philippines",
  email: "bryncstrtmzrr@gmail.com",
  github: "https://github.com/engrtumazar",
  resume: "assets/BRYAN_TUMAZAR - CV.pdf",
  about: "My academic work combines electronics, sensor-based systems, and user-facing software. In team projects, I especially enjoy connecting device data to interfaces that make the information easier to understand. Outside technical work, serving as a block representative has helped me practice coordination and clear communication.",
  focus: [
    {
      number: "01",
      title: "Frontend development",
      description: "Building readable, responsive interfaces and connecting them to live application data.",
      tags: ["HTML", "CSS", "JavaScript", "Firebase Realtime Database"]
    },
    {
      number: "02",
      title: "Embedded systems & IoT",
      description: "Working with microcontrollers, sensors, wireless communication, and system integration.",
      tags: ["ESP32", "LoRa", "GPS", "Arduino Uno and Nano"]
    },
    {
      number: "03",
      title: "Backend & Database Integration",
      description: "Connecting web interfaces to backend services and real-time data through academic projects.",
      tags: ["Firebase Realtime Database", "API Integration"]
    }
  ],
  tools: ["Git/GitHub", "Arduino IDE", "Visual Studio"],
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
      imageAlt: "VitaBand 2.0 dashboard screenshot showing heart rate, device status, location map, and activity",
      illustrative: false,
      summary: "A wearable monitoring system that connects sensor data, GPS location, and an SOS signal to a base station and web dashboard.",
      role: "Developed the project's frontend and backend components.",
      details: [
        "Implemented user-facing dashboard features for viewing device information.",
        "Worked with Firebase Realtime Database to present readings and device activity.",
        "Integrated the software workflow with an ESP32 / LoRa-based hardware setup."
      ],
      stack: ["ESP32", "LoRa", "Firebase RTDB", "Web dashboard", "GPS"],
      takeaway: "Connecting hardware events to useful, readable software interfaces.",
      link: "https://vitaband2-0.onrender.com"
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
      imageAlt: "Automated pill color sorting robotic arm prototype with a gripper, servos, and control board",
      illustrative: false,
      summary: "An academic robotics project centered on automatically sorting pills according to color.",
      role: "Helped design the sensing and control logic for the robotic arm's color sorting task.", 
      details: [
        "Explored how mechanical movement and automated sorting can work together."
      ],
      stack: ["Robotics", "Color Sorting", "Automation"],
      takeaway: "Understanding how sensing, movement, and control interact in a physical system.",
      link: ""
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
      summary: "A Bluetooth-controlled robot project that provided hands-on experience with wireless commands and hardware integration.",
      role: "Assisted with the hardware components of the Bluetooth-controlled SumoBot.",
      details: [
        "Worked with the concept of controlling a mobile robot through Bluetooth commands."
      ],
      stack: ["Bluetooth", "Robotics", "Hardware integration"],
      takeaway: "Translating user commands into physical movement through hardware and control logic.",
      link: ""
    }
  ]
};

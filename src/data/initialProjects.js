export const initialProjects = [
  {
    id: "proj-1",
    title: "Palletizing Machine for Glass Jar Products",
    client: "Glassware Manufacturing Plant",
    category: "PLC & HMI Retrofit",
    date: "2023-11",
    technologies: ["Siemens S7-313C", "Siemens HMI OP700", "Mitsubishi PLC (Legacy)", "VFDs", "ASI Sensors"],
    description: "Successfully upgraded a legacy glass jar palletizing system. The original setup used an older Mitsubishi PLC and ASI sensors which restricted customization and caused significant maintenance issues. Kassel Technology reprogrammed and retrofitted the machine using a Siemens S7-313C PLC and HMI OP700, and integrated variable frequency drives (VFDs) for dynamic speed control.",
    overview: "Retrofitting legacy machinery with modern PLC controls to improve adaptability and reduce diagnostic overhead.",
    beforeSpec: "Mitsubishi PLC with ASI sensors, hardwired control logic, and zero operator feedback screens. Frequent downtime and difficult troubleshooting.",
    afterSpec: "Siemens S7-313C PLC, Siemens HMI OP700, and custom VFD speed controllers. Unified terminal block distribution and structured cabinet layout.",
    scopeOfWork: [
      "Decommissioning of legacy Mitsubishi PLC and ASI sensor networks",
      "Cabinet rewiring and integration of Siemens S7-313C hardware",
      "VFD programming for multi-axis conveyor motor speed optimization",
      "HMI design and interface programming on OP700",
      "On-site testing, speed tuning, and sensor alignment"
    ],
    features: [
      "Layer configuration selection directly from HMI screen",
      "Pattern selector for 2 distinct types of glass jars",
      "Real-time speed regulation of conveyor motors using VFDs",
      "Comprehensive diagnostic alarms on HMI screen for easy troubleshooting"
    ],
    outcomes: [
      "Reduced system downtime by 45% through clear diagnostic feedback",
      "Increased production flexibility, allowing operators to change jar profiles in under a minute",
      "Smoother mechanical transition leading to 30% less product breakage during palletizing"
    ],
    image: "/assets/projects/palletizing.jpg"
  },
  {
    id: "proj-2",
    title: "Compactor Machine for Paper Waste",
    client: "Recycling & Logistics Center",
    category: "Industrial Machinery",
    date: "2024-02",
    technologies: ["Siemens S7-1214", "Siemens HMI OP700", "Omron CP1E (Legacy)", "LOGO PLC (Legacy)"],
    description: "Upgraded a waste paper compactor system. The legacy controls consisted of a password-locked Omron CP1E and a LOGO PLC with rigid hardwired logic, preventing the client from adjusting cycles or adding safety overrides. Kassel Technology designed and integrated a new S7-1214 control system and OP700 HMI, writing a custom, well-structured, and fully documented program from scratch.",
    overview: "Replacing locked, undocumented legacy controllers with an open-source, operator-configurable Siemens platform.",
    beforeSpec: "Locked Omron CP1E and LOGO PLCs. No touchscreen, purely physical push-buttons. Inability to modify cycles or perform maintenance diagnostic checks.",
    afterSpec: "Siemens S7-1214 PLC and Siemens HMI OP700. Open-source program with comprehensive documentation and clear HMI controls.",
    scopeOfWork: [
      "Electrical tracing of legacy hardwired safety and logic relays",
      "Removal of locked Omron CP1E and LOGO controller hardware",
      "Panel fabrication and mounting of Siemens S7-1214",
      "Developing Siemens TIA Portal PLC code and WinCC Flexible HMI project",
      "Safety interlock integration and manual/auto testing cycles"
    ],
    features: [
      "Configurable cycle limit settings (run/stop triggers)",
      "Manual control overrides for sensor test and physical alignment checks",
      "Auto-stop upon block density detection or jam state",
      "Complete program access and electrical schematic documentation delivered to the client"
    ],
    outcomes: [
      "Enabled maintenance staff to diagnose sensor failures within seconds instead of hours",
      "Increased operator safety through modern digital safety interlocks and screen warnings",
      "Extensible system architecture allowing future conveyor belts to be added easily"
    ],
    image: "/assets/projects/compactor.jpg"
  },
  {
    id: "proj-3",
    title: "Pump House Automation System (Rumah Pump)",
    client: "Bagan Terap Drainage Authorities",
    category: "SCADA & Data Systems",
    date: "2024-08",
    technologies: ["Siemens S7-1200", "Siemens WinCC RT Advanced", "Xylem Flygt Controller", "Modbus TCP/RTU", "Flowmeters", "Level Sensors"],
    description: "Design, programming, and installation of a centralized SCADA and PLC control system for a 4-pump drainage house in Bagan Terap. The system interfaces with individual Xylem Flygt pump controllers using Modbus communications and provides real-time telemetry, runtime equalization, and multi-sensor safety monitoring.",
    overview: "Automating pump operation and telemetry to protect regional agricultural lands from flooding with remote diagnostics.",
    beforeSpec: "Manual pump switching, local alarms only, no record of water levels or flow rates, and uneven wear on pump motors.",
    afterSpec: "Centralized S7-1200 control panel connected to WinCC RT Advanced SCADA. Remote telemetry and automatic rotation scheduling.",
    scopeOfWork: [
      "Control cabinet design, wiring, and safety certifications",
      "S7-1200 PLC coding for multi-pump rotation logic and level-triggered operations",
      "Modbus RTU integration with Xylem Flygt pump control modules",
      "SCADA screens design in WinCC RT Advanced (flow visualization, alarms, trends)",
      "Commissioning of magnetic flowmeters and ultrasonic level sensors"
    ],
    features: [
      "4-pump automatic control with Auto/Manual selector per pump",
      "Duty-standby rotation scheduling based on runtime balancing",
      "Comprehensive interlocks for dry-run protection, motor overload, and high levels",
      "Real-time SCADA visuals showing water depth, flowrate logs, and historical trends"
    ],
    outcomes: [
      "Eliminated manual logging, providing 100% accurate flow and water level reports",
      "Reduced pump wear by equalizing runtime hours across all 4 pumps",
      "Zero flood incidents reported during high-tide windows due to automated priority scaling"
    ],
    image: "/assets/projects/pumphouse.jpg"
  },
  {
    id: "proj-4",
    title: "Modbus Protocol Gateway (Prolink 23)",
    client: "Swift Energy Sdn Bhd",
    category: "Embedded & Gateways",
    date: "2024-12",
    technologies: ["Mastervolt Battery Charger", "Kassel Prolink 23 RTU", "Modbus RTU (FC23)", "Siemens / Omron / IDEC PLCs"],
    description: "Developed a custom industrial-grade protocol gateway (Prolink 23 RTU) to bridge specialized Mastervolt battery charger telemetry with standard industrial PLC and SCADA architectures. This gateway implements Modbus Function Code 23 (Read/Write Multiple Registers) to minimize communication latency and polling overhead in high-density installations.",
    overview: "Designing hardware and firmware to allow custom power electronics to communicate natively with main industrial PLCs.",
    beforeSpec: "Proprietary battery charger network protocol that could not easily map to standard SCADA networks, forcing high polling overhead or custom controller hardware.",
    afterSpec: "Kassel Prolink 23 RTU Gateway, acting as a native Modbus RTU node, presenting charger data neatly in structured registers.",
    scopeOfWork: [
      "Embedded PCB design and serial communication driver development",
      "Firmware development in C for protocol mapping (Mastervolt to Modbus)",
      "Modbus Function Code 23 (FC23) optimization to combine read/write operations",
      "Enclosure fabrication, EMI shielding, and industrial testing",
      "Integration testing with Siemens, Omron, and IDEC PLCs"
    ],
    features: [
      "Support for Modbus FC23 (Read/Write Multiple Registers) for high efficiency",
      "Flexible and scalable register mapping configurable via USB serial command line",
      "Status LEDs for quick diagnostics (Tx/Rx activity, power state, error codes)",
      "Compact DIN-rail mountable hardware enclosure ready for panel integration"
    ],
    outcomes: [
      "Reduced bus traffic and polling overhead by 60% compared to standard Modbus implementations",
      "Allowed seamless battery health monitoring on central SCADA screens",
      "Successfully deployed 50+ units across battery rooms with zero communication errors"
    ],
    image: "/assets/projects/modbus.jpg"
  }
];

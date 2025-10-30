import React, { useState, useEffect, useMemo, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Tooltip from "./Tooltip";

const feasibilityData = [
  {
    name: "Sustainable Design",
    alias: "SD",
    color: "#C6F2CD",
    textColor: "text-green-800",
    requiredChanges: [
      {
        alias: "IGBC_GH-SD-CR-4",
        name: "Universal Design",
        displayText:
          "Differently Abled and Senior citizens friendly building as per NBC (National Building Code)",
        tooltip:
          "Preferred Car Parks, Accessible Restrooms, Wheelchai & Stretcher Provision, Level Pathways / Ramped Access, Wide Walkways, Braille and audio assistance in lifts, One lift with minimum dimensions to allow a stretcher, Visual warning signages in common & exterior areas",
        credits: ["SD CR 4"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-req-SD-CR-4.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-SD-CR-6-1",
        name: "Basic Household Amenities",
        displayText: "Proximity to Essential Basic amenities",
        tooltip:
          "Bank/ ATM, Beauty saloon, Bus stop / Railway station/ Metro station/ Auto stand, Clubhouse, Educational institutions, Grocery store / Super market, Stores, Laundry services, Medical clinic/ Hospital, Park / Garden, Place of Worship, Playground / Jogging track/ walking, Restaurant, Refueling station, Sports club / Fitness center / Gym, Theater",
        credits: ["SD CR 6"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-req-SD-CR-6-1.png",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-SD-CR-6-2",
        name: "On-Site Amenities",
        displayText: "Children Play Area, Seating spaces in common area",
        tooltip: "",
        credits: ["SD CR 6"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-req-SD-CR-6-2.png",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-SD-CR-7",
        name: "Basic Facilities for Construction Workforce",
        displayText: "Basic Facilities for Construction Workforce",
        tooltip:
          "Adequate housing, Sanitary measures, First-aid and emergency facilities, Adequate drinking water facilities, Personal protective equipment, Dust suppression measures, Adequate illumination levels, Day care/ crèche facility for workers’ children",
        credits: ["SD CR 7"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-req-SD-CR-7.png",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-SD-CR-8",
        name: "Green Education and Awareness",
        displayText: "Green Education & Awareness",
        tooltip:
          "Awareness sessions, Display signages, Project brochure, Circulate green home guidelines, Permanent signages highlighting implemented green features",
        credits: ["SD CR 8"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-req-SD-CR-8.png",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
    ],
    nudges: [
      {
        alias: "IGBC_GH-SD-CR-1",
        name: "Natural Topography & Vegetation",
        displayText: "Natural Topography and / or Vegetated area",
        tooltip: "15% to 40% of Site area",
        credits: ["SD CR 1"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-1.png",
        pointsAvailable: 4,
        targetPoints: { certified: 0, silver: 3, gold: 3, platinum: 3 },
      },
      {
        alias: "IGBC_GH-SD-CR-2-1",
        name: "Heat Island Effect - Non-Roof Areas",
        displayText: "Non-Roof areas: High SRI materials or Shade",
        tooltip: "50% to 75% of non-impervious area",
        credits: ["SD CR 2"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-2-1.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-SD-CR-2-2",
        name: "Heat Island Effect - Roof Areas",
        displayText: "Roof areas: High SRI materials or Roof garden",
        tooltip: "75% to 95% of roof area",
        credits: ["SD CR 2"],

        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-2-2.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-SD-CR-3-1",
        name: "Exterior Openings with Projection factor",
        displayText: "Exterior Openings with Projection factor",
        tooltip: "Projection factor: 0.5 or more for more than 80% windows",
        credits: ["SD CR 3"],

        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-3-1.png",
        pointsAvailable: 1,
        targetPoints: { certified: 0, silver: 0, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-SD-CR-3-2",
        name: "Skylights",
        displayText: "Skylights",
        tooltip: "10% of the building roof area",
        credits: ["SD CR 3"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-3-2.png",
        pointsAvailable: 1,
        targetPoints: { certified: 0, silver: 0, gold: 0, platinum: 0 },
      },
      {
        alias: "IGBC_GH-SD-CR-3-3",
        name: "Daylighting in Common Area",
        displayText: "Daylighting in Common Area",
        tooltip:
          "50% of the common areas (lobbies, corridors, staircase) with daylight",
        credits: ["SD CR 3"],

        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-3-3.png",
        pointsAvailable: 1,
        targetPoints: { certified: 0, silver: 0, gold: 0, platinum: 1 },
      },
      {
        alias: "IGBC_GH-SD-CR-3-4",
        name: "Passive Cooling / Heating",
        displayText: "Passive Cooling / Heating Technologies",
        tooltip:
          "Wind tower, Earth tunnel, Geothermal technologies and any other passive measures",
        credits: ["SD CR 3"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-3-4.png",
        pointsAvailable: 1,
        targetPoints: { certified: 0, silver: 0, gold: 0, platinum: 0 },
      },
      {
        alias: "IGBC_GH-SD-CR-5-1",
        name: "ventilation for Basements",
        displayText: "Ventilation for Basements",
        tooltip:
          "Provide axial fans, CO sensors and meet minimum air changes per hour (ACH*) requirements as per NBC 2016 in the basement parking spaces",
        credits: ["SD CR 5"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-5-1.png",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-SD-CR-5-2",
        displayText: "Electric Charging Facility",
        tooltip: "20% to 30% of total parking spaces",
        credits: ["SD CR 5"],

        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-5-2.png",
        pointsAvailable: 2,
        targetPoints: { certified: 1, silver: 1, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-SD-CR-5-3",
        displayText: "Bicycle Parking",
        tooltip: "5% of number of Dwelling units",
        credits: ["SD CR 5"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/SD/IGBC_GH-nud-SD-CR-5-3.png",
        pointsAvailable: 1,
        targetPoints: { certified: 0, silver: 0, gold: 0, platinum: 1 },
      },
    ],
  },
  {
    name: "Water Conservation",
    alias: "WC",
    color: "#C9F5FF",
    textColor: "text-blue-800",
    requiredChanges: [
      {
        alias: "IGBC_GH-WC-CR-3",
        displayText: "Efficient irrigation systems",
        tooltip:
          "A. Drip/Sprinkler Irrigation systems. B. Any three measures to meet the compliance: Central shut-off valve; Turf and each type of bedding area must be segregated into independent zones based on watering needs; Pressure regulating device(s); Moisture-based sensor controllers; Install timer-controlled irrigation systems; Any other innovative methods.",
        credits: ["WC CR 3"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/WC/IGBC_GH-req-WC-CR-3.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-WC-CR-5",
        displayText: "Potable water quality",
        tooltip:
          "Install a water treatment plant (WTP) to remove sediments, bacteria and other impurities. The system shall be designed to meet 95 % of the total dwelling units (or) total occupancy",
        credits: ["WC CR 5"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/WC/IGBC_GH-req-WC-CR-5.png",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
    ],
    nudges: [
      {
        alias: "IGBC_GH-WC-CR-1",
        displayText: "Water Savings in Plumbing Fixtures",
        tooltip: "25% to 35% of reduction in total water consumption",
        credits: ["WC CR 1"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/WC/IGBC_GH-nud-WC-CR-1.png",
        pointsAvailable: 6,
        targetPoints: { certified: 4, silver: 4, gold: 4, platinum: 6 },
      },
      {
        alias: "IGBC_GH-WC-CR-2",
        displayText: "Limited Turf + Native/Adaptive Plants",
        tooltip:
          "15% or less Turf, 40% or above Native / Adaptive Plants, 5% or above Fruit bearing plants",
        credits: ["WC CR 2"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/WC/IGBC_GH-nud-WC-CR-2.png",
        pointsAvailable: 3,
        targetPoints: { certified: 2, silver: 3, gold: 3, platinum: 3 },
      },
      {
        alias: "IGBC_GH-WC-CR-4",
        displayText: "Recycle & Reuse of Waste Water",
        tooltip:
          "50% to 90% of waste water treated; 50% to 75% of treated water to be reused",
        credits: ["WC CR 4"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/WC/IGBC_GH-nud-WC-CR-4.png",
        pointsAvailable: 4,
        targetPoints: { certified: 3, silver: 3, gold: 3, platinum: 3 },
      },
      {
        alias: "IGBC_GH-WC-CR-6",
        displayText: "Enhanced Rainwater Harvesting",
        tooltip: "",
        credits: ["WC CR 6"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/WC/IGBC_GH-nud-WC-CR-6.png",
        pointsAvailable: 4,
        targetPoints: { certified: 2, silver: 2, gold: 3, platinum: 3 },
      },
      {
        alias: "IGBC_GH-WC-CR-7",
        displayText: "Water Metering",
        tooltip:
          "1. Install Water meters at dwelling unit level (Kitchen, Toilets): 75% to 100% of Dwelling Unit Consumption; 2. Other Area Water meters (any 3 measures).",
        credits: ["WC CR 7"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/WC/IGBC_GH-nud-WC-CR-7.png",
        pointsAvailable: 3,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
    ],
  },
  {
    name: "Energy Efficiency",
    alias: "EE",
    color: "#FFF4D5",
    textColor: "text-yellow-800",
    requiredChanges: [
      {
        alias: "IGBC_GH-EE-CR-4",
        displayText: "Energy Efficiency in common area equipment",
        tooltip:
          "Provide any two of the following: 1. Pumps: BEE 4-star rated (or) Minimum 70% efficiency. 2. Motors: BEE 4-star rated (or) Minimum 85% efficiency. 3. Efficient Lifts & Escalators.",
        credits: ["EE CR 4"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/EE/IGBC_GH-EE-CR-4.png",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-EE-CR-5",
        displayText: "Integrated Energy Monitoring System",
        tooltip: "Energy Metering / Bulding Management Systems",
        credits: ["EE CR 5"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/EE/IGBC_GH-EE-CR-5.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
    ],
    nudges: [
      {
        alias: "IGBC_GH-EE-CR-1",
        displayText: "Enhanced Energy Efficiency",
        tooltip:
          "Simulation Approach: 10% to 25% Energy savings; Prescriptive approach: Building Envelope, Lighting Power Density, AC, Lighting controls, Space Heating Systems.",
        credits: ["EE CR 1"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/EE/IGBC_GH-EE-CR-1.png",
        pointsAvailable: 10,
        targetPoints: { certified: 3, silver: 5, gold: 5, platinum: 6 },
      },
      {
        alias: "IGBC_GH-EE-CR-2",
        displayText: "Alternate water heating systems",
        tooltip:
          "50% to 95% of hot water demand to be catered by alternate water heating systems.",
        credits: ["EE CR 2"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/EE/IGBC_GH-EE-CR-2.png",
        pointsAvailable: 3,
        targetPoints: { certified: 0, silver: 0, gold: 0, platinum: 0 },
      },
      {
        alias: "IGBC_GH-EE-CR-3",
        displayText: "On-site Renewable Energy",
        tooltip:
          "25% to 95% of Common area lighting energy demand to be catered by on-site renewable energy.",
        credits: ["EE CR 3"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/EE/IGBC_GH-EE-CR-3.png",
        pointsAvailable: 4,
        targetPoints: { certified: 1, silver: 1, gold: 2, platinum: 3 },
      },
    ],
  },
  {
    name: "Materials & Resources",
    alias: "MR",
    color: "#F3E3FD",
    textColor: "text-red-800",
    requiredChanges: [
      {
        alias: "IGBC_GH-MR-CR-1",
        displayText: "Green Procurement Policy",
        tooltip:
          "Have a policy and procurement guidelines in place to purchase eco-labelled building products & materials.",
        credits: ["MR CR 1"],
        image: "https://placehold.co/600x400/fca5a5/991b1b?text=Policy",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-MR-CR-2",
        displayText: "Optimisation on structural design",
        tooltip:
          "Demonstrate a saving of at least 2.5% by weight of steel and cement",
        credits: ["MR CR 2"],
        image: "https://placehold.co/600x400/fca5a5/991b1b?text=Design",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-MR-CR-8",
        displayText: "Organic waste management",
        tooltip:
          "Install on-site waste treatment system for treating 95% organic waste generated.",
        credits: ["MR CR 8"],
        image: "https://placehold.co/600x400/fca5a5/991b1b?text=Waste",
        pointsAvailable: 3,
        targetPoints: { certified: 3, silver: 3, gold: 3, platinum: 3 },
      },
    ],
    nudges: [
      {
        alias: "IGBC_GH-MR-CR-3",
        displayText: "Certified green products",
        tooltip:
          "15% to 25% of total material cost to be of Certified green products",
        credits: ["MR CR 3"],
        image: "",
        pointsAvailable: 5,
        targetPoints: { certified: 3, silver: 5, gold: 5, platinum: 5 },
      },
      {
        alias: "IGBC_GH-MR-CR-4",
        displayText: "Local Materials",
        tooltip: "50% to 75% of total materials costs to be of Local Materials",
        credits: ["MR CR 4"],
        image: "",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-MR-CR-5",
        displayText: "Eco friendly wood based materials",
        tooltip:
          "50% to 75% of total wood-based products cost to be of Eco Friendly / alternate wood ",
        credits: ["MR CR 5"],
        image: "",
        pointsAvailable: 2,
        targetPoints: { certified: 1, silver: 1, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-MR-CR-6",
        displayText: "Alternative construction materials",
        tooltip:
          "5% to 10% of total material cost to be of alternative materials",
        credits: ["MR CR 6"],
        image: "",
        pointsAvailable: 2,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
      {
        alias: "IGBC_GH-MR-CR-7",
        displayText: "Handling of construction & demolition waste",
        tooltip:
          "50% to 95% of construction waste has to be avoided from being sent to landfills",
        credits: ["MR CR 7"],
        image: "",
        pointsAvailable: 2,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 2 },
      },
    ],
  },
  {
    name: "Resident Health & Well Being",
    alias: "RHW",
    color: "#FEE7EC",
    textColor: "text-pink-800",
    requiredChanges: [
      {
        alias: "IGBC_GH-RHW-CR-4",
        displayText: "Connectivity to Exteriors",
        tooltip:
          "50% to 75% of regularly occupied spaces with connectivity to exteriors",
        credits: ["RHW CR 4"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/RHW/IGBC_GH-RHW-CR-4.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-RHW-CR-5",
        displayText: "Low VOC Materials, Paints & Adhesives",
        tooltip:
          "Source GreenPro or any other Eco-label certified paints, coatings, adhesives, sealants",
        credits: ["RHW CR 5"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/RHW/IGBC_GH-RHW-CR-5.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-RHW-CR-6",
        displayText: "Facility for Physical Wellbeing",
        tooltip:
          "5% of total occupants can be accommodated in the well-being facilites at any point during the day. ",
        credits: ["RHW CR 6"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/RHW/IGBC_GH-RHW-CR-6.png",
        pointsAvailable: 2,
        targetPoints: { certified: 2, silver: 2, gold: 2, platinum: 2 },
      },
    ],
    nudges: [
      {
        alias: "IGBC_GH-RHW-CR-1",
        displayText: "Enhanced Daylighting",
        tooltip:
          "75%  to 95% of regurlay occupied spaces in dwelling units to have sufficient daylight with minimum glazing factors",
        credits: ["RHW CR 1"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/RHW/IGBC_GH-RHW-CR-1.png",
        pointsAvailable: 2,
        targetPoints: { certified: 0, silver: 1, gold: 1, platinum: 2 },
      },
      {
        alias: "IGBC_GH-RHW-CR-2",
        displayText: "Enhanced Ventilation Design",
        tooltip:
          "Openable area of 5% to 12% of the carpet area in all regularly occupied spaces in dwelling units",
        credits: ["RHW CR 2"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/RHW/IGBC_GH-RHW-CR-2.png",
        pointsAvailable: 2,
        targetPoints: { certified: 0, silver: 0, gold: 2, platinum: 2 },
      },
      {
        alias: "IGBC_GH-RHW-CR-3",
        displayText: "Cross Ventilation",
        tooltip:
          "25% to 95% of the regularly occupied spaces to have cross ventilation",
        credits: ["RHW CR 3"],
        image:
          "https://sdplus-public-assets.s3.ap-south-1.amazonaws.com/FeasibilityReportImages/RHW/IGBC_GH-RHW-CR-3.png",
        pointsAvailable: 4,
        targetPoints: { certified: 0, silver: 0, gold: 1, platinum: 1 },
      },
    ],
  },
  {
    name: "Innovation & Design",
    alias: "ID",
    color: "#E1E6FF",
    textColor: "text-cyan-800",
    requiredChanges: [
      {
        alias: "IGBC_GH-ID-CR-3",
        displayText: "IGBC Accredited Professional",
        tooltip:
          "Atleast one principal participant of the project team shall be an IGBC Accredited Professional",
        credits: ["ID CR 3"],
        image: "https://placehold.co/600x400/a5f3fc/155e75?text=Professional",
        pointsAvailable: 1,
        targetPoints: { certified: 1, silver: 1, gold: 1, platinum: 1 },
      },
    ],
    nudges: [
      {
        alias: "IGBC_GH-ID-CR-1",
        displayText: "Innovation",
        tooltip:
          "Innovation strategies those are not addressed by any existing credits in the rating system",
        credits: ["ID CR 1"],
        image: "",
        pointsAvailable: 2,
        targetPoints: { certified: 0, silver: 0, gold: 1, platinum: 2 },
      },
      {
        alias: "IGBC_GH-ID-CR-2",
        displayText: "Exemplary Performance",
        tooltip:
          "identify appropriate strategies that significantly exceed the requirements of IGBC Green Homes rating system credits",
        credits: ["ID CR 2"],
        image: "",
        pointsAvailable: 2,
        targetPoints: { certified: 0, silver: 2, gold: 2, platinum: 2 },
      },
    ],
  },
];
const certificationLevels = {
  "Not Certified": { min: 0, max: 49, color: "bg-gray-200 text-gray-700" },
  Certified: { min: 50, max: 59, color: "bg-green-200 text-green-800" },
  Silver: { min: 60, max: 69, color: "bg-blue-200 text-blue-800" },
  Gold: { min: 70, max: 79, color: "bg-yellow-200 text-yellow-800" },
  Platinum: { min: 80, max: 100, color: "bg-purple-200 text-purple-800" },
};

// --- Helper Components ---

const CreditCard = ({
  credit,
  attemptedCredit,
  onToggle,
  onStartEdit,
  onSaveEdit,
  type,
  isEditing,
  creditCounts,
}) => {
  const isSelected = !!attemptedCredit;
  const points = isSelected ? attemptedCredit.points : 0;
  const imageUrl =
    credit.image ||
    `https://placehold.co/600x400/e2e8f0/4a5568?text=${encodeURIComponent(
      credit.displayText.split(" ").slice(0, 3).join(" ")
    )}`;

  const [editValue, setEditValue] = useState(points);

  useEffect(() => {
    setEditValue(points);
  }, [points]);

  const creditId = credit.credits[0];
  const isMultiPart = creditCounts[creditId] > 1;
  const subId = credit.alias.replace(/^(IGBC_GH-|)/, "");

  const typeStyles = {
    required: {
      label: "REQUIRED",
      labelClasses: "bg-red-100 text-red-700",
      ring: "ring-red-500",
    },
    recommended: {
      label: "RECOMMENDED",
      labelClasses: "bg-blue-100 text-blue-700",
      ring: "ring-blue-500",
    },
    other: { label: null, labelClasses: "", ring: "ring-gray-300" },
  };

  const currentStyle = typeStyles[type];

  const handleCardClick = () => {
    if (type !== "required") {
      onToggle(!isSelected, credit);
    }
  };

  const handleSave = () => {
    onSaveEdit(credit.alias, editValue, credit.pointsAvailable);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onSaveEdit(credit.alias, points, credit.pointsAvailable); // Revert to original points on escape
    }
  };

  return (
    <div
      className={`relative flex flex-col rounded-xl shadow-md overflow-hidden bg-white group transition-all duration-300 transform hover:-translate-y-1 ${
        type === "required" ? "cursor-not-allowed" : "cursor-pointer"
      } ${
        isSelected
          ? "ring-2 ring-green-500"
          : `ring-1 ${currentStyle.ring} hover:ring-green-400`
      }`}
      onClick={handleCardClick}
    >
      {currentStyle.label && (
        <div
          className={`absolute top-2 right-2 ${currentStyle.labelClasses} text-xs font-bold px-2 py-1 rounded-full z-10`}
        >
          {currentStyle.label}
        </div>
      )}

      <img
        src={imageUrl}
        alt={credit.displayText}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/600x400/e2e8f0/4a5568?text=Image+Not+Found";
        }}
      />

      <div className="p-4 flex-grow">
        <h4 className="font-semibold text-gray-800 text-base leading-tight h-12">
          {credit.displayText}
        </h4>
      </div>

      <div className="p-3 flex justify-between items-center bg-gray-50 border-t">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={credit.alias}
            className={`h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
              type === "required" ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            checked={isSelected}
            disabled={type === "required"}
            readOnly
          />
          {isEditing ? (
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="ml-2 w-16 text-center font-bold text-lg border-green-500 border-2 rounded-md"
              autoFocus
            />
          ) : (
            <label
              htmlFor={credit.alias}
              className={`ml-2 font-bold text-lg tabular-nums ${
                isSelected ? "text-green-700" : "text-gray-600"
              }`}
            >
              {points}
            </label>
          )}
          <span className="text-gray-500 text-sm">
            {" "}
            / {credit.pointsAvailable} Pts
          </span>
          {type !== "required" && isSelected && !isEditing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartEdit(credit.alias);
              }}
              className="ml-2 p-1 rounded-full hover:bg-green-100 text-gray-500 hover:text-green-700 transition"
              aria-label="Edit points"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
                ></path>
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right text-xs text-gray-500 font-mono">
            <div>{creditId}</div>
            {isMultiPart && <div className="text-gray-400">{subId}</div>}
          </div>
          {credit.tooltip && (
            <Tooltip text={credit.tooltip}>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

const CategorySection = ({
  category,
  desiredLevel,
  attemptedCredits,
  onToggle,
  onStartEdit,
  onSaveEdit,
  editingAlias,
  creditCounts,
}) => {
  const [view, setView] = useState("recommended");

  const allCredits = useMemo(() => {
    // Helper function to extract numeric part from alias
    const getAliasNumber = (alias) => {
      const match = alias.match(/CR-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };

    // Combine and map all credits
    const allMappedCredits = [
      ...category.requiredChanges.map((c) => ({ ...c, type: "required" })),
      ...category.nudges.map((c) => ({
        ...c,
        type: c.targetPoints[desiredLevel] > 0 ? "recommended" : "other",
      })),
    ];

    // Sort by credit number
    return allMappedCredits.sort((a, b) => {
      const numA = getAliasNumber(a.alias);
      const numB = getAliasNumber(b.alias);
      return numA - numB;
    });
  }, [category, desiredLevel]);

  const visibleCredits = useMemo(() => {
    if (view === "all") return allCredits;
    return allCredits.filter((c) => c.type !== "other");
  }, [view, allCredits]);

  return (
    <div className="bg-white p-4  sm:p-6 rounded-xl shadow-lg flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700">
          {category.name}
        </h2>
        <div className="flex items-center bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setView("recommended")}
            className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${
              view === "recommended"
                ? "bg-white text-green-700 shadow"
                : "text-gray-600"
            }`}
          >
            Recommended
          </button>
          <button
            onClick={() => setView("all")}
            className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${
              view === "all"
                ? "bg-white text-green-700 shadow"
                : "text-gray-600"
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {visibleCredits.map((credit) => (
            <CreditCard
              key={credit.alias}
              credit={credit}
              attemptedCredit={attemptedCredits[credit.alias]}
              onToggle={onToggle}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              type={credit.type}
              isEditing={editingAlias === credit.alias}
              creditCounts={creditCounts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---
const ProjectDetails = ({ onNext, projectData, setProjectData }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
        IGBC Green Homes Certification
      </h1>
      <p className="text-center text-gray-500 mb-8">Feasibility Workflow</p>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectData.name || ""}
            onChange={(e) =>
              setProjectData({ ...projectData, name: e.target.value })
            }
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="builtUpArea"
            className="block text-sm font-medium text-gray-700"
          >
            Built-up Area (sq. m)
          </label>
          <input
            type="number"
            id="builtUpArea"
            value={projectData.area || ""}
            onChange={(e) =>
              setProjectData({ ...projectData, area: e.target.value })
            }
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="certificationLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Desired Certification Level
          </label>
          <select
            id="certificationLevel"
            value={projectData.level || "certified"}
            onChange={(e) =>
              setProjectData({ ...projectData, level: e.target.value })
            }
            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="certified">Certified</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
      </div>
      <div className="mt-10 text-center">
        {(!projectData.name || !projectData.area) && (
          <p className="text-red-500 mb-4">
            Please provide both project name and built-up area to continue
          </p>
        )}
        <button
          onClick={onNext}
          disabled={!projectData.name || !projectData.area}
          className={`font-bold py-3 px-8 rounded-lg transition duration-300 ${
            !projectData.name || !projectData.area
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Start Feasibility Check
        </button>
      </div>
    </div>
  );
};

const MandatoryRequirements = ({ onNext, onBack }) => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
    <div className="flex justify-center mb-4">
      <div className="bg-red-100 p-3 rounded-full">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      </div>
    </div>
    <h1 className="text-2xl font-bold mb-2">Mandatory Requirements</h1>
    <p className="text-gray-500 mb-8">
      All projects must comply with these to be eligible for certification.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left text-sm sm:text-base">
      {[
        "Local Building Regulations",
        "Soil Erosion Control",
        "Water Efficient Plumbing Fixtures",
        "Rainwater Harvesting",
        "HCFC Free Equipment",
        "Minimum Energy Performance",
        "Separation of House-hold Waste",
        "Minimum Daylighting",
        "Ventilation Design",
        "No Smoking Policy",
      ].map((item) => (
        <div key={item} className="bg-red-50 p-4 rounded-lg flex items-center">
          <svg
            className="w-5 h-5 text-red-500 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {item}
        </div>
      ))}
    </div>
    <div className="mt-8 flex justify-center space-x-4">
      <button
        onClick={onBack}
        className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
      >
        Acknowledge & Proceed{" "}
        <svg
          className="w-5 h-5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
);

const CreditsPage = ({
  onNext,
  onBack,
  categoryIndices,
  projectData,
  attemptedCredits,
  setAttemptedCredits, // This prop is necessary
  creditCounts,
}) => {
  const [editingAlias, setEditingAlias] = useState(null); // State for editing

  const handleToggleCredit = (isSelected, credit) => {
    const newAttempted = { ...attemptedCredits };
    if (isSelected) {
      newAttempted[credit.alias] = {
        points: credit.pointsAvailable, // Default to max points on selection
        max: credit.pointsAvailable,
      };
    } else {
      delete newAttempted[credit.alias];
      if (editingAlias === credit.alias) {
        setEditingAlias(null); // Cancel edit if card is deselected
      }
    }
    setAttemptedCredits(newAttempted);
  };

  const handleSaveEdit = (alias, newPointsStr, maxPoints) => {
    const newPoints = parseInt(newPointsStr, 10);
    if (!isNaN(newPoints) && newPoints >= 0 && newPoints <= maxPoints) {
      setAttemptedCredits((prev) => ({
        ...prev,
        [alias]: { ...prev[alias], points: newPoints },
      }));
    } else {
      // The user's original code used alert().
      // In a real app, we'd use a modal, but we'll keep the user's requested behavior.
      alert(`Please enter a valid number between 0 and ${maxPoints}.`);
    }
    setEditingAlias(null); // Exit editing mode
  };

  return (
    <div className="bg-transparent p-0 rounded-xl">
      <div className="space-y-8">
        {categoryIndices.map((index) => (
          <CategorySection
            key={feasibilityData[index].alias}
            category={feasibilityData[index]}
            desiredLevel={projectData.level}
            attemptedCredits={attemptedCredits}
            onToggle={handleToggleCredit}
            onStartEdit={setEditingAlias}
            onSaveEdit={handleSaveEdit}
            editingAlias={editingAlias}
            creditCounts={creditCounts}
          />
        ))}
      </div>
      {/* Back and Next buttons are in the main component's sticky footer */}
    </div>
  );
};

// --- NEW/UPDATED REPORT COMPONENTS ---

/**
 * NEW: ReportCreditCard
 * This component is styled to match the user's snippet for a "CreditCard".
 */
const ReportCreditCard = ({ credit, achievedPoints, isMandatory }) => {
  // Determine compliance and styling
  const isCompliant = achievedPoints > 0;

  // Use targetPoints to check compliance for mandatory items
  const isMandatoryCompliant =
    isMandatory && achievedPoints >= credit.targetPoints["certified"];

  let statusColor, textColor, bgColor, borderColor;

  if (isMandatory) {
    if (isMandatoryCompliant) {
      statusColor = "bg-green-500";
      textColor = "text-green-800";
      bgColor = "bg-green-50";
      borderColor = "border-green-200";
    } else {
      statusColor = "bg-red-500";
      textColor = "text-red-800";
      bgColor = "bg-red-50";
      borderColor = "border-red-200";
    }
  } else {
    if (isCompliant) {
      statusColor = "bg-green-500";
      textColor = "text-gray-800"; // Optional achieved is neutral-positive
      bgColor = "bg-white";
      borderColor = "border-green-300";
    } else {
      statusColor = "bg-gray-300";
      textColor = "text-gray-500";
      bgColor = "bg-gray-50";
      borderColor = "border-gray-200";
    }
  }

  return (
    <div
      className={`rounded-md p-2 text-sm ${bgColor} ${textColor} border ${borderColor} shadow-sm`}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold">{credit.credits[0]}</span>
        <div className="flex items-center gap-1">
          <span className="font-bold tabular-nums">
            {achievedPoints} / {credit.pointsAvailable}
          </span>
        </div>
      </div>
      <p className="text-xs truncate mt-1">{credit.displayText}</p>
    </div>
  );
};

const CategoryReportColumn = ({ category, attemptedCredits }) => {
  // Group all credits by their credit ID
  const allCredits = [...category.requiredChanges, ...category.nudges];
  const creditGroups = allCredits.reduce((groups, credit) => {
    const creditId = credit.credits[0];
    if (!groups[creditId]) {
      groups[creditId] = {
        creditId,
        items: [],
        totalPoints: 0, // Will be calculated as sum of all items
        achievedPoints: 0,
        isMandatory: false,
      };
    }

    // Sort items by alias when adding new item
    const newItems = [...groups[creditId].items, credit].sort((a, b) =>
      a.alias.localeCompare(b.alias)
    );
    groups[creditId].items = newItems;

    // Add to total points available for this credit
    groups[creditId].totalPoints += credit.pointsAvailable;

    // Add achieved points
    groups[creditId].achievedPoints +=
      attemptedCredits[credit.alias]?.points || 0;

    // Special cases for max points
    if (creditId === "SD CR 3") {
      groups[creditId].totalPoints = Math.min(groups[creditId].totalPoints, 2);
    } else if (creditId === "SD CR 5") {
      groups[creditId].totalPoints = Math.min(groups[creditId].totalPoints, 5);
    }

    // Cap achieved points at total points
    groups[creditId].achievedPoints = Math.min(
      groups[creditId].achievedPoints,
      groups[creditId].totalPoints
    );

    groups[creditId].isMandatory =
      groups[creditId].isMandatory || category.requiredChanges.includes(credit);
    return groups;
  }, {});

  // Convert to array and sort by credit number
  const sortedCreditGroups = Object.values(creditGroups).sort((a, b) => {
    const getNumber = (creditId) => {
      const match = creditId.match(/CR (\d+)/);
      return match ? parseInt(match[1]) : 0;
    };
    return getNumber(a.creditId) - getNumber(b.creditId);
  });

  // Calculate total points for category
  const pointsAvailable = sortedCreditGroups.reduce(
    (sum, group) => sum + group.totalPoints,
    0
  );
  const pointsAchieved = sortedCreditGroups.reduce(
    (sum, group) => sum + group.achievedPoints,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 flex flex-col min-w-[200px] max-w-full sm:max-w-[250px] flex-1 overflow-hidden border-gray-200">
      {/* Category Header */}
      <div className="p-3" style={{ backgroundColor: category.color }}>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-extrabold text-black">
            {category.alias}
          </h3>
          <div className="flex items-baseline justify-end">
            <span className="text-2xl font-extrabold text-black tabular-nums">
              {pointsAchieved}
            </span>
            <span className="text-lg font-bold text-gray-700 tabular-nums">
              /{pointsAvailable}
            </span>
          </div>
        </div>
        <p className={`text-sm text-center font-semibold truncate mt-1`}>
          {category.name}
        </p>
      </div>

      {/* Credits Body */}
      <div className="p-2 space-y-1 overflow-y-auto flex-grow">
        <div className="space-y-2">
          {sortedCreditGroups.map((group) => {
            // Get the description from the first item (they should all be related)
            const description = group.items[0].displayText;

            return (
              <div
                key={group.creditId}
                className={`rounded-md p-2 text-sm border ${
                  group.achievedPoints > 0
                    ? "bg-white border-green-300 text-gray-800"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{group.creditId}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold tabular-nums">
                      {group.achievedPoints} / {group.totalPoints}
                    </span>
                  </div>
                </div>
                <p className="text-xs truncate mt-1">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ReportPage = ({ onBack, projectData, totalPoints, attemptedCredits }) => {
  const reportRef = useRef();

  const { currentLevelName, nextLevelName, pointsForNext } = useMemo(() => {
    let current = "Not Certified";
    let next = "Certified";
    let pointsNeeded = certificationLevels.Certified.min;

    const sortedLevels = Object.entries(certificationLevels).sort(
      (a, b) => a[1].min - b[1].min
    );
    for (let i = 0; i < sortedLevels.length; i++) {
      const [levelName, info] = sortedLevels[i];
      if (totalPoints >= info.min) {
        current = levelName;
        const nextLevelEntry = sortedLevels[i + 1];
        if (nextLevelEntry) {
          next = nextLevelEntry[0];
          pointsNeeded = nextLevelEntry[1].min;
        } else {
          next = null;
        }
      }
    }
    return {
      currentLevelName: current,
      nextLevelName: next,
      pointsForNext: pointsNeeded,
    };
  }, [totalPoints]);

  const handleDownloadPdf = () => {
    const reportElement = reportRef.current;

    if (!reportElement) return alert("Report element not found.");

    alert("Generating PDF... This may take a moment.");

    html2canvas(reportElement, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a3",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`IGBC-Report-${projectData.name || "Project"}.pdf`);
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        alert("Could not generate PDF. Please try again.");
      });
  };

  const progress = Math.min((totalPoints / 100) * 100, 100);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
      <div ref={reportRef} className="bg-white p-6">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-green-700">
              IGBC Green Homes
            </h1>
            <p className="text-lg text-gray-600 flex items-center gap-2">
              Project: {projectData.name || "N/A"} -{" "}
              <span className="font-bold">{currentLevelName}</span>{" "}
              <span
                className={`w-3 h-3 rounded-full ${certificationLevels[currentLevelName].color}`}
              ></span>
            </p>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <div className="text-4xl font-bold text-gray-800">
              {totalPoints}
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            {nextLevelName && (
              <p className="text-sm text-blue-600 font-semibold">
                Next Milestone: {nextLevelName} ({pointsForNext - totalPoints}{" "}
                points to go)
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Category Grid - UPDATED */}
        <div className="flex flex-wrap justify-center gap-6">
          {feasibilityData.map((category) => (
            <CategoryReportColumn
              key={category.alias}
              category={category}
              attemptedCredits={attemptedCredits}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={handleDownloadPdf}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Download Report (PDF)
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function Feasibility() {
  const [page, setPage] = useState(1);
  const [projectData, setProjectData] = useState({
    name: "",
    area: "",
    level: "certified",
  });
  const [attemptedCredits, setAttemptedCredits] = useState({});

  const creditCounts = useMemo(() => {
    const counts = {};
    feasibilityData.forEach((cat) => {
      [...cat.requiredChanges, ...cat.nudges].forEach((c) => {
        const creditId = c.credits[0];
        if (creditId) {
          counts[creditId] = (counts[creditId] || 0) + 1;
        }
      });
    });
    return counts;
  }, []);

  const totalPoints = useMemo(() => {
    return Math.round(
      Object.values(attemptedCredits).reduce(
        (sum, credit) => sum + (credit.points || 0),
        0
      )
    );
  }, [attemptedCredits]);

  const { currentLevelName, color } = useMemo(() => {
    let level = "Not Certified";
    const sortedLevels = Object.entries(certificationLevels).sort(
      (a, b) => a[1].min - b[1].min
    );
    for (const [levelName, info] of sortedLevels) {
      if (totalPoints >= info.min) level = levelName;
    }
    return { currentLevelName: level, color: certificationLevels[level].color };
  }, [totalPoints]);

  useEffect(() => {
    if (page === 3) {
      const initialCredits = {};
      const level = projectData.level;
      feasibilityData.forEach((cat) => {
        cat.requiredChanges.forEach((c) => {
          initialCredits[c.alias] = {
            points: c.targetPoints[level],
            max: c.pointsAvailable,
          };
        });
        cat.nudges.forEach((c) => {
          if (c.targetPoints[level] > 0) {
            initialCredits[c.alias] = {
              points: c.targetPoints[level],
              max: c.pointsAvailable,
            };
          }
        });
      });
      setAttemptedCredits(initialCredits);
    }
  }, [page, projectData.level]);

  // Define onNext and onBack handlers based on page
  const onNext = () => {
    if (page === 1) setPage(2);
    else if (page === 2) setPage(3);
    else if (page === 3) setPage(4);
    else if (page === 4) setPage(5);
    else if (page === 5) setPage(6);
  };

  const onBack = () => {
    if (page === 2) setPage(1);
    else if (page === 3) setPage(2);
    else if (page === 4) setPage(3);
    else if (page === 5) setPage(4);
    else if (page === 6) setPage(5);
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <ProjectDetails
            projectData={projectData}
            setProjectData={setProjectData}
            onNext={onNext}
          />
        );
      case 2:
        return <MandatoryRequirements onNext={onNext} onBack={onBack} />;
      case 3:
        return (
          <CreditsPage
            onNext={onNext}
            onBack={onBack}
            categoryIndices={[0, 1]}
            projectData={projectData}
            attemptedCredits={attemptedCredits}
            setAttemptedCredits={setAttemptedCredits} // Pass prop
            creditCounts={creditCounts}
          />
        );
      case 4:
        return (
          <CreditsPage
            onNext={onNext}
            onBack={onBack}
            categoryIndices={[2, 3]}
            projectData={projectData}
            attemptedCredits={attemptedCredits}
            setAttemptedCredits={setAttemptedCredits} // Pass prop
            creditCounts={creditCounts}
          />
        );
      case 5:
        return (
          <CreditsPage
            onNext={onNext}
            onBack={onBack}
            categoryIndices={[4, 5]}
            projectData={projectData}
            attemptedCredits={attemptedCredits}
            setAttemptedCredits={setAttemptedCredits} // Pass prop
            creditCounts={creditCounts}
          />
        );
      case 6:
        return (
          <ReportPage
            onBack={onBack}
            projectData={projectData}
            attemptedCredits={attemptedCredits}
            totalPoints={totalPoints}
          />
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    // This is the fix for the scrolling issue: pb-64
    <div className="max-w-screen-2xl  mx-auto p-2 sm:p-4 lg:p-6 pb-64">
      {renderPage()}

      {page >= 3 && page <= 5 && (
        <div className="bg-white shadow-lg p-4 mt-5 rounded-md border-gray-200 z-50">
          <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Back
            </button>

            {/* Middle Info */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
              <div>
                <span className="font-bold text-base sm:text-lg">
                  Total Points:
                </span>
                <span className="text-green-600 font-bold text-lg sm:text-xl tabular-nums ml-2">
                  {totalPoints}
                </span>
              </div>
              <div>
                <span className="font-bold text-base sm:text-lg">
                  Current Level:
                </span>
                <span
                  className={`font-bold text-lg sm:text-xl px-3 py-1 rounded-full ml-2 ${color}`}
                >
                  {currentLevelName}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={onNext}
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import Place from "../models/place.model";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGODB_URI;

const seedPlaces = [
  {
    title: "Modern Downtown Loft",
    description:
      "Stunning contemporary loft in the heart of downtown with floor-to-ceiling windows, exposed brick walls, and high-end finishes. Perfect for professionals seeking urban luxury.",
    address: "123 Main Street, Downtown District, New York, NY 10001",
    extraInfo:
      "Building amenities include 24/7 concierge, rooftop terrace, gym, and secure parking. Walking distance to subway stations and major shopping centers.",
    pictures: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
    ],
    cancellationPolicy:
      "30-day notice required for cancellation. Security deposit fully refundable upon satisfactory property inspection.",
    rules: [
      "No smoking inside the property",
      "No pets allowed",
      "Maximum occupancy: 2 adults",
      "Quiet hours: 10 PM - 8 AM",
      "No subletting without written consent",
    ],
    perks: [
      "High-speed WiFi included",
      "Air conditioning and heating",
      "Fully equipped kitchen",
      "In-unit washer and dryer",
      "Gym access",
      "Rooftop terrace access",
    ],
    price: 3200,
    rentType: "monthly",
    longitude: -74.006,
    latitude: 40.7128,
    user: "688ca6b2e39a99849220fd95",
  },
  {
    user: "688ca6b2e39a99849220fd95",

    title: "Cozy Garden Apartment",
    description:
      "Charming ground-floor apartment with private garden access. Features original hardwood floors, updated kitchen, and peaceful outdoor space perfect for relaxation.",
    address: "456 Oak Avenue, Brooklyn Heights, NY 11201",
    extraInfo:
      "Private entrance, garden maintenance included, close to Brooklyn Bridge Park and promenade with stunning city views.",
    pictures: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    ],
    cancellationPolicy:
      "45-day notice required. First month's rent non-refundable after move-in.",
    rules: [
      "Small pets welcome with deposit",
      "Garden maintenance is tenant responsibility",
      "No loud music after 9 PM",
      "Maximum occupancy: 3 people",
      "No commercial activities",
    ],
    perks: [
      "Private garden access",
      "Pet-friendly",
      "Hardwood floors",
      "Updated appliances",
      "Near public transportation",
      "Quiet neighborhood",
    ],
    price: 2800,
    rentType: "monthly",
    longitude: -73.9969,
    latitude: 40.6962,
  },
  {
    user: "688ca6b2e39a99849220fd95",

    title: "Luxury Penthouse Suite",
    description:
      "Breathtaking penthouse with panoramic city views, marble finishes, and premium amenities. This exclusive residence offers the ultimate in sophisticated living.",
    address: "789 Park Avenue, Upper East Side, NY 10075",
    extraInfo:
      "Private elevator access, concierge service, valet parking, and access to exclusive club facilities including spa and wine cellar.",
    pictures: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
      "https://images.unsplash.com/photo-1515263487990-61b07816b0ea",
    ],
    cancellationPolicy:
      "60-day notice required. Background check and references mandatory. Security deposit equal to 2 months rent.",
    rules: [
      "No smoking anywhere on premises",
      "No parties or events without approval",
      "Professional cleaning service mandatory",
      "Maximum occupancy: 4 adults",
      "Valet parking only - no self-parking",
    ],
    perks: [
      "Panoramic city views",
      "Concierge service",
      "Valet parking",
      "Private elevator",
      "Spa access",
      "Wine cellar access",
      "Marble finishes",
    ],
    price: 8500,
    rentType: "monthly",
    longitude: -73.9665,
    latitude: 40.7739,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Industrial Warehouse Conversion",
    description:
      "Unique converted warehouse space featuring soaring ceilings, exposed beams, and industrial charm. Perfect for artists, creative professionals, or anyone seeking distinctive living.",
    address: "321 Industrial Blvd, Long Island City, NY 11101",
    extraInfo:
      "Open floor plan allows for customization. Large windows provide excellent natural light. Loading dock can be used for moving large items.",
    pictures: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
    ],
    cancellationPolicy:
      "Standard 30-day notice. Property must be returned to original condition if any modifications were made.",
    rules: [
      "No structural modifications without approval",
      "Artist studios and workshops permitted",
      "No hazardous materials storage",
      "Adequate insurance coverage required",
      "Noise restrictions apply after 10 PM",
    ],
    perks: [
      "High ceilings",
      "Industrial character",
      "Artist-friendly",
      "Excellent natural light",
      "Open floor plan",
      "Loading dock access",
      "Creative community",
    ],
    price: 4200,
    rentType: "monthly",
    longitude: -73.9442,
    latitude: 40.7488,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Beachfront Villa",
    description:
      "Stunning oceanfront property with direct beach access, expansive decks, and unobstructed water views. This luxurious retreat offers the perfect blend of comfort and natural beauty.",
    address: "555 Ocean Drive, Montauk, NY 11954",
    extraInfo:
      "Private beach access, outdoor shower, fire pit area, and parking for 4 vehicles. Fully furnished with high-end coastal decor.",
    pictures: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
      "https://images.unsplash.com/photo-1520637836862-4d197d17c92a",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
    ],
    cancellationPolicy:
      "Seasonal rental terms apply. 90-day notice required for annual leases. Storm damage insurance recommended.",
    rules: [
      "No beach fires without permit",
      "Respect marine wildlife and dunes",
      "Maximum occupancy: 8 guests",
      "No commercial filming without permission",
      "Beach equipment must be stored properly",
    ],
    perks: [
      "Direct beach access",
      "Ocean views",
      "Outdoor shower",
      "Fire pit area",
      "Fully furnished",
      "Private deck",
      "Parking for 4 cars",
    ],
    price: 85000,
    rentType: "yearly",
    longitude: -71.9537,
    latitude: 41.0376,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Mountain Cabin Retreat",
    description:
      "Rustic yet comfortable cabin nestled in the mountains, offering tranquility and stunning natural surroundings. Perfect for those seeking escape from city life.",
    address: "777 Pine Ridge Road, Hunter, NY 12442",
    extraInfo:
      "Wood-burning fireplace, wraparound porch, hiking trails nearby. Property includes generator backup and well water system.",
    pictures: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    ],
    cancellationPolicy:
      "Seasonal availability. 60-day notice required. Property winterization fee applies for year-round rental.",
    rules: [
      "Fire safety protocols must be followed",
      "No ATVs or motorized vehicles on trails",
      "Wildlife feeding prohibited",
      "Waste must be properly secured",
      "Noise restrictions to preserve nature",
    ],
    perks: [
      "Mountain views",
      "Wood-burning fireplace",
      "Hiking trail access",
      "Wraparound porch",
      "Generator backup",
      "Well water system",
      "Peaceful environment",
    ],
    price: 28000,
    rentType: "yearly",
    longitude: -74.2195,
    latitude: 42.2084,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Historic Brownstone Apartment",
    description:
      "Elegant apartment in a beautifully preserved 19th-century brownstone. Features original architectural details, modern updates, and classic New York charm.",
    address: "234 West 82nd Street, Upper West Side, NY 10024",
    extraInfo:
      "Building has been meticulously maintained. Close to Central Park, museums, and excellent restaurants. Laundry in basement.",
    pictures: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    ],
    cancellationPolicy:
      "Standard lease terms. 30-day notice required. Historic building preservation guidelines must be followed.",
    rules: [
      "No modifications to original features",
      "Quiet hours strictly enforced",
      "No smoking in building",
      "Shoes off in carpeted areas preferred",
      "Respect building's historic character",
    ],
    perks: [
      "Historic character",
      "Original architectural details",
      "Near Central Park",
      "Museum district location",
      "Excellent restaurants nearby",
      "Classic NYC charm",
      "Well-maintained building",
    ],
    price: 3800,
    rentType: "monthly",
    longitude: -73.9776,
    latitude: 40.7829,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Modern Minimalist Studio",
    description:
      "Sleek, contemporary studio designed with clean lines and efficient use of space. Features high-end finishes and smart home technology throughout.",
    address: "890 Tech Avenue, Long Island City, NY 11109",
    extraInfo:
      "Smart home features include automated lighting, climate control, and security system. Building amenities include co-working space and bike storage.",
    pictures: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
    ],
    cancellationPolicy:
      "30-day notice required. Smart home devices must remain in working condition. Technology damage fees may apply.",
    rules: [
      "No modifications to smart home systems",
      "Regular software updates required",
      "No candles or open flames",
      "Maximum occupancy: 2 people",
      "Maintain minimalist aesthetic",
    ],
    perks: [
      "Smart home technology",
      "Modern design",
      "Automated systems",
      "Co-working space access",
      "Bike storage",
      "High-end finishes",
      "Efficient layout",
    ],
    price: 2600,
    rentType: "monthly",
    longitude: -73.9375,
    latitude: 40.7505,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Riverside Townhouse",
    description:
      "Spacious three-story townhouse with private garage and river views. Perfect for families, offering comfort, privacy, and convenient city access.",
    address: "456 River Road, Hoboken, NJ 07030",
    extraInfo:
      "Private garage, small backyard, river views from upper floors. Easy access to NYC via PATH train. Quiet residential neighborhood.",
    pictures: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    ],
    cancellationPolicy:
      "Standard residential lease. 45-day notice required. Garage and yard maintenance included in rent.",
    rules: [
      "Yard maintenance is tenant responsibility",
      "No commercial vehicles in garage",
      "Pets allowed with additional deposit",
      "No subletting without approval",
      "Respect neighbors and quiet hours",
    ],
    perks: [
      "River views",
      "Private garage",
      "Backyard space",
      "Family-friendly",
      "Near public transportation",
      "Quiet neighborhood",
      "Three-story layout",
    ],
    price: 4500,
    rentType: "monthly",
    longitude: -74.0324,
    latitude: 40.7439,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Artist's Creative Loft",
    description:
      "Inspiring loft space designed for creative professionals. Features abundant natural light, high ceilings, and flexible layout perfect for studios and workshops.",
    address: "678 Art District Lane, Bushwick, NY 11237",
    extraInfo:
      "Large windows provide north-facing light ideal for art studios. Industrial sink, extra electrical outlets, and sound-dampening features.",
    pictures: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
    ],
    cancellationPolicy:
      "Artist-friendly lease terms. 30-day notice required. Studio modifications allowed with approval.",
    rules: [
      "Art studio activities permitted",
      "No hazardous chemicals without approval",
      "Ventilation system must be used",
      "Clean-up after messy projects required",
      "Fire safety equipment must be accessible",
    ],
    perks: [
      "North-facing windows",
      "High ceilings",
      "Industrial sink",
      "Extra electrical outlets",
      "Sound-dampening",
      "Flexible layout",
      "Creative community",
    ],
    price: 3600,
    rentType: "monthly",
    longitude: -73.9198,
    latitude: 40.6944,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Luxury Waterfront Condo",
    description:
      "Premium waterfront condominium with floor-to-ceiling windows, private balcony, and spectacular harbor views. Resort-style amenities included.",
    address: "999 Harbor View Drive, Battery Park City, NY 10280",
    extraInfo:
      "24/7 doorman, fitness center, swimming pool, and private marina access. Walking distance to financial district and waterfront parks.",
    pictures: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b0ea",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
    cancellationPolicy:
      "Luxury lease terms. 60-day notice required. Building amenities included in rent. Security deposit required.",
    rules: [
      "Building dress code in common areas",
      "No smoking anywhere in building",
      "Guest registration required",
      "Pool and gym hours must be observed",
      "Balcony furniture restrictions apply",
    ],
    perks: [
      "Harbor views",
      "Private balcony",
      "24/7 doorman",
      "Swimming pool",
      "Fitness center",
      "Marina access",
      "Premium location",
    ],
    price: 6800,
    rentType: "monthly",
    longitude: -74.0159,
    latitude: 40.7095,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Vintage Farmhouse",
    description:
      "Charming restored farmhouse on several acres with original features preserved. Perfect blend of rustic charm and modern comfort in peaceful rural setting.",
    address: "1234 Country Road, Pine Plains, NY 12567",
    extraInfo:
      "Original barn on property, vegetable garden, fruit trees, and pasture land. Propane heating, private well, and septic system.",
    pictures: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    ],
    cancellationPolicy:
      "Rural property lease. 90-day notice required. Property maintenance responsibilities shared with tenant.",
    rules: [
      "Property maintenance participation required",
      "No commercial farming without approval",
      "Well and septic system care required",
      "Respect for rural lifestyle and neighbors",
      "Animal husbandry allowed with approval",
    ],
    perks: [
      "Several acres of land",
      "Original barn",
      "Vegetable garden",
      "Fruit trees",
      "Rural privacy",
      "Historic character",
      "Country lifestyle",
    ],
    price: 32000,
    rentType: "yearly",
    longitude: -73.6626,
    latitude: 41.9009,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Urban Rooftop Penthouse",
    description:
      "Spectacular penthouse with private rooftop terrace offering 360-degree city views. Modern design with premium finishes and entertaining space.",
    address: "555 Skyline Drive, Midtown Manhattan, NY 10019",
    extraInfo:
      "Private rooftop terrace with outdoor kitchen, hot tub, and city views. Smart home automation and premium security system.",
    pictures: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b0ea",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
    ],
    cancellationPolicy:
      "Premium penthouse lease. 90-day notice required. Rooftop terrace maintenance included. Insurance requirements apply.",
    rules: [
      "Rooftop entertaining restrictions apply",
      "No loud music after 10 PM",
      "Hot tub maintenance guidelines required",
      "Weather protection for outdoor furniture",
      "Building management approval for events",
    ],
    perks: [
      "360-degree city views",
      "Private rooftop terrace",
      "Outdoor kitchen",
      "Hot tub",
      "Smart home automation",
      "Premium security",
      "Entertainment space",
    ],
    price: 12000,
    rentType: "monthly",
    longitude: -73.9855,
    latitude: 40.7589,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Cozy Garden Cottage",
    description:
      "Charming cottage surrounded by beautiful gardens with greenhouse and potting shed. Perfect retreat for garden enthusiasts and nature lovers.",
    address: "789 Garden Lane, Cold Spring, NY 10516",
    extraInfo:
      "Maintained flower and vegetable gardens, greenhouse, tool shed, and compost area. Close to hiking trails and Hudson River.",
    pictures: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    ],
    cancellationPolicy:
      "Garden cottage lease. Seasonal considerations apply. Garden maintenance shared responsibility.",
    rules: [
      "Garden maintenance participation expected",
      "Greenhouse care and operation required",
      "Composting system must be maintained",
      "No harmful chemicals in garden",
      "Respect for existing plantings",
    ],
    perks: [
      "Beautiful gardens",
      "Greenhouse access",
      "Tool shed included",
      "Compost area",
      "Nature setting",
      "Hiking trails nearby",
      "River access",
    ],
    price: 24000,
    rentType: "yearly",
    longitude: -73.9568,
    latitude: 41.4301,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Contemporary Glass House",
    description:
      "Stunning modern glass house with panoramic nature views and seamless indoor-outdoor living. Architectural masterpiece in private wooded setting.",
    address: "111 Forest View Road, Woodstock, NY 12498",
    extraInfo:
      "Floor-to-ceiling glass walls, radiant floor heating, and integration with natural landscape. Private wooded lot with stream.",
    pictures: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      "https://images.unsplash.com/photo-1515263487990-61b07816b0ea",
    ],
    cancellationPolicy:
      "Architectural property lease. Special care requirements. 90-day notice required. Professional cleaning mandatory.",
    rules: [
      "Glass surfaces require special care",
      "Professional cleaning service mandatory",
      "No modifications to architectural features",
      "Environmental impact considerations",
      "Wildlife respect required",
    ],
    perks: [
      "Panoramic nature views",
      "Floor-to-ceiling glass",
      "Radiant floor heating",
      "Private wooded setting",
      "Stream on property",
      "Architectural significance",
      "Indoor-outdoor living",
    ],
    price: 48000,
    rentType: "yearly",
    longitude: -74.1181,
    latitude: 42.0409,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Converted Church Loft",
    description:
      "Unique residential conversion of historic church featuring soaring ceilings, stained glass windows, and original architectural details with modern amenities.",
    address: "333 Chapel Street, Hudson, NY 12534",
    extraInfo:
      "Original stained glass windows, pipe organ (non-functional), and Gothic architecture. Parking and modern kitchen/bath additions.",
    pictures: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
    ],
    cancellationPolicy:
      "Historic conversion lease. Preservation guidelines must be followed. 60-day notice required.",
    rules: [
      "Preservation of historic features required",
      "No modifications to stained glass",
      "Respect for building's history",
      "Noise considerations for neighbors",
      "No commercial activities without approval",
    ],
    perks: [
      "Unique historic architecture",
      "Stained glass windows",
      "Soaring ceilings",
      "Gothic features",
      "Conversation piece",
      "One-of-a-kind living",
      "Modern amenities",
    ],
    price: 3900,
    rentType: "monthly",
    longitude: -73.7909,
    latitude: 42.2537,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Lakefront Log Cabin",
    description:
      "Traditional log cabin directly on lake shore with private dock and beach area. Perfect for water enthusiasts seeking rustic comfort and natural beauty.",
    address: "777 Lake Shore Drive, Lake George, NY 12845",
    extraInfo:
      "Private dock, beach area, canoe included, and stone fireplace. Seasonal property with winterization available.",
    pictures: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    ],
    cancellationPolicy:
      "Seasonal lake property. Weather-dependent availability. Dock and watercraft care required.",
    rules: [
      "Dock maintenance responsibility shared",
      "Watercraft care and storage required",
      "Lake conservation practices required",
      "Fire safety near water required",
      "Seasonal property winterization",
    ],
    perks: [
      "Direct lake access",
      "Private dock",
      "Beach area",
      "Canoe included",
      "Stone fireplace",
      "Water activities",
      "Natural beauty",
    ],
    price: 36000,
    rentType: "yearly",
    longitude: -73.7123,
    latitude: 43.4253,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Executive High-Rise Suite",
    description:
      "Luxurious high-rise executive suite with city skyline views, premium furnishings, and concierge services. Perfect for professionals and executives.",
    address: "888 Executive Plaza, Midtown Manhattan, NY 10022",
    extraInfo:
      "Concierge services, valet parking, business center access, and premium location near corporate headquarters and restaurants.",
    pictures: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
      "https://images.unsplash.com/photo-1515263487990-61b07816b0ea",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
    ],
    cancellationPolicy:
      "Executive lease terms. Corporate rates available. 60-day notice required. Professional references required.",
    rules: [
      "Professional conduct in common areas",
      "Business use permitted",
      "Concierge service etiquette required",
      "No smoking anywhere in building",
      "Guest registration required",
    ],
    perks: [
      "City skyline views",
      "Concierge services",
      "Valet parking",
      "Business center access",
      "Premium location",
      "Executive amenities",
      "Professional environment",
    ],
    price: 7500,
    rentType: "monthly",
    longitude: -73.9712,
    latitude: 40.7589,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Suburban Family Home",
    description:
      "Spacious family home in quiet suburban neighborhood with large backyard, garage, and excellent school district. Perfect for families seeking comfort and community.",
    address: "456 Maple Street, Scarsdale, NY 10583",
    extraInfo:
      "Large backyard with play area, two-car garage, finished basement, and proximity to top-rated schools and parks.",
    pictures: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    ],
    cancellationPolicy:
      "Family home lease. School district considerations. 45-day notice required. Yard maintenance shared.",
    rules: [
      "Yard maintenance participation required",
      "Respect for family neighborhood",
      "Children's play area maintenance",
      "No commercial vehicles in driveway",
      "Community guidelines adherence",
    ],
    perks: [
      "Large backyard",
      "Play area for children",
      "Two-car garage",
      "Finished basement",
      "Excellent schools",
      "Safe neighborhood",
      "Family-friendly community",
    ],
    price: 54000,
    rentType: "yearly",
    longitude: -73.7785,
    latitude: 40.9887,
  },
  {
    user: "688ca6b2e39a99849220fd95",
    title: "Downtown Artist Studio",
    description:
      "Raw creative space in vibrant arts district with high ceilings, concrete floors, and industrial features. Perfect for artists, photographers, and creative professionals.",
    address: "222 Arts District Avenue, Chelsea, NY 10011",
    extraInfo:
      "Loading dock access, freight elevator, exposed brick walls, and skylights. Part of thriving artistic community with galleries nearby.",
    pictures: [
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    ],
    cancellationPolicy:
      "Artist studio lease. Creative use encouraged. 30-day notice required. Industrial space considerations.",
    rules: [
      "Creative and artistic use permitted",
      "No hazardous materials without approval",
      "Freight elevator scheduling required",
      "Loading dock etiquette required",
      "Gallery district respect",
    ],
    perks: [
      "High ceilings",
      "Concrete floors",
      "Loading dock access",
      "Freight elevator",
      "Skylights",
      "Arts district location",
      "Creative community",
    ],
    price: 4800,
    rentType: "monthly",
    longitude: -74.0021,
    latitude: 40.744,
  },
];

while (seedPlaces.length < 20) {
  const clone = { ...seedPlaces[seedPlaces.length % 2] };
  clone.title += ` ${seedPlaces.length + 1}`;
  clone.address = `Random Street ${seedPlaces.length + 1}, LA`;
  clone.latitude += Math.random() * 0.01;
  clone.longitude += Math.random() * 0.01;
  seedPlaces.push(clone);
}

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URL!);
    console.log("Connected to MongoDB");

    await Place.deleteMany();
    console.log("Old places removed");

    await Place.insertMany(seedPlaces);
    console.log("20 places seeded successfully");

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedDB();

import { Plant } from './plants';
import { getPlantImageUrl } from './image-utils';
import { searchPlantByScientificName, TreflePlantData } from './trefle-api';

// Plant Categories
export const PLANT_CATEGORIES = {
  ADAPTOGEN: "Adaptogen",
  NERVINE: "Nervine",
  DIGESTIVE: "Digestive",
  IMMUNE: "Immune Support",
  CARDIOVASCULAR: "Cardiovascular",
  RESPIRATORY: "Respiratory",
  MUSCULOSKELETAL: "Musculoskeletal",
  REPRODUCTIVE: "Reproductive Health",
  SKIN: "Skin Health",
  TONIC: "Tonic Herbs",
  ANTIMICROBIAL: "Antimicrobial",
  ANTIOXIDANT: "Antioxidant"
};

// Function to get plant image from Trefle API
export async function getPlantImageFromTrefle(scientificName: string): Promise<string | null> {
  try {
    const trefleData = await searchPlantByScientificName(scientificName);
    return trefleData?.image_url || null;
  } catch (error) {
    console.error(`Error fetching image for ${scientificName}:`, error);
    return null;
  }
}

// Add type safety for plant images
interface PlantWithImage extends Plant {
  image: string;
}

export const samplePlants: Plant[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    description: "A powerful adaptogenic herb known for its stress-reducing and immune-boosting properties.",
    uses: ["Stress Relief", "Immune Support", "Sleep Aid", "Energy Boost"],
    regions: ["India"],
    conditions: ["Anxiety", "Insomnia", "Stress", "Fatigue"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ADAPTOGEN, PLANT_CATEGORIES.NERVINE, PLANT_CATEGORIES.IMMUNE]
  },
  {
    id: "turmeric",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    description: "A vibrant spice with potent anti-inflammatory and antioxidant effects.",
    uses: ["Anti-inflammatory", "Joint Health", "Immune Support"],
    regions: ["India"],
    conditions: ["Inflammation", "High Cholesterol", "Joint Pain"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT, PLANT_CATEGORIES.MUSCULOSKELETAL]
  },
  {
    id: "tulsi",
    name: "Holy Basil (Tulsi)",
    scientificName: "Ocimum tenuiflorum",
    description: "An adaptogenic herb used in Ayurvedic medicine for stress relief and immune support.",
    uses: ["Stress Relief", "Immune Support", "Respiratory Health"],
    regions: ["India"],
    conditions: ["Stress", "Anxiety", "Respiratory Issues", "Colds"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ADAPTOGEN, PLANT_CATEGORIES.RESPIRATORY, PLANT_CATEGORIES.IMMUNE]
  },
  {
    id: "psyllium",
    name: "Psyllium",
    scientificName: "Plantago ovata",
    description: "A natural fiber supplement that aids in digestive health.",
    uses: ["Digestive Health", "Cholesterol Management", "Blood Sugar Control"],
    regions: ["India"],
    conditions: ["Constipation", "High Cholesterol", "Digestive Issues"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE]
  },
  {
    id: "garlic",
    name: "Garlic",
    scientificName: "Allium sativum",
    description: "A powerful antimicrobial herb used for infections and immune support.",
    uses: ["Immune Support", "Heart Health", "Blood Pressure"],
    regions: ["Global"],
    conditions: ["Infections", "High Cholesterol", "High Blood Pressure"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIMICROBIAL, PLANT_CATEGORIES.CARDIOVASCULAR, PLANT_CATEGORIES.IMMUNE]
  },
  {
    id: "ginger",
    name: "Ginger",
    scientificName: "Zingiber officinale",
    description: "A warming herb used for nausea, digestion, and inflammation.",
    uses: ["Digestive Aid", "Nausea Relief", "Anti-inflammatory"],
    regions: ["Asia"],
    conditions: ["Nausea", "Motion Sickness", "Digestive Upset"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE, PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cardamom",
    name: "Cardamom",
    scientificName: "Elettaria cardamomum",
    description: "A sweet and aromatic spice that aids digestion and freshens breath.",
    uses: ["Digestive Aid", "Breath Freshener", "Antioxidant"],
    regions: ["India"],
    conditions: ["Digestive Issues", "Bad Breath", "Nausea"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE, PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "coriander",
    name: "Coriander",
    scientificName: "Coriandrum sativum",
    description: "An herb with cooling properties used in digestive health.",
    uses: ["Digestive Aid", "Anti-inflammatory", "Blood Sugar Control"],
    regions: ["Mediterranean", "Asia"],
    conditions: ["Digestive Issues", "Inflammation", "High Blood Sugar"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE, PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "fennel",
    name: "Fennel",
    scientificName: "Foeniculum vulgare",
    description: "A sweet herb used for digestive issues and bloating.",
    uses: ["Digestive Aid", "Anti-bloating", "Breath Freshener"],
    regions: ["Mediterranean"],
    conditions: ["Bloating", "Digestive Issues", "Bad Breath"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE]
  },
  {
    id: "mint",
    name: "Mint",
    scientificName: "Mentha × piperita",
    description: "A cooling herb used for digestion and freshening breath.",
    uses: ["Digestive Aid", "Breath Freshener", "Cooling"],
    regions: ["Global"],
    conditions: ["Digestive Issues", "Bad Breath", "Nausea"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE, PLANT_CATEGORIES.RESPIRATORY]
  },
  {
    id: "placeholder",
    name: "Placeholder",
    scientificName: "Unknown",
    description: "A placeholder plant",
    uses: [],
    regions: [],
    conditions: [],
    image: "/plants/placeholder.jpg"
  },
  {
    id: "milk-thistle",
    name: "Milk Thistle",
    scientificName: "Silybum marianum",
    description: "An herb traditionally used to support liver health.",
    uses: ["Liver Support", "Detoxification", "Antioxidant"],
    regions: ["Europe", "Mediterranean"],
    conditions: ["Liver Disease", "Detoxification", "High Cholesterol"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "ginseng",
    name: "Ginseng",
    scientificName: "Panax ginseng",
    description: "A root known for its energy-boosting and cognitive-enhancing properties.",
    uses: ["Energy Boost", "Cognitive Enhancement", "Immune Support", "Anti-inflammatory"],
    regions: ["Asia"],
    conditions: ["Fatigue", "Cognitive Decline", "Weak Immune System", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "licorice-root",
    name: "Licorice Root",
    scientificName: "Glycyrrhiza glabra",
    description: "A sweet root with anti-inflammatory and immune-boosting properties. Use with caution.",
    uses: ["Anti-inflammatory", "Immune Support", "Digestive Aid", "Sore Throat Relief"],
    regions: ["Europe", "Asia"],
    conditions: ["Inflammation", "Digestive Issues", "Sore Throat", "Adrenal Fatigue"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "valerian-root",
    name: "Valerian Root",
    scientificName: "Valeriana officinalis",
    description: "A root used as a natural sleep aid and to reduce anxiety.",
    uses: ["Sleep Aid", "Anxiety Relief", "Muscle Relaxant"],
    regions: ["Europe", "Asia"],
    conditions: ["Insomnia", "Anxiety", "Muscle Spasms"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "st-johns-wort",
    name: "St. John's Wort",
    scientificName: "Hypericum perforatum",
    description: "An herb traditionally used to treat mild to moderate depression. Can interact with medications.",
    uses: ["Mood Support", "Nerve Pain Relief", "Wound Healing"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Depression", "Nerve Pain", "Wounds"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "calendula",
    name: "Calendula",
    scientificName: "Calendula officinalis",
    description: "A flower known for its skin-healing and anti-inflammatory properties.",
    uses: ["Skin Healing", "Anti-inflammatory", "Wound Healing"],
    regions: ["Mediterranean"],
    conditions: ["Skin Irritation", "Wounds", "Burns", "Eczema"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "dandelion",
    name: "Dandelion",
    scientificName: "Taraxacum officinale",
    description: "A common 'weed' with diuretic and liver-supporting properties.",
    uses: ["Diuretic", "Liver Support", "Digestive Aid", "Nutrient Source"],
    regions: ["Worldwide"],
    conditions: ["Fluid Retention", "Liver Congestion", "Digestive Issues"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "hawthorn",
    name: "Hawthorn",
    scientificName: "Crataegus spp.",
    description: "A shrub with berries used to support cardiovascular health.",
    uses: ["Cardiovascular Health", "Blood Pressure Regulation", "Antioxidant"],
    regions: ["Europe", "North America"],
    conditions: ["High Blood Pressure", "Heart Failure", "Arrhythmia"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "senna",
    name: "Senna",
    scientificName: "Senna alexandrina",
    description: "A powerful laxative herb. Use with caution and only for short-term constipation.",
    uses: ["Laxative"],
    regions: ["Africa", "Asia"],
    conditions: ["Constipation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE]
  },
  {
    id: "slippery-elm",
    name: "Slippery Elm",
    scientificName: "Ulmus rubra",
    description: "A tree bark used to soothe irritated mucous membranes in the digestive tract.",
    uses: ["Digestive Aid", "Sore Throat Relief", "Skin Healing"],
    regions: ["North America"],
    conditions: ["Sore Throat", "Cough", "Irritable Bowel Syndrome (IBS)", "Burns"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.DIGESTIVE]
  },
  {
    id: "uva-ursi",
    name: "Uva Ursi",
    scientificName: "Arctostaphylos uva-ursi",
    description: "An herb traditionally used for urinary tract infections.",
    uses: ["Urinary Tract Infection (UTI) Relief", "Diuretic"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Urinary Tract Infections (UTIs)"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "goldenseal",
    name: "Goldenseal",
    scientificName: "Hydrastis canadensis",
    description: "An herb with antimicrobial and immune-boosting properties. Overharvested, use sustainably.",
    uses: ["Immune Support", "Antimicrobial", "Digestive Aid"],
    regions: ["North America"],
    conditions: ["Infections", "Digestive Issues", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "saw-palmetto",
    name: "Saw Palmetto",
    scientificName: "Serenoa repens",
    description: "A palm fruit used to treat benign prostatic hyperplasia (BPH).",
    uses: ["Prostate Health", "Hair Loss"],
    regions: ["North America"],
    conditions: ["Benign Prostatic Hyperplasia (BPH)", "Hair Loss"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "nettle",
    name: "Nettle",
    scientificName: "Urtica dioica",
    description: "A nutritious plant with anti-inflammatory and diuretic properties.",
    uses: ["Anti-inflammatory", "Diuretic", "Nutrient Source", "Allergy Relief"],
    regions: ["Worldwide"],
    conditions: ["Allergies", "Arthritis", "Prostate Enlargement (BPH)", "Eczema"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "yarrow",
    name: "Yarrow",
    scientificName: "Achillea millefolium",
    description: "An herb with wound-healing, anti-inflammatory, and astringent properties.",
    uses: ["Wound Healing", "Anti-inflammatory", "Astringent", "Fever Reduction"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Wounds", "Bleeding", "Inflammation", "Fever"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "marshmallow-root",
    name: "Marshmallow Root",
    scientificName: "Althaea officinalis",
    description: "A root with soothing and anti-inflammatory properties, especially for mucous membranes.",
    uses: ["Sore Throat Relief", "Cough Suppressant", "Digestive Aid", "Skin Healing"],
    regions: ["Europe", "Asia", "North Africa"],
    conditions: ["Sore Throat", "Cough", "Acid Reflux", "Irritable Bowel Syndrome (IBS)", "Wounds"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "boswellia",
    name: "Boswellia (Frankincense)",
    scientificName: "Boswellia serrata",
    description: "A resin with potent anti-inflammatory properties, traditionally used for arthritis.",
    uses: ["Anti-inflammatory", "Pain Relief", "Arthritis Relief", "Asthma Relief"],
    regions: ["India", "Middle East", "Africa"],
    conditions: ["Arthritis", "Osteoarthritis", "Rheumatoid Arthritis", "Asthma", "Inflammatory Bowel Disease (IBD)"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "catnip",
    name: "Catnip",
    scientificName: "Nepeta cataria",
    description: "A herb known for its calming effects on cats, and also used for relaxation in humans.",
    uses: ["Relaxation", "Sleep Aid", "Digestive Aid", "Insect Repellent"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Anxiety", "Insomnia", "Digestive Upset", "Insect Bites"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "lemon-balm",
    name: "Lemon Balm",
    scientificName: "Melissa officinalis",
    description: "A citrusy herb with calming and antiviral properties.",
    uses: ["Relaxation", "Antiviral", "Cognitive Enhancement", "Digestive Aid"],
    regions: ["Europe", "Mediterranean"],
    conditions: ["Anxiety", "Herpes Simplex Virus (HSV)", "Cognitive Decline", "Digestive Upset"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "skullcap",
    name: "Skullcap",
    scientificName: "Scutellaria lateriflora",
    description: "A nervine herb used to reduce anxiety, nervous tension, and insomnia.",
    uses: ["Anxiety Relief", "Nerve Tonic", "Sleep Aid", "Muscle Relaxant"],
    regions: ["North America"],
    conditions: ["Anxiety", "Nervous Tension", "Insomnia", "Muscle Spasms"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "kava",
    name: "Kava",
    scientificName: "Piper methysticum",
    description: "A root used in the South Pacific for its relaxing and anxiolytic effects. Use with caution due to potential liver toxicity.",
    uses: ["Anxiety Relief", "Muscle Relaxant", "Sleep Aid"],
    regions: ["South Pacific"],
    conditions: ["Anxiety", "Muscle Tension", "Insomnia"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "passionflower",
    name: "Passionflower",
    scientificName: "Passiflora incarnata",
    description: "A vine with calming and sleep-promoting properties.",
    uses: ["Anxiety Relief", "Sleep Aid", "Nerve Tonic"],
    regions: ["North America", "South America"],
    conditions: ["Anxiety", "Insomnia", "Nervousness"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "rhodiola",
    name: "Rhodiola",
    scientificName: "Rhodiola rosea",
    description: "An adaptogenic herb that helps the body adapt to stress and improve mental performance.",
    uses: ["Stress Relief", "Energy Boost", "Cognitive Enhancement", "Anti-inflammatory"],
    regions: ["Arctic Regions", "High Altitudes"],
    conditions: ["Stress", "Fatigue", "Cognitive Decline", "Depression"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cordyceps",
    name: "Cordyceps",
    scientificName: "Cordyceps sinensis (Ophiocordyceps sinensis)",
    description: "A fungus with energy-boosting and immune-enhancing properties.",
    uses: ["Energy Boost", "Immune Support", "Athletic Performance", "Anti-aging"],
    regions: ["Himalayas"],
    conditions: ["Fatigue", "Weak Immune System", "Respiratory Issues", "Low Libido"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "reishi",
    name: "Reishi",
    scientificName: "Ganoderma lucidum",
    description: "A mushroom with immune-modulating and stress-reducing properties.",
    uses: ["Immune Support", "Stress Relief", "Anti-inflammatory", "Anti-cancer"],
    regions: ["Asia"],
    conditions: ["Weak Immune System", "Stress", "Inflammation", "Cancer"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "shiitake",
    name: "Shiitake",
    scientificName: "Lentinula edodes",
    description: "A culinary and medicinal mushroom with immune-boosting and cholesterol-lowering properties.",
    uses: ["Immune Support", "Cholesterol Reduction", "Anti-cancer"],
    regions: ["Asia"],
    conditions: ["Weak Immune System", "High Cholesterol", "Cancer"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "maitake",
    name: "Maitake",
    scientificName: "Grifola frondosa",
    description: "A mushroom with immune-modulating and blood sugar-regulating properties.",
    uses: ["Immune Support", "Blood Sugar Regulation", "Anti-cancer"],
    regions: ["Asia", "North America"],
    conditions: ["Weak Immune System", "Diabetes", "Cancer"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "lions-mane",
    name: "Lion's Mane",
    scientificName: "Hericium erinaceus",
    description: "A mushroom with neuroprotective and cognitive-enhancing properties.",
    uses: ["Cognitive Enhancement", "Nerve Regeneration", "Anxiety Relief", "Immune Support"],
    regions: ["Asia", "North America", "Europe"],
    conditions: ["Cognitive Decline", "Neuropathy", "Anxiety", "Weak Immune System"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "artichoke",
    name: "Artichoke",
    scientificName: "Cynara scolymus",
    description: "A vegetable with liver-protective and digestive-enhancing properties.",
    uses: ["Liver Support", "Digestive Aid", "Cholesterol Reduction"],
    regions: ["Mediterranean"],
    conditions: ["Liver Congestion", "Digestive Issues", "High Cholesterol"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "burdock",
    name: "Burdock",
    scientificName: "Arctium lappa",
    description: "A root with blood-purifying and anti-inflammatory properties.",
    uses: ["Blood Purifier", "Anti-inflammatory", "Skin Healing", "Diuretic"],
    regions: ["Europe", "Asia"],
    conditions: ["Skin Conditions", "Eczema", "Psoriasis", "Joint Pain"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "red-clover",
    name: "Red Clover",
    scientificName: "Trifolium pratense",
    description: "A legume with phytoestrogenic properties, used for menopausal symptoms.",
    uses: ["Menopausal Symptom Relief", "Bone Health", "Anti-inflammatory"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Menopause", "Osteoporosis", "Skin Conditions"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "chaste-berry",
    name: "Chaste Berry (Vitex)",
    scientificName: "Vitex agnus-castus",
    description: "A berry used to regulate menstrual cycles and alleviate PMS symptoms.",
    uses: ["Menstrual Regulation", "PMS Relief", "Fertility Support"],
    regions: ["Mediterranean"],
    conditions: ["Irregular Periods", "Premenstrual Syndrome (PMS)", "Infertility"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cranberry",
    name: "Cranberry",
    scientificName: "Vaccinium macrocarpon",
    description: "A berry used to prevent urinary tract infections (UTIs).",
    uses: ["Urinary Tract Infection (UTI) Prevention", "Antioxidant"],
    regions: ["North America"],
    conditions: ["Urinary Tract Infections (UTIs)"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "goldthread",
    name: "Goldthread",
    scientificName: "Coptis chinensis",
    description: "A root with potent antimicrobial and anti-inflammatory properties. Contains berberine.",
    uses: ["Antimicrobial", "Anti-inflammatory", "Digestive Aid"],
    regions: ["Asia"],
    conditions: ["Infections", "Digestive Issues", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "boldo",
    name: "Boldo",
    scientificName: "Peumus boldus",
    description: "A tree with leaves used to support liver and gallbladder function.",
    uses: ["Liver Support", "Gallbladder Support", "Digestive Aid"],
    regions: ["South America"],
    conditions: ["Liver Congestion", "Gallstones", "Digestive Upset"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "gentian",
    name: "Gentian",
    scientificName: "Gentiana lutea",
    description: "A root with bitter properties used to stimulate digestion.",
    uses: ["Digestive Aid", "Appetite Stimulant"],
    regions: ["Europe"],
    conditions: ["Poor Digestion", "Loss of Appetite"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "hops",
    name: "Hops",
    scientificName: "Humulus lupulus",
    description: "A flower used for its calming and sleep-promoting properties, also used in brewing beer.",
    uses: ["Sleep Aid", "Anxiety Relief", "Muscle Relaxant"],
    regions: ["Europe", "North America", "Asia"],
    conditions: ["Insomnia", "Anxiety", "Muscle Spasms"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "wormwood",
    name: "Wormwood",
    scientificName: "Artemisia absinthium",
    description: "A bitter herb traditionally used as a digestive aid and to expel intestinal worms. Use with caution.",
    uses: ["Digestive Aid", "Antiparasitic"],
    regions: ["Europe", "Asia", "North Africa"],
    conditions: ["Digestive Upset", "Intestinal Parasites"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "damiana",
    name: "Damiana",
    scientificName: "Turnera diffusa",
    description: "A shrub with leaves traditionally used as an aphrodisiac and for mood enhancement.",
    uses: ["Aphrodisiac", "Mood Enhancement", "Anxiety Relief"],
    regions: ["Central America", "South America", "Mexico"],
    conditions: ["Low Libido", "Anxiety", "Depression"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "muira-puama",
    name: "Muira Puama",
    scientificName: "Ptychopetalum olacoides",
    description: "A tree bark traditionally used as an aphrodisiac and nerve tonic.",
    uses: ["Aphrodisiac", "Nerve Tonic", "Cognitive Enhancement"],
    regions: ["Amazon Rainforest"],
    conditions: ["Low Libido", "Nervous Exhaustion", "Cognitive Decline"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "tribulus",
    name: "Tribulus",
    scientificName: "Tribulus terrestris",
    description: "A plant used to enhance libido and athletic performance.",
    uses: ["Aphrodisiac", "Athletic Performance", "Hormone Support"],
    regions: ["Worldwide"],
    conditions: ["Low Libido", "Erectile Dysfunction", "Infertility"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "fenugreek",
    name: "Fenugreek",
    scientificName: "Trigonella foenum-graecum",
    description: "A seed used to increase milk supply in breastfeeding mothers and to lower blood sugar.",
    uses: ["Lactation Support", "Blood Sugar Regulation", "Cholesterol Reduction"],
    regions: ["Mediterranean", "Asia"],
    conditions: ["Low Milk Supply", "Diabetes", "High Cholesterol"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "anise",
    name: "Anise",
    scientificName: "Pimpinella anisum",
    description: "A seed with a licorice-like flavor, used to aid digestion and relieve coughs.",
    uses: ["Digestive Aid", "Cough Suppressant", "Expectorant"],
    regions: ["Mediterranean", "Middle East"],
    conditions: ["Indigestion", "Cough", "Bronchitis"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    scientificName: "Cinnamomum verum (Cinnamomum cassia)",
    description: "A spice with a warming flavor, used to regulate blood sugar and lower cholesterol.",
    uses: ["Blood Sugar Regulation", "Cholesterol Reduction", "Anti-inflammatory", "Antioxidant"],
    regions: ["Asia"],
    conditions: ["Diabetes", "High Cholesterol", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "clove",
    name: "Clove",
    scientificName: "Syzygium aromaticum",
    description: "A spice with a strong aroma, used as a pain reliever and antimicrobial.",
    uses: ["Pain Relief", "Antimicrobial", "Digestive Aid"],
    regions: ["Indonesia"],
    conditions: ["Toothache", "Infections", "Digestive Upset"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cumin",
    name: "Cumin",
    scientificName: "Cuminum cyminum",
    description: "A spice with digestive and antioxidant properties.",
    uses: ["Digestive Aid", "Antioxidant", "Immune Support"],
    regions: ["Middle East", "India"],
    conditions: ["Indigestion", "Inflammation", "Weak Immune System"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "fennel-seed",
    name: "Fennel",
    scientificName: "Foeniculum vulgare",
    description: "A plant with a licorice-like flavor, used to aid digestion and relieve gas.",
    uses: ["Digestive Aid", "Gas Relief", "Lactation Support"],
    regions: ["Mediterranean"],
    conditions: ["Indigestion", "Gas", "Bloating", "Low Milk Supply"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "mustard",
    name: "Mustard",
    scientificName: "Brassica juncea (Brassica nigra, Brassica hirta)",
    description: "A seed used as a condiment and to relieve muscle pain.",
    uses: ["Pain Relief", "Anti-inflammatory", "Congestion Relief"],
    regions: ["Worldwide"],
    conditions: ["Muscle Pain", "Arthritis", "Congestion"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "nutmeg",
    name: "Nutmeg",
    scientificName: "Myristica fragrans",
    description: "A spice with a warming aroma, used as a pain reliever and sleep aid. Use in moderation.",
    uses: ["Pain Relief", "Sleep Aid", "Digestive Aid"],
    regions: ["Indonesia"],
    conditions: ["Muscle Pain", "Insomnia", "Indigestion"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "saffron",
    name: "Saffron",
    scientificName: "Crocus sativus",
    description: "A spice with a vibrant color, used as a mood enhancer and antioxidant.",
    uses: ["Mood Enhancement", "Antioxidant", "Cognitive Enhancement"],
    regions: ["Middle East"],
    conditions: ["Depression", "Anxiety", "Cognitive Decline"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "sesame",
    name: "Sesame",
    scientificName: "Sesamum indicum",
    description: "A seed rich in nutrients, used to lower cholesterol and improve bone health.",
    uses: ["Cholesterol Reduction", "Bone Health", "Anti-inflammatory"],
    regions: ["Africa", "Asia"],
    conditions: ["High Cholesterol", "Osteoporosis", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "tamarind",
    name: "Tamarind",
    scientificName: "Tamarindus indica",
    description: "A fruit with a sweet and sour taste, used as a laxative and digestive aid.",
    uses: ["Laxative", "Digestive Aid", "Antioxidant"],
    regions: ["Africa", "Asia"],
    conditions: ["Constipation", "Indigestion", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "vanilla",
    name: "Vanilla",
    scientificName: "Vanilla planifolia",
    description: "A bean with a sweet aroma, used as a flavoring agent and mood enhancer.",
    uses: ["Flavoring Agent", "Mood Enhancement", "Antioxidant"],
    regions: ["Mexico", "Madagascar"],
    conditions: ["Depression", "Anxiety", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "wintergreen",
    name: "Wintergreen",
    scientificName: "Gaultheria procumbens",
    description: "A plant with leaves used as a pain reliever and anti-inflammatory.",
    uses: ["Pain Relief", "Anti-inflammatory", "Muscle Relaxant"],
    regions: ["North America"],
    conditions: ["Muscle Pain", "Arthritis", "Headaches"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "allspice",
    name: "Allspice",
    scientificName: "Pimenta dioica",
    description: "A berry with a complex flavor, used as a pain reliever and digestive aid.",
    uses: ["Pain Relief", "Digestive Aid", "Anti-inflammatory"],
    regions: ["Central America", "Caribbean"],
    conditions: ["Muscle Pain", "Indigestion", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "angelica",
    name: "Angelica",
    scientificName: "Angelica archangelica",
    description: "A plant with roots used as a digestive aid and expectorant.",
    uses: ["Digestive Aid", "Expectorant", "Anxiety Relief"],
    regions: ["Europe", "Asia"],
    conditions: ["Indigestion", "Cough", "Bronchitis", "Anxiety"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "asafoetida",
    name: "Asafoetida",
    scientificName: "Ferula asafoetida",
    description: "A resin with a pungent aroma, used as a digestive aid and expectorant.",
    uses: ["Digestive Aid", "Expectorant", "Antiflatulent"],
    regions: ["Middle East", "Asia"],
    conditions: ["Indigestion", "Cough", "Gas", "Bloating"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "ajwain",
    name: "Ajwain",
    scientificName: "Trachyspermum ammi",
    description: "A seed with a strong aroma, used as a digestive aid and expectorant.",
    uses: ["Digestive Aid", "Expectorant", "Antimicrobial"],
    regions: ["India", "Middle East"],
    conditions: ["Indigestion", "Cough", "Infections"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    scientificName: "Piper nigrum",
    description: "A spice with a pungent flavor, used to improve digestion and nutrient absorption.",
    uses: ["Digestive Aid", "Nutrient Absorption", "Anti-inflammatory"],
    regions: ["India"],
    conditions: ["Indigestion", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cayenne-pepper",
    name: "Cayenne Pepper",
    scientificName: "Capsicum annuum",
    description: "A spice with a fiery flavor, used as a pain reliever and circulatory stimulant.",
    uses: ["Pain Relief", "Circulatory Stimulant", "Anti-inflammatory"],
    regions: ["Americas"],
    conditions: ["Muscle Pain", "Arthritis", "Poor Circulation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "chervil",
    name: "Chervil",
    scientificName: "Anthriscus cerefolium",
    description: "A herb with a delicate flavor, used as a digestive aid and diuretic.",
    uses: ["Digestive Aid", "Diuretic", "Anti-inflammatory"],
    regions: ["Europe", "Asia"],
    conditions: ["Indigestion", "Fluid Retention", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "chicory",
    name: "Chicory",
    scientificName: "Cichorium intybus",
    description: "A plant with roots used as a coffee substitute and digestive aid.",
    uses: ["Digestive Aid", "Liver Support", "Prebiotic"],
    regions: ["Europe", "Asia"],
    conditions: ["Indigestion", "Liver Congestion", "Constipation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "galangal",
    name: "Galangal",
    scientificName: "Alpinia galanga",
    description: "A rhizome with a spicy flavor, used as a digestive aid and anti-inflammatory.",
    uses: ["Digestive Aid", "Anti-inflammatory", "Antimicrobial"],
    regions: ["Southeast Asia"],
    conditions: ["Indigestion", "Inflammation", "Infections"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "horseradish",
    name: "Horseradish",
    scientificName: "Armoracia rusticana",
    description: "A root with a pungent flavor, used as a decongestant and antimicrobial.",
    uses: ["Decongestant", "Antimicrobial", "Anti-inflammatory"],
    regions: ["Europe", "Asia"],
    conditions: ["Congestion", "Infections", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "lovage",
    name: "Lovage",
    scientificName: "Levisticum officinale",
    description: "A plant with leaves used as a digestive aid and diuretic.",
    uses: ["Digestive Aid", "Diuretic", "Anti-inflammatory"],
    regions: ["Europe", "Asia"],
    conditions: ["Indigestion", "Fluid Retention", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "marjoram",
    name: "Marjoram",
    scientificName: "Origanum majorana",
    description: "A herb with a sweet aroma, used as a digestive aid and muscle relaxant.",
    uses: ["Digestive Aid", "Muscle Relaxant", "Anxiety Relief"],
    regions: ["Mediterranean"],
    conditions: ["Indigestion", "Muscle Spasms", "Anxiety"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "rosemary",
    name: "Rosemary",
    scientificName: "Salvia rosmarinus",
    description: "A herb with a pungent aroma, used to improve memory and circulation.",
    uses: ["Memory Enhancement", "Circulatory Stimulant", "Antioxidant"],
    regions: ["Mediterranean"],
    conditions: ["Cognitive Decline", "Poor Circulation", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "sage",
    name: "Sage",
    scientificName: "Salvia officinalis",
    description: "A herb with a pungent aroma, used to improve memory and reduce sweating.",
    uses: ["Memory Enhancement", "Sweat Reduction", "Anti-inflammatory"],
    regions: ["Mediterranean"],
    conditions: ["Cognitive Decline", "Excessive Sweating", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "savory",
    name: "Savory",
    scientificName: "Satureja hortensis (Summer Savory), Satureja montana (Winter Savory)",
    description: "A herb with a pungent flavor, used as a digestive aid and expectorant.",
    uses: ["Digestive Aid", "Expectorant", "Antimicrobial"],
    regions: ["Mediterranean"],
    conditions: ["Indigestion", "Cough", "Infections"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "tarragon",
    name: "Tarragon",
    scientificName: "Artemisia dracunculus",
    description: "A herb with a licorice-like flavor, used as a digestive aid and appetite stimulant.",
    uses: ["Digestive Aid", "Appetite Stimulant", "Anti-inflammatory"],
    regions: ["Europe", "Asia"],
    conditions: ["Indigestion", "Loss of Appetite", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "thyme",
    name: "Thyme",
    scientificName: "Thymus vulgaris",
    description: "A herb with a pungent aroma, used as an expectorant and antimicrobial.",
    uses: ["Expectorant", "Antimicrobial", "Antispasmodic"],
    regions: ["Mediterranean"],
    conditions: ["Cough", "Infections", "Muscle Spasms"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "winter-savory",
    name: "Winter Savory",
    scientificName: "Satureja montana",
    description: "An herb used for digestive support, and as an antiseptic.",
    uses: ["Digestive Aid", "Antiseptic", "Anti-inflammatory"],
    regions: ["Mediterranean"],
    conditions: ["Indigestion", "Minor Cuts", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "bergamot",
    name: "Bergamot",
    scientificName: "Citrus bergamia",
    description: "A citrus fruit with a distinctive aroma, used to relieve stress and improve mood.",
    uses: ["Stress Relief", "Mood Enhancement", "Antiseptic"],
    regions: ["Italy"],
    conditions: ["Anxiety", "Depression", "Skin Infections"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "bloodroot",
    name: "Bloodroot",
    scientificName: "Sanguinaria canadensis",
    description: "A plant with a red sap, used topically to treat skin conditions. Use with caution due to toxicity.",
    uses: ["Skin Treatment", "Expectorant"],
    regions: ["North America"],
    conditions: ["Skin Tags", "Warts", "Coughs"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "blue-cohosh",
    name: "Blue Cohosh",
    scientificName: "Caulophyllum thalictroides",
    description: "A plant used traditionally to support women's reproductive health. Use with caution.",
    uses: ["Uterine Tonic", "Menstrual Support"],
    regions: ["North America"],
    conditions: ["Irregular Periods", "Labor Induction"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "borage",
    name: "Borage",
    scientificName: "Borago officinalis",
    description: "A plant with seeds rich in GLA, used to reduce inflammation and support skin health.",
    uses: ["Anti-inflammatory", "Skin Health", "Hormone Balance"],
    regions: ["Mediterranean"],
    conditions: ["Eczema", "Arthritis", "PMS"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "buchu",
    name: "Buchu",
    scientificName: "Agathosma betulina",
    description: "A plant with leaves used as a diuretic and antiseptic, particularly for urinary tract infections.",
    uses: ["Diuretic", "Antiseptic", "Urinary Tract Support"],
    regions: ["South Africa"],
    conditions: ["UTIs", "Fluid Retention"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cacao",
    name: "Cacao",
    scientificName: "Theobroma cacao",
    description: "The plant from which chocolate is derived, rich in antioxidants and mood-boosting compounds.",
    uses: ["Mood Enhancement", "Antioxidant", "Cardiovascular Health"],
    regions: ["Central America", "South America"],
    conditions: ["Depression", "Inflammation", "High Blood Pressure"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "calamus",
    name: "Calamus",
    scientificName: "Acorus calamus",
    description: "A plant with a long history of medicinal use, but some varieties contain beta-asarone and should be avoided.",
    uses: ["Digestive Aid", "Nerve Stimulant"],
    regions: ["Asia", "Europe", "North America"],
    conditions: ["Digestive Issues", "Nerve Problems"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "carrageen-moss",
    name: "Carrageen Moss",
    scientificName: "Chondrus crispus",
    description: "A type of red algae used for its thickening and demulcent properties.",
    uses: ["Demulcent", "Thickening Agent", "Nutrient Source"],
    regions: ["Atlantic Coasts"],
    conditions: ["Coughs", "Digestive Irritation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cascara-sagrada",
    name: "Cascara Sagrada",
    scientificName: "Frangula purshiana",
    description: "A bark used as a strong laxative. Use with caution and only for short-term constipation.",
    uses: ["Laxative"],
    regions: ["North America"],
    conditions: ["Constipation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cecropia",
    name: "Cecropia",
    scientificName: "Cecropia obtusifolia",
    description: "A plant used in traditional medicine for its anti-inflammatory and blood sugar-regulating properties.",
    uses: ["Anti-inflammatory", "Blood Sugar Regulation"],
    regions: ["Central America", "South America"],
    conditions: ["Diabetes", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cleavers",
    name: "Cleavers",
    scientificName: "Galium aparine",
    description: "A plant with diuretic and lymphatic cleansing properties.",
    uses: ["Diuretic", "Lymphatic Cleanser", "Skin Health"],
    regions: ["Worldwide"],
    conditions: ["Fluid Retention", "Skin Conditions"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "coltsfoot",
    name: "Coltsfoot",
    scientificName: "Tussilago farfara",
    description: "A plant used traditionally for coughs, but contains pyrrolizidine alkaloids and should be used with caution.",
    uses: ["Expectorant", "Cough Suppressant"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Coughs", "Bronchitis"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "comfrey",
    name: "Comfrey",
    scientificName: "Symphytum officinale",
    description: "A plant used topically for wound healing and bone repair, but contains pyrrolizidine alkaloids and should not be taken internally.",
    uses: ["Wound Healing", "Bone Repair"],
    regions: ["Europe", "Asia"],
    conditions: ["Wounds", "Sprains", "Fractures"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cramp-bark",
    name: "Cramp Bark",
    scientificName: "Viburnum opulus",
    description: "A bark used to relieve muscle cramps and spasms.",
    uses: ["Muscle Relaxant", "Antispasmodic"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Muscle Cramps", "Menstrual Cramps"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "cubeb",
    name: "Cubeb",
    scientificName: "Piper cubeba",
    description: "A berry with a spicy flavor, used as an expectorant and anti-inflammatory.",
    uses: ["Expectorant", "Anti-inflammatory", "Antiseptic"],
    regions: ["Indonesia"],
    conditions: ["Coughs", "Bronchitis", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "devils-claw",
    name: "Devil's Claw",
    scientificName: "Harpagophytum procumbens",
    description: "A root used to relieve pain and inflammation, particularly for arthritis.",
    uses: ["Pain Relief", "Anti-inflammatory", "Arthritis Relief"],
    regions: ["Africa"],
    conditions: ["Arthritis", "Muscle Pain", "Back Pain"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "dong-quai",
    name: "Dong Quai",
    scientificName: "Angelica sinensis",
    description: "A root used in traditional Chinese medicine to support women's health.",
    uses: ["Menstrual Support", "Hormone Balance", "Blood Tonic"],
    regions: ["Asia"],
    conditions: ["Irregular Periods", "PMS", "Anemia"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "elecampane",
    name: "Elecampane",
    scientificName: "Inula helenium",
    description: "A root used as an expectorant and antimicrobial.",
    uses: ["Expectorant", "Antimicrobial", "Digestive Aid"],
    regions: ["Europe", "Asia"],
    conditions: ["Coughs", "Bronchitis", "Infections"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "ephedra",
    name: "Ephedra",
    scientificName: "Ephedra sinica",
    description: "A plant used as a stimulant and decongestant, but with significant cardiovascular risks. Use with extreme caution or avoid.",
    uses: ["Decongestant", "Stimulant"],
    regions: ["Asia"],
    conditions: ["Congestion", "Asthma"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "eyebright",
    name: "Eyebright",
    scientificName: "Euphrasia officinalis",
    description: "A plant used traditionally for eye conditions.",
    uses: ["Eye Health", "Anti-inflammatory"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Conjunctivitis", "Eye Irritation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "false-unicorn-root",
    name: "False Unicorn Root",
    scientificName: "Chamaelirium luteum",
    description: "A root used traditionally to support women's reproductive health and balance hormones.",
    uses: ["Hormone Balance", "Uterine Tonic"],
    regions: ["North America"],
    conditions: ["Infertility", "Irregular Periods"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "galbanum",
    name: "Galbanum",
    scientificName: "Ferula galbaniflua",
    description: "A resin with a distinctive aroma, used as an anti-inflammatory and expectorant.",
    uses: ["Anti-inflammatory", "Expectorant", "Wound Healing"],
    regions: ["Middle East", "Asia"],
    conditions: ["Inflammation", "Coughs", "Wounds"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "geranium",
    name: "Geranium",
    scientificName: "Pelargonium graveolens",
    description: "An essential oil with anti-inflammatory and astringent properties, often used topically.",
    uses: ["Anti-inflammatory", "Astringent", "Skin Healing"],
    regions: ["South Africa"],
    conditions: ["Skin Irritation", "Wounds", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "ginkgo",
    name: "Ginkgo",
    scientificName: "Ginkgo biloba",
    description: "A tree with leaves used to improve memory and circulation.",
    uses: ["Memory Enhancement", "Circulatory Stimulant", "Antioxidant"],
    regions: ["Asia"],
    conditions: ["Cognitive Decline", "Poor Circulation", "Tinnitus"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "gotu-kola",
    name: "Gotu Kola",
    scientificName: "Centella asiatica",
    description: "A plant used to improve memory, wound healing, and circulation.",
    uses: ["Memory Enhancement", "Wound Healing", "Circulatory Stimulant", "Anxiety Relief"],
    regions: ["Asia"],
    conditions: ["Cognitive Decline", "Wounds", "Poor Circulation", "Anxiety"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "guarana",
    name: "Guarana",
    scientificName: "Paullinia cupana",
    description: "A seed with a high caffeine content, used as a stimulant and energy booster.",
    uses: ["Energy Boost", "Cognitive Enhancement", "Appetite Suppressant"],
    regions: ["Amazon Rainforest"],
    conditions: ["Fatigue", "Cognitive Decline", "Weight Management"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "gymnema",
    name: "Gymnema",
    scientificName: "Gymnema sylvestre",
    description: "A plant used to regulate blood sugar and reduce sugar cravings.",
    uses: ["Blood Sugar Regulation", "Sugar Craving Reduction", "Weight Management"],
    regions: ["India", "Africa"],
    conditions: ["Diabetes", "Obesity"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "hemp",
    name: "Hemp",
    scientificName: "Cannabis sativa",
    description: "A plant with many varieties, some used for medicinal purposes due to their cannabinoid content (CBD).",
    uses: ["Pain Relief", "Anxiety Relief", "Anti-inflammatory"],
    regions: ["Worldwide"],
    conditions: ["Chronic Pain", "Anxiety", "Inflammation", "Epilepsy"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    scientificName: "Hibiscus sabdariffa",
    description: "A flower used to lower blood pressure and cholesterol.",
    uses: ["Blood Pressure Regulation", "Cholesterol Reduction", "Antioxidant"],
    regions: ["Tropical Regions"],
    conditions: ["High Blood Pressure", "High Cholesterol", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "hyssop",
    name: "Hyssop",
    scientificName: "Hyssopus officinalis",
    description: "An herb used as an expectorant and antiviral.",
    uses: ["Expectorant", "Antiviral", "Digestive Aid"],
    regions: ["Europe", "Middle East"],
    conditions: ["Coughs", "Bronchitis", "Herpes Simplex Virus (HSV)"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "jatamansi",
    name: "Jatamansi",
    scientificName: "Nardostachys jatamansi",
    description: "A plant used in Ayurveda for its calming and neuroprotective properties.",
    uses: ["Anxiety Relief", "Sleep Aid", "Nerve Tonic"],
    regions: ["Himalayas"],
    conditions: ["Anxiety", "Insomnia", "Cognitive Decline"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "juniper",
    name: "Juniper",
    scientificName: "Juniperus communis",
    description: "A berry used as a diuretic and antiseptic.",
    uses: ["Diuretic", "Antiseptic", "Digestive Aid"],
    regions: ["Europe", "Asia", "North America"],
    conditions: ["Fluid Retention", "Urinary Tract Infections", "Indigestion"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "kawakawa",
    name: "Kawakawa",
    scientificName: "Macropiper excelsum",
    description: "A plant used in traditional Maori medicine for its anti-inflammatory and pain-relieving properties.",
    uses: ["Pain Relief", "Anti-inflammatory", "Muscle Relaxant"],
    regions: ["New Zealand"],
    conditions: ["Muscle Pain", "Arthritis", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "kelp",
    name: "Kelp",
    scientificName: "Laminaria spp.",
    description: "A type of seaweed rich in iodine, used to support thyroid health.",
    uses: ["Thyroid Support", "Nutrient Source"],
    regions: ["Coastal Regions"],
    conditions: ["Hypothyroidism", "Iodine Deficiency"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "ladys-mantle",
    name: "Lady's Mantle",
    scientificName: "Alchemilla vulgaris",
    description: "A plant used to support women's health and as a wound healer.",
    uses: ["Wound Healing", "Menstrual Support", "Astringent"],
    regions: ["Europe", "Asia"],
    conditions: ["Wounds", "Heavy Periods", "Diarrhea"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "larch",
    name: "Larch",
    scientificName: "Larix decidua",
    description: "A tree resin used to boost the immune system.",
    uses: ["Immune Support", "Antioxidant"],
    regions: ["Europe"],
    conditions: ["Weak Immune System", "Infections"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "lemon",
    name: "Lemon",
    scientificName: "Citrus limon",
    description: "A citrus fruit rich in vitamin C, used to boost the immune system and aid digestion.",
    uses: ["Immune Support", "Digestive Aid", "Antioxidant"],
    regions: ["Worldwide"],
    conditions: ["Colds", "Flu", "Indigestion"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "lilac",
    name: "Lilac",
    scientificName: "Syringa vulgaris",
    description: "A flower with a fragrant aroma, used traditionally for its astringent and anti-inflammatory properties.",
    uses: ["Astringent", "Anti-inflammatory"],
    regions: ["Europe", "Asia"],
    conditions: ["Skin Irritation", "Inflammation"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "linden",
    name: "Linden",
    scientificName: "Tilia cordata",
    description: "A flower used to calm the nerves and lower blood pressure.",
    uses: ["Anxiety Relief", "Blood Pressure Regulation", "Diuretic"],
    regions: ["Europe"],
    conditions: ["Anxiety", "High Blood Pressure", "Fluid Retention"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "lobelia",
    name: "Lobelia",
    scientificName: "Lobelia inflata",
    description: "A plant used as an expectorant and muscle relaxant, but should be used with caution and under professional guidance.",
    uses: ["Expectorant", "Muscle Relaxant"],
    regions: ["North America"],
    conditions: ["Asthma", "Coughs", "Muscle Spasms"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "maca",
    name: "Maca",
    scientificName: "Lepidium meyenii",
    description: "A root used to enhance libido, energy, and fertility.",
    uses: ["Aphrodisiac", "Energy Boost", "Fertility Support"],
    regions: ["Peru"],
    conditions: ["Low Libido", "Fatigue", "Infertility"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "manjistha",
    name: "Manjistha",
    scientificName: "Rubia cordifolia",
    description: "A plant used in Ayurveda for its blood-purifying and skin-healing properties.",
    uses: ["Blood Purifier", "Skin Healing", "Anti-inflammatory"],
    regions: ["Asia"],
    conditions: ["Skin Conditions", "Eczema", "Psoriasis"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "marigold",
    name: "Marigold",
    scientificName: "Calendula officinalis",
    description: "A flower known for its skin-healing and anti-inflammatory properties.",
    uses: ["Skin Healing", "Anti-inflammatory", "Wound Healing"],
    regions: ["Mediterranean"],
    conditions: ["Skin Irritation", "Wounds", "Burns", "Eczema"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  },
  {
    id: "masterwort",
    name: "Masterwort",
    scientificName: "Peucedanum ostruthium",
    description: "A plant used as a digestive aid and expectorant.",
    uses: ["Digestive Aid", "Expectorant", "Antimicrobial"],
    regions: ["Europe"],
    conditions: ["Indigestion", "Coughs", "Infections"],
    image: '/plants/placeholder.jpg', // Will be updated by Trefle API
    category: [PLANT_CATEGORIES.ANTIOXIDANT]
  }
];

// Initialize images for all plants using Trefle API
export async function initializePlantImages() {
  const updatedPlants = await Promise.all(
    samplePlants.map(async (plant) => {
      const trefleImage = await getPlantImageFromTrefle(plant.scientificName);
      return {
        ...plant,
        image: trefleImage || '/plants/placeholder.jpg'
      };
    })
  );
  
  // Update the samplePlants array with the new images
  samplePlants.splice(0, samplePlants.length, ...updatedPlants);
  return updatedPlants;
}

// Export a function to get a plant's current image
export function getPlantImage(plantId: string): string {
  const plant = samplePlants.find(p => p.id === plantId);
  return plant?.image || '/plants/placeholder.jpg';
}
const app = document.getElementById("app");
const STORE_KEY = "dt-library-v1";
const SEED = {"settings":{"siteName":"B.Tech Dairy Technology","tagline":"Notes, textbooks and PPTs in one clean place","author":"Swet Sanket","adminPassword":"admin123"},"subjects":[{"id":"sub-1-1-elementary-mathematics","year":1,"semester":1,"name":"Elementary Mathematics","order":1},{"id":"sub-1-1-engineering-physics","year":1,"semester":1,"name":"Engineering Physics","order":2},{"id":"sub-1-1-engineering-chemistry","year":1,"semester":1,"name":"Engineering Chemistry","order":3},{"id":"sub-1-1-communication-skills","year":1,"semester":1,"name":"Communication Skills","order":4},{"id":"sub-1-1-engineering-drawing","year":1,"semester":1,"name":"Engineering Drawing","order":5},{"id":"sub-1-1-workshop-practice","year":1,"semester":1,"name":"Workshop Practice","order":6},{"id":"sub-1-1-computer-programming","year":1,"semester":1,"name":"Computer Programming","order":7},{"id":"sub-1-2-mathematics-ii","year":1,"semester":2,"name":"Mathematics II","order":1},{"id":"sub-1-2-environmental-studies","year":1,"semester":2,"name":"Environmental Studies","order":2},{"id":"sub-1-2-biochemistry","year":1,"semester":2,"name":"Biochemistry","order":3},{"id":"sub-1-2-introductory-microbiology","year":1,"semester":2,"name":"Introductory Microbiology","order":4},{"id":"sub-1-2-fluid-mechanics","year":1,"semester":2,"name":"Fluid Mechanics","order":5},{"id":"sub-1-2-thermodynamics","year":1,"semester":2,"name":"Thermodynamics","order":6},{"id":"sub-1-2-electrical-engineering","year":1,"semester":2,"name":"Electrical Engineering","order":7},{"id":"sub-2-3-dairy-chemistry","year":2,"semester":3,"name":"Dairy Chemistry","order":1},{"id":"sub-2-3-dairy-microbiology","year":2,"semester":3,"name":"Dairy Microbiology","order":2},{"id":"sub-2-3-heat-and-mass-transfer","year":2,"semester":3,"name":"Heat and Mass Transfer","order":3},{"id":"sub-2-3-strength-of-materials","year":2,"semester":3,"name":"Strength of Materials","order":4},{"id":"sub-2-3-market-milk-technology","year":2,"semester":3,"name":"Market Milk Technology","order":5},{"id":"sub-2-3-milk-production-management","year":2,"semester":3,"name":"Milk Production Management","order":6},{"id":"sub-2-4-dairy-engineering","year":2,"semester":4,"name":"Dairy Engineering","order":1},{"id":"sub-2-4-refrigeration-and-air-conditioning","year":2,"semester":4,"name":"Refrigeration and Air Conditioning","order":2},{"id":"sub-2-4-fat-rich-dairy-products","year":2,"semester":4,"name":"Fat Rich Dairy Products","order":3},{"id":"sub-2-4-traditional-indian-dairy-products","year":2,"semester":4,"name":"Traditional Indian Dairy Products","order":4},{"id":"sub-2-4-statistics","year":2,"semester":4,"name":"Statistics","order":5},{"id":"sub-2-4-dairy-plant-design-and-layout","year":2,"semester":4,"name":"Dairy Plant Design and Layout","order":6},{"id":"sub-3-5-cheese-and-fermented-products","year":3,"semester":5,"name":"Cheese and Fermented Products","order":1},{"id":"sub-3-5-ice-cream-and-frozen-desserts","year":3,"semester":5,"name":"Ice Cream and Frozen Desserts","order":2},{"id":"sub-3-5-condensed-and-dried-milk","year":3,"semester":5,"name":"Condensed and Dried Milk","order":3},{"id":"sub-3-5-dairy-by-products-technology","year":3,"semester":5,"name":"Dairy By-products Technology","order":4},{"id":"sub-3-5-packaging-of-dairy-products","year":3,"semester":5,"name":"Packaging of Dairy Products","order":5},{"id":"sub-3-5-quality-assurance","year":3,"semester":5,"name":"Quality Assurance","order":6},{"id":"sub-3-6-food-engineering","year":3,"semester":6,"name":"Food Engineering","order":1},{"id":"sub-3-6-dairy-plant-management","year":3,"semester":6,"name":"Dairy Plant Management","order":2},{"id":"sub-3-6-instrumentation-and-process-control","year":3,"semester":6,"name":"Instrumentation and Process Control","order":3},{"id":"sub-3-6-waste-management-in-dairy-industry","year":3,"semester":6,"name":"Waste Management in Dairy Industry","order":4},{"id":"sub-3-6-food-safety-and-standards","year":3,"semester":6,"name":"Food Safety and Standards","order":5},{"id":"sub-3-6-elective-i","year":3,"semester":6,"name":"Elective I","order":6},{"id":"sub-4-7-dairy-business-management","year":4,"semester":7,"name":"Dairy Business Management","order":1},{"id":"sub-4-7-entrepreneurship-development","year":4,"semester":7,"name":"Entrepreneurship Development","order":2},{"id":"sub-4-7-project-work-i","year":4,"semester":7,"name":"Project Work I","order":3},{"id":"sub-4-7-elective-ii","year":4,"semester":7,"name":"Elective II","order":4},{"id":"sub-4-7-seminar","year":4,"semester":7,"name":"Seminar","order":5},{"id":"sub-4-8-in-plant-training","year":4,"semester":8,"name":"In-plant Training","order":1},{"id":"sub-4-8-project-work-ii","year":4,"semester":8,"name":"Project Work II","order":2},{"id":"sub-4-8-comprehensive-viva","year":4,"semester":8,"name":"Comprehensive Viva","order":3}],"chapters":[{"id":"ch-sub-1-1-elementary-mathematics-algebra-and-matrices","subjectId":"sub-1-1-elementary-mathematics","name":"Algebra and Matrices","order":1},{"id":"ch-sub-1-1-elementary-mathematics-differential-calculus","subjectId":"sub-1-1-elementary-mathematics","name":"Differential Calculus","order":2},{"id":"ch-sub-1-1-elementary-mathematics-integral-calculus","subjectId":"sub-1-1-elementary-mathematics","name":"Integral Calculus","order":3},{"id":"ch-sub-1-1-elementary-mathematics-differential-equations","subjectId":"sub-1-1-elementary-mathematics","name":"Differential Equations","order":4},{"id":"ch-sub-1-1-engineering-physics-mechanics-and-waves","subjectId":"sub-1-1-engineering-physics","name":"Mechanics and Waves","order":1},{"id":"ch-sub-1-1-engineering-physics-optics","subjectId":"sub-1-1-engineering-physics","name":"Optics","order":2},{"id":"ch-sub-1-1-engineering-physics-heat-and-thermodynamics","subjectId":"sub-1-1-engineering-physics","name":"Heat and Thermodynamics","order":3},{"id":"ch-sub-1-1-engineering-physics-modern-physics","subjectId":"sub-1-1-engineering-physics","name":"Modern Physics","order":4},{"id":"ch-sub-1-1-engineering-chemistry-atomic-structure","subjectId":"sub-1-1-engineering-chemistry","name":"Atomic Structure","order":1},{"id":"ch-sub-1-1-engineering-chemistry-chemical-bonding","subjectId":"sub-1-1-engineering-chemistry","name":"Chemical Bonding","order":2},{"id":"ch-sub-1-1-engineering-chemistry-water-chemistry","subjectId":"sub-1-1-engineering-chemistry","name":"Water Chemistry","order":3},{"id":"ch-sub-1-1-engineering-chemistry-polymers-and-fuels","subjectId":"sub-1-1-engineering-chemistry","name":"Polymers and Fuels","order":4},{"id":"ch-sub-1-1-communication-skills-grammar-and-vocabulary","subjectId":"sub-1-1-communication-skills","name":"Grammar and Vocabulary","order":1},{"id":"ch-sub-1-1-communication-skills-technical-writing","subjectId":"sub-1-1-communication-skills","name":"Technical Writing","order":2},{"id":"ch-sub-1-1-communication-skills-presentation-skills","subjectId":"sub-1-1-communication-skills","name":"Presentation Skills","order":3},{"id":"ch-sub-1-1-communication-skills-group-discussion","subjectId":"sub-1-1-communication-skills","name":"Group Discussion","order":4},{"id":"ch-sub-1-1-engineering-drawing-orthographic-projection","subjectId":"sub-1-1-engineering-drawing","name":"Orthographic Projection","order":1},{"id":"ch-sub-1-1-engineering-drawing-isometric-views","subjectId":"sub-1-1-engineering-drawing","name":"Isometric Views","order":2},{"id":"ch-sub-1-1-engineering-drawing-sectional-views","subjectId":"sub-1-1-engineering-drawing","name":"Sectional Views","order":3},{"id":"ch-sub-1-1-engineering-drawing-machine-drawing-basics","subjectId":"sub-1-1-engineering-drawing","name":"Machine Drawing Basics","order":4},{"id":"ch-sub-1-1-workshop-practice-fitting-and-welding","subjectId":"sub-1-1-workshop-practice","name":"Fitting and Welding","order":1},{"id":"ch-sub-1-1-workshop-practice-carpentry","subjectId":"sub-1-1-workshop-practice","name":"Carpentry","order":2},{"id":"ch-sub-1-1-workshop-practice-sheet-metal-work","subjectId":"sub-1-1-workshop-practice","name":"Sheet Metal Work","order":3},{"id":"ch-sub-1-1-workshop-practice-safety-in-workshop","subjectId":"sub-1-1-workshop-practice","name":"Safety in Workshop","order":4},{"id":"ch-sub-1-1-computer-programming-introduction-to-c","subjectId":"sub-1-1-computer-programming","name":"Introduction to C","order":1},{"id":"ch-sub-1-1-computer-programming-control-structures","subjectId":"sub-1-1-computer-programming","name":"Control Structures","order":2},{"id":"ch-sub-1-1-computer-programming-arrays-and-functions","subjectId":"sub-1-1-computer-programming","name":"Arrays and Functions","order":3},{"id":"ch-sub-1-1-computer-programming-file-handling","subjectId":"sub-1-1-computer-programming","name":"File Handling","order":4},{"id":"ch-sub-1-2-mathematics-ii-vector-calculus","subjectId":"sub-1-2-mathematics-ii","name":"Vector Calculus","order":1},{"id":"ch-sub-1-2-mathematics-ii-laplace-transforms","subjectId":"sub-1-2-mathematics-ii","name":"Laplace Transforms","order":2},{"id":"ch-sub-1-2-mathematics-ii-fourier-series","subjectId":"sub-1-2-mathematics-ii","name":"Fourier Series","order":3},{"id":"ch-sub-1-2-mathematics-ii-numerical-methods","subjectId":"sub-1-2-mathematics-ii","name":"Numerical Methods","order":4},{"id":"ch-sub-1-2-environmental-studies-ecosystems","subjectId":"sub-1-2-environmental-studies","name":"Ecosystems","order":1},{"id":"ch-sub-1-2-environmental-studies-natural-resources","subjectId":"sub-1-2-environmental-studies","name":"Natural Resources","order":2},{"id":"ch-sub-1-2-environmental-studies-pollution-control","subjectId":"sub-1-2-environmental-studies","name":"Pollution Control","order":3},{"id":"ch-sub-1-2-environmental-studies-environmental-laws","subjectId":"sub-1-2-environmental-studies","name":"Environmental Laws","order":4},{"id":"ch-sub-1-2-biochemistry-carbohydrates","subjectId":"sub-1-2-biochemistry","name":"Carbohydrates","order":1},{"id":"ch-sub-1-2-biochemistry-proteins-and-enzymes","subjectId":"sub-1-2-biochemistry","name":"Proteins and Enzymes","order":2},{"id":"ch-sub-1-2-biochemistry-lipids","subjectId":"sub-1-2-biochemistry","name":"Lipids","order":3},{"id":"ch-sub-1-2-biochemistry-nucleic-acids","subjectId":"sub-1-2-biochemistry","name":"Nucleic Acids","order":4},{"id":"ch-sub-1-2-introductory-microbiology-microbial-cell-structure","subjectId":"sub-1-2-introductory-microbiology","name":"Microbial Cell Structure","order":1},{"id":"ch-sub-1-2-introductory-microbiology-growth-and-nutrition","subjectId":"sub-1-2-introductory-microbiology","name":"Growth and Nutrition","order":2},{"id":"ch-sub-1-2-introductory-microbiology-sterilization","subjectId":"sub-1-2-introductory-microbiology","name":"Sterilization","order":3},{"id":"ch-sub-1-2-introductory-microbiology-microscopy","subjectId":"sub-1-2-introductory-microbiology","name":"Microscopy","order":4},{"id":"ch-sub-1-2-fluid-mechanics-fluid-properties","subjectId":"sub-1-2-fluid-mechanics","name":"Fluid Properties","order":1},{"id":"ch-sub-1-2-fluid-mechanics-fluid-statics","subjectId":"sub-1-2-fluid-mechanics","name":"Fluid Statics","order":2},{"id":"ch-sub-1-2-fluid-mechanics-bernoulli-equation","subjectId":"sub-1-2-fluid-mechanics","name":"Bernoulli Equation","order":3},{"id":"ch-sub-1-2-fluid-mechanics-flow-measurement","subjectId":"sub-1-2-fluid-mechanics","name":"Flow Measurement","order":4},{"id":"ch-sub-1-2-thermodynamics-first-law","subjectId":"sub-1-2-thermodynamics","name":"First Law","order":1},{"id":"ch-sub-1-2-thermodynamics-second-law","subjectId":"sub-1-2-thermodynamics","name":"Second Law","order":2},{"id":"ch-sub-1-2-thermodynamics-properties-of-steam","subjectId":"sub-1-2-thermodynamics","name":"Properties of Steam","order":3},{"id":"ch-sub-1-2-thermodynamics-refrigeration-cycles","subjectId":"sub-1-2-thermodynamics","name":"Refrigeration Cycles","order":4},{"id":"ch-sub-1-2-electrical-engineering-dc-circuits","subjectId":"sub-1-2-electrical-engineering","name":"DC Circuits","order":1},{"id":"ch-sub-1-2-electrical-engineering-ac-circuits","subjectId":"sub-1-2-electrical-engineering","name":"AC Circuits","order":2},{"id":"ch-sub-1-2-electrical-engineering-transformers","subjectId":"sub-1-2-electrical-engineering","name":"Transformers","order":3},{"id":"ch-sub-1-2-electrical-engineering-electric-motors","subjectId":"sub-1-2-electrical-engineering","name":"Electric Motors","order":4},{"id":"ch-sub-2-3-dairy-chemistry-composition-of-milk","subjectId":"sub-2-3-dairy-chemistry","name":"Composition of Milk","order":1},{"id":"ch-sub-2-3-dairy-chemistry-milk-proteins","subjectId":"sub-2-3-dairy-chemistry","name":"Milk Proteins","order":2},{"id":"ch-sub-2-3-dairy-chemistry-milk-lipids","subjectId":"sub-2-3-dairy-chemistry","name":"Milk Lipids","order":3},{"id":"ch-sub-2-3-dairy-chemistry-milk-carbohydrates","subjectId":"sub-2-3-dairy-chemistry","name":"Milk Carbohydrates","order":4},{"id":"ch-sub-2-3-dairy-chemistry-minerals-and-vitamins-in-milk","subjectId":"sub-2-3-dairy-chemistry","name":"Minerals and Vitamins in Milk","order":5},{"id":"ch-sub-2-3-dairy-microbiology-milk-as-a-medium","subjectId":"sub-2-3-dairy-microbiology","name":"Milk as a Medium","order":1},{"id":"ch-sub-2-3-dairy-microbiology-spoilage-organisms","subjectId":"sub-2-3-dairy-microbiology","name":"Spoilage Organisms","order":2},{"id":"ch-sub-2-3-dairy-microbiology-pathogens-in-milk","subjectId":"sub-2-3-dairy-microbiology","name":"Pathogens in Milk","order":3},{"id":"ch-sub-2-3-dairy-microbiology-starter-cultures","subjectId":"sub-2-3-dairy-microbiology","name":"Starter Cultures","order":4},{"id":"ch-sub-2-3-dairy-microbiology-hygiene-and-sanitation","subjectId":"sub-2-3-dairy-microbiology","name":"Hygiene and Sanitation","order":5},{"id":"ch-sub-2-3-heat-and-mass-transfer-conduction","subjectId":"sub-2-3-heat-and-mass-transfer","name":"Conduction","order":1},{"id":"ch-sub-2-3-heat-and-mass-transfer-convection","subjectId":"sub-2-3-heat-and-mass-transfer","name":"Convection","order":2},{"id":"ch-sub-2-3-heat-and-mass-transfer-radiation","subjectId":"sub-2-3-heat-and-mass-transfer","name":"Radiation","order":3},{"id":"ch-sub-2-3-heat-and-mass-transfer-heat-exchangers","subjectId":"sub-2-3-heat-and-mass-transfer","name":"Heat Exchangers","order":4},{"id":"ch-sub-2-3-heat-and-mass-transfer-mass-transfer-basics","subjectId":"sub-2-3-heat-and-mass-transfer","name":"Mass Transfer Basics","order":5},{"id":"ch-sub-2-3-strength-of-materials-stress-and-strain","subjectId":"sub-2-3-strength-of-materials","name":"Stress and Strain","order":1},{"id":"ch-sub-2-3-strength-of-materials-shear-force-and-bending","subjectId":"sub-2-3-strength-of-materials","name":"Shear Force and Bending","order":2},{"id":"ch-sub-2-3-strength-of-materials-torsion","subjectId":"sub-2-3-strength-of-materials","name":"Torsion","order":3},{"id":"ch-sub-2-3-strength-of-materials-columns-and-struts","subjectId":"sub-2-3-strength-of-materials","name":"Columns and Struts","order":4},{"id":"ch-sub-2-3-market-milk-technology-reception-of-milk","subjectId":"sub-2-3-market-milk-technology","name":"Reception of Milk","order":1},{"id":"ch-sub-2-3-market-milk-technology-clarification-and-separation","subjectId":"sub-2-3-market-milk-technology","name":"Clarification and Separation","order":2},{"id":"ch-sub-2-3-market-milk-technology-pasteurization","subjectId":"sub-2-3-market-milk-technology","name":"Pasteurization","order":3},{"id":"ch-sub-2-3-market-milk-technology-homogenization","subjectId":"sub-2-3-market-milk-technology","name":"Homogenization","order":4},{"id":"ch-sub-2-3-market-milk-technology-packaging-of-liquid-milk","subjectId":"sub-2-3-market-milk-technology","name":"Packaging of Liquid Milk","order":5},{"id":"ch-sub-2-3-milk-production-management-dairy-breeds","subjectId":"sub-2-3-milk-production-management","name":"Dairy Breeds","order":1},{"id":"ch-sub-2-3-milk-production-management-feeding-of-dairy-animals","subjectId":"sub-2-3-milk-production-management","name":"Feeding of Dairy Animals","order":2},{"id":"ch-sub-2-3-milk-production-management-milking-practices","subjectId":"sub-2-3-milk-production-management","name":"Milking Practices","order":3},{"id":"ch-sub-2-3-milk-production-management-clean-milk-production","subjectId":"sub-2-3-milk-production-management","name":"Clean Milk Production","order":4},{"id":"ch-sub-2-4-dairy-engineering-dairy-plant-utilities","subjectId":"sub-2-4-dairy-engineering","name":"Dairy Plant Utilities","order":1},{"id":"ch-sub-2-4-dairy-engineering-pumps-and-piping","subjectId":"sub-2-4-dairy-engineering","name":"Pumps and Piping","order":2},{"id":"ch-sub-2-4-dairy-engineering-pasteurizers","subjectId":"sub-2-4-dairy-engineering","name":"Pasteurizers","order":3},{"id":"ch-sub-2-4-dairy-engineering-evaporators","subjectId":"sub-2-4-dairy-engineering","name":"Evaporators","order":4},{"id":"ch-sub-2-4-dairy-engineering-dryers","subjectId":"sub-2-4-dairy-engineering","name":"Dryers","order":5},{"id":"ch-sub-2-4-refrigeration-and-air-conditioning-vapour-compression-cycle","subjectId":"sub-2-4-refrigeration-and-air-conditioning","name":"Vapour Compression Cycle","order":1},{"id":"ch-sub-2-4-refrigeration-and-air-conditioning-refrigerants","subjectId":"sub-2-4-refrigeration-and-air-conditioning","name":"Refrigerants","order":2},{"id":"ch-sub-2-4-refrigeration-and-air-conditioning-cold-storage","subjectId":"sub-2-4-refrigeration-and-air-conditioning","name":"Cold Storage","order":3},{"id":"ch-sub-2-4-refrigeration-and-air-conditioning-ice-bank-systems","subjectId":"sub-2-4-refrigeration-and-air-conditioning","name":"Ice Bank Systems","order":4},{"id":"ch-sub-2-4-fat-rich-dairy-products-cream-separation","subjectId":"sub-2-4-fat-rich-dairy-products","name":"Cream Separation","order":1},{"id":"ch-sub-2-4-fat-rich-dairy-products-butter-making","subjectId":"sub-2-4-fat-rich-dairy-products","name":"Butter Making","order":2},{"id":"ch-sub-2-4-fat-rich-dairy-products-ghee-technology","subjectId":"sub-2-4-fat-rich-dairy-products","name":"Ghee Technology","order":3},{"id":"ch-sub-2-4-fat-rich-dairy-products-malai-and-cream-products","subjectId":"sub-2-4-fat-rich-dairy-products","name":"Malai and Cream Products","order":4},{"id":"ch-sub-2-4-traditional-indian-dairy-products-khoa-and-khoa-based-sweets","subjectId":"sub-2-4-traditional-indian-dairy-products","name":"Khoa and Khoa Based Sweets","order":1},{"id":"ch-sub-2-4-traditional-indian-dairy-products-chhana-and-paneer","subjectId":"sub-2-4-traditional-indian-dairy-products","name":"Chhana and Paneer","order":2},{"id":"ch-sub-2-4-traditional-indian-dairy-products-dahi-and-shrikhand","subjectId":"sub-2-4-traditional-indian-dairy-products","name":"Dahi and Shrikhand","order":3},{"id":"ch-sub-2-4-traditional-indian-dairy-products-rabri-and-kheer","subjectId":"sub-2-4-traditional-indian-dairy-products","name":"Rabri and Kheer","order":4},{"id":"ch-sub-2-4-statistics-measures-of-central-tendency","subjectId":"sub-2-4-statistics","name":"Measures of Central Tendency","order":1},{"id":"ch-sub-2-4-statistics-probability","subjectId":"sub-2-4-statistics","name":"Probability","order":2},{"id":"ch-sub-2-4-statistics-sampling","subjectId":"sub-2-4-statistics","name":"Sampling","order":3},{"id":"ch-sub-2-4-statistics-anova-and-regression","subjectId":"sub-2-4-statistics","name":"ANOVA and Regression","order":4},{"id":"ch-sub-2-4-dairy-plant-design-and-layout-site-selection","subjectId":"sub-2-4-dairy-plant-design-and-layout","name":"Site Selection","order":1},{"id":"ch-sub-2-4-dairy-plant-design-and-layout-plant-layout-principles","subjectId":"sub-2-4-dairy-plant-design-and-layout","name":"Plant Layout Principles","order":2},{"id":"ch-sub-2-4-dairy-plant-design-and-layout-material-flow","subjectId":"sub-2-4-dairy-plant-design-and-layout","name":"Material Flow","order":3},{"id":"ch-sub-2-4-dairy-plant-design-and-layout-cip-design","subjectId":"sub-2-4-dairy-plant-design-and-layout","name":"CIP Design","order":4},{"id":"ch-sub-3-5-cheese-and-fermented-products-cheese-classification","subjectId":"sub-3-5-cheese-and-fermented-products","name":"Cheese Classification","order":1},{"id":"ch-sub-3-5-cheese-and-fermented-products-cheddar-cheese","subjectId":"sub-3-5-cheese-and-fermented-products","name":"Cheddar Cheese","order":2},{"id":"ch-sub-3-5-cheese-and-fermented-products-mozzarella","subjectId":"sub-3-5-cheese-and-fermented-products","name":"Mozzarella","order":3},{"id":"ch-sub-3-5-cheese-and-fermented-products-processed-cheese","subjectId":"sub-3-5-cheese-and-fermented-products","name":"Processed Cheese","order":4},{"id":"ch-sub-3-5-cheese-and-fermented-products-yoghurt-and-lassi","subjectId":"sub-3-5-cheese-and-fermented-products","name":"Yoghurt and Lassi","order":5},{"id":"ch-sub-3-5-ice-cream-and-frozen-desserts-ice-cream-mix","subjectId":"sub-3-5-ice-cream-and-frozen-desserts","name":"Ice Cream Mix","order":1},{"id":"ch-sub-3-5-ice-cream-and-frozen-desserts-freezing-and-hardening","subjectId":"sub-3-5-ice-cream-and-frozen-desserts","name":"Freezing and Hardening","order":2},{"id":"ch-sub-3-5-ice-cream-and-frozen-desserts-stabilizers-and-emulsifiers","subjectId":"sub-3-5-ice-cream-and-frozen-desserts","name":"Stabilizers and Emulsifiers","order":3},{"id":"ch-sub-3-5-ice-cream-and-frozen-desserts-defects-in-ice-cream","subjectId":"sub-3-5-ice-cream-and-frozen-desserts","name":"Defects in Ice Cream","order":4},{"id":"ch-sub-3-5-condensed-and-dried-milk-evaporated-milk","subjectId":"sub-3-5-condensed-and-dried-milk","name":"Evaporated Milk","order":1},{"id":"ch-sub-3-5-condensed-and-dried-milk-sweetened-condensed-milk","subjectId":"sub-3-5-condensed-and-dried-milk","name":"Sweetened Condensed Milk","order":2},{"id":"ch-sub-3-5-condensed-and-dried-milk-spray-drying","subjectId":"sub-3-5-condensed-and-dried-milk","name":"Spray Drying","order":3},{"id":"ch-sub-3-5-condensed-and-dried-milk-milk-powder-quality","subjectId":"sub-3-5-condensed-and-dried-milk","name":"Milk Powder Quality","order":4},{"id":"ch-sub-3-5-dairy-by-products-technology-whey-utilization","subjectId":"sub-3-5-dairy-by-products-technology","name":"Whey Utilization","order":1},{"id":"ch-sub-3-5-dairy-by-products-technology-casein-and-caseinates","subjectId":"sub-3-5-dairy-by-products-technology","name":"Casein and Caseinates","order":2},{"id":"ch-sub-3-5-dairy-by-products-technology-lactose","subjectId":"sub-3-5-dairy-by-products-technology","name":"Lactose","order":3},{"id":"ch-sub-3-5-dairy-by-products-technology-butter-milk-products","subjectId":"sub-3-5-dairy-by-products-technology","name":"Butter Milk Products","order":4},{"id":"ch-sub-3-5-packaging-of-dairy-products-packaging-materials","subjectId":"sub-3-5-packaging-of-dairy-products","name":"Packaging Materials","order":1},{"id":"ch-sub-3-5-packaging-of-dairy-products-aseptic-packaging","subjectId":"sub-3-5-packaging-of-dairy-products","name":"Aseptic Packaging","order":2},{"id":"ch-sub-3-5-packaging-of-dairy-products-modified-atmosphere","subjectId":"sub-3-5-packaging-of-dairy-products","name":"Modified Atmosphere","order":3},{"id":"ch-sub-3-5-packaging-of-dairy-products-labeling-and-standards","subjectId":"sub-3-5-packaging-of-dairy-products","name":"Labeling and Standards","order":4},{"id":"ch-sub-3-5-quality-assurance-haccp","subjectId":"sub-3-5-quality-assurance","name":"HACCP","order":1},{"id":"ch-sub-3-5-quality-assurance-iso-and-fssc","subjectId":"sub-3-5-quality-assurance","name":"ISO and FSSC","order":2},{"id":"ch-sub-3-5-quality-assurance-sensory-evaluation","subjectId":"sub-3-5-quality-assurance","name":"Sensory Evaluation","order":3},{"id":"ch-sub-3-5-quality-assurance-chemical-quality-tests","subjectId":"sub-3-5-quality-assurance","name":"Chemical Quality Tests","order":4},{"id":"ch-sub-3-5-quality-assurance-microbiological-tests","subjectId":"sub-3-5-quality-assurance","name":"Microbiological Tests","order":5},{"id":"ch-sub-3-6-food-engineering-unit-operations","subjectId":"sub-3-6-food-engineering","name":"Unit Operations","order":1},{"id":"ch-sub-3-6-food-engineering-size-reduction","subjectId":"sub-3-6-food-engineering","name":"Size Reduction","order":2},{"id":"ch-sub-3-6-food-engineering-mixing","subjectId":"sub-3-6-food-engineering","name":"Mixing","order":3},{"id":"ch-sub-3-6-food-engineering-thermal-processing","subjectId":"sub-3-6-food-engineering","name":"Thermal Processing","order":4},{"id":"ch-sub-3-6-dairy-plant-management-production-planning","subjectId":"sub-3-6-dairy-plant-management","name":"Production Planning","order":1},{"id":"ch-sub-3-6-dairy-plant-management-inventory-control","subjectId":"sub-3-6-dairy-plant-management","name":"Inventory Control","order":2},{"id":"ch-sub-3-6-dairy-plant-management-manpower-management","subjectId":"sub-3-6-dairy-plant-management","name":"Manpower Management","order":3},{"id":"ch-sub-3-6-dairy-plant-management-costing","subjectId":"sub-3-6-dairy-plant-management","name":"Costing","order":4},{"id":"ch-sub-3-6-instrumentation-and-process-control-temperature-sensors","subjectId":"sub-3-6-instrumentation-and-process-control","name":"Temperature Sensors","order":1},{"id":"ch-sub-3-6-instrumentation-and-process-control-flow-and-level-control","subjectId":"sub-3-6-instrumentation-and-process-control","name":"Flow and Level Control","order":2},{"id":"ch-sub-3-6-instrumentation-and-process-control-plc-basics","subjectId":"sub-3-6-instrumentation-and-process-control","name":"PLC Basics","order":3},{"id":"ch-sub-3-6-instrumentation-and-process-control-automation-in-dairy-plants","subjectId":"sub-3-6-instrumentation-and-process-control","name":"Automation in Dairy Plants","order":4},{"id":"ch-sub-3-6-waste-management-in-dairy-industry-effluent-characteristics","subjectId":"sub-3-6-waste-management-in-dairy-industry","name":"Effluent Characteristics","order":1},{"id":"ch-sub-3-6-waste-management-in-dairy-industry-etp-design","subjectId":"sub-3-6-waste-management-in-dairy-industry","name":"ETP Design","order":2},{"id":"ch-sub-3-6-waste-management-in-dairy-industry-solid-waste","subjectId":"sub-3-6-waste-management-in-dairy-industry","name":"Solid Waste","order":3},{"id":"ch-sub-3-6-waste-management-in-dairy-industry-water-conservation","subjectId":"sub-3-6-waste-management-in-dairy-industry","name":"Water Conservation","order":4},{"id":"ch-sub-3-6-food-safety-and-standards-fssai-regulations","subjectId":"sub-3-6-food-safety-and-standards","name":"FSSAI Regulations","order":1},{"id":"ch-sub-3-6-food-safety-and-standards-codex-standards","subjectId":"sub-3-6-food-safety-and-standards","name":"Codex Standards","order":2},{"id":"ch-sub-3-6-food-safety-and-standards-adulteration-detection","subjectId":"sub-3-6-food-safety-and-standards","name":"Adulteration Detection","order":3},{"id":"ch-sub-3-6-food-safety-and-standards-legal-metrology","subjectId":"sub-3-6-food-safety-and-standards","name":"Legal Metrology","order":4},{"id":"ch-sub-3-6-elective-i-functional-dairy-foods","subjectId":"sub-3-6-elective-i","name":"Functional Dairy Foods","order":1},{"id":"ch-sub-3-6-elective-i-membrane-processing","subjectId":"sub-3-6-elective-i","name":"Membrane Processing","order":2},{"id":"ch-sub-3-6-elective-i-enzyme-technology","subjectId":"sub-3-6-elective-i","name":"Enzyme Technology","order":3},{"id":"ch-sub-4-7-dairy-business-management-marketing-of-dairy-products","subjectId":"sub-4-7-dairy-business-management","name":"Marketing of Dairy Products","order":1},{"id":"ch-sub-4-7-dairy-business-management-supply-chain","subjectId":"sub-4-7-dairy-business-management","name":"Supply Chain","order":2},{"id":"ch-sub-4-7-dairy-business-management-co-operative-dairy-model","subjectId":"sub-4-7-dairy-business-management","name":"Co-operative Dairy Model","order":3},{"id":"ch-sub-4-7-dairy-business-management-export-potential","subjectId":"sub-4-7-dairy-business-management","name":"Export Potential","order":4},{"id":"ch-sub-4-7-entrepreneurship-development-project-formulation","subjectId":"sub-4-7-entrepreneurship-development","name":"Project Formulation","order":1},{"id":"ch-sub-4-7-entrepreneurship-development-finance-and-banking","subjectId":"sub-4-7-entrepreneurship-development","name":"Finance and Banking","order":2},{"id":"ch-sub-4-7-entrepreneurship-development-small-scale-dairy-units","subjectId":"sub-4-7-entrepreneurship-development","name":"Small Scale Dairy Units","order":3},{"id":"ch-sub-4-7-entrepreneurship-development-business-plan","subjectId":"sub-4-7-entrepreneurship-development","name":"Business Plan","order":4},{"id":"ch-sub-4-7-project-work-i-literature-review","subjectId":"sub-4-7-project-work-i","name":"Literature Review","order":1},{"id":"ch-sub-4-7-project-work-i-methodology","subjectId":"sub-4-7-project-work-i","name":"Methodology","order":2},{"id":"ch-sub-4-7-project-work-i-experimental-design","subjectId":"sub-4-7-project-work-i","name":"Experimental Design","order":3},{"id":"ch-sub-4-7-project-work-i-progress-report","subjectId":"sub-4-7-project-work-i","name":"Progress Report","order":4},{"id":"ch-sub-4-7-elective-ii-novel-dairy-products","subjectId":"sub-4-7-elective-ii","name":"Novel Dairy Products","order":1},{"id":"ch-sub-4-7-elective-ii-nutraceuticals","subjectId":"sub-4-7-elective-ii","name":"Nutraceuticals","order":2},{"id":"ch-sub-4-7-elective-ii-dairy-biotechnology","subjectId":"sub-4-7-elective-ii","name":"Dairy Biotechnology","order":3},{"id":"ch-sub-4-7-seminar-topic-selection","subjectId":"sub-4-7-seminar","name":"Topic Selection","order":1},{"id":"ch-sub-4-7-seminar-literature-survey","subjectId":"sub-4-7-seminar","name":"Literature Survey","order":2},{"id":"ch-sub-4-7-seminar-presentation-skills","subjectId":"sub-4-7-seminar","name":"Presentation Skills","order":3},{"id":"ch-sub-4-8-in-plant-training-plant-orientation","subjectId":"sub-4-8-in-plant-training","name":"Plant Orientation","order":1},{"id":"ch-sub-4-8-in-plant-training-processing-lines","subjectId":"sub-4-8-in-plant-training","name":"Processing Lines","order":2},{"id":"ch-sub-4-8-in-plant-training-quality-lab","subjectId":"sub-4-8-in-plant-training","name":"Quality Lab","order":3},{"id":"ch-sub-4-8-in-plant-training-training-report","subjectId":"sub-4-8-in-plant-training","name":"Training Report","order":4},{"id":"ch-sub-4-8-project-work-ii-data-collection","subjectId":"sub-4-8-project-work-ii","name":"Data Collection","order":1},{"id":"ch-sub-4-8-project-work-ii-analysis","subjectId":"sub-4-8-project-work-ii","name":"Analysis","order":2},{"id":"ch-sub-4-8-project-work-ii-thesis-writing","subjectId":"sub-4-8-project-work-ii","name":"Thesis Writing","order":3},{"id":"ch-sub-4-8-project-work-ii-viva-preparation","subjectId":"sub-4-8-project-work-ii","name":"Viva Preparation","order":4},{"id":"ch-sub-4-8-comprehensive-viva-core-subjects-revision","subjectId":"sub-4-8-comprehensive-viva","name":"Core Subjects Revision","order":1},{"id":"ch-sub-4-8-comprehensive-viva-plant-operations","subjectId":"sub-4-8-comprehensive-viva","name":"Plant Operations","order":2},{"id":"ch-sub-4-8-comprehensive-viva-recent-advances","subjectId":"sub-4-8-comprehensive-viva","name":"Recent Advances","order":3}],"files":[]};

const KIND_META = {
  notes: { title: "Notes", blurb: "Semester-wise chapter notes in PDF.", icon: "N", cls: "icon-notes" },
  textbook: { title: "Textbook", blurb: "Reference books and prescribed textbooks.", icon: "T", cls: "icon-pill" },
  ppt: { title: "PPT", blurb: "Lecture slides for every chapter.", icon: "P", cls: "icon-ppt" }
};

const YEAR_LABEL = { 1: "1st Year", 2: "2nd Year", 3: "3rd Year", 4: "4th Year" };
const SEM_IN_YEAR = { 1: [1, 2], 2: [3, 4], 3: [5, 6], 4: [7, 8] };
const SEM_LABEL = {
  1: "1st Semester", 2: "2nd Semester", 3: "3rd Semester", 4: "4th Semester",
  5: "5th Semester", 6: "6th Semester", 7: "7th Semester", 8: "8th Semester"
};

function loadDb() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.subjects && parsed.chapters) return parsed;
    }
  } catch (e) {}
  const fresh = JSON.parse(JSON.stringify(SEED));
  saveDb(fresh);
  return fresh;
}

function saveDb(db) {
  localStorage.setItem(STORE_KEY, JSON.stringify(db));
}

function catalogFrom(db) {
  const subjects = db.subjects
    .slice()
    .sort((a, b) => a.year - b.year || a.semester - b.semester || a.order - b.order)
    .map((s) => ({
      ...s,
      chapters: db.chapters
        .filter((c) => c.subjectId === s.id)
        .sort((a, b) => a.order - b.order)
        .map((c) => ({
          ...c,
          files: (db.files || []).filter((f) => f.chapterId === c.id)
        }))
    }));
  return {
    settings: {
      siteName: db.settings.siteName,
      tagline: db.settings.tagline,
      author: db.settings.author
    },
    subjects,
    files: db.files || []
  };
}

let db = loadDb();
let catalog = catalogFrom(db);
let adminOk = sessionStorage.getItem("dt-admin") === "1";

function parseHash() {
  const raw = (location.hash.replace(/^#/, "") || "/").replace(/\/+$/, "") || "/";
  const parts = raw.split("/").filter(Boolean);
  return { parts };
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function subjectsFor(year, semester) {
  return catalog.subjects.filter((s) => s.year === year && s.semester === semester);
}

function crumb(items) {
  return `<nav class="crumb">${items
    .map((item, i) =>
      i === items.length - 1
        ? `<span>${escapeHtml(item.label)}</span>`
        : `<a href="${item.href}">${escapeHtml(item.label)}</a><span>/</span>`
    )
    .join("")}</nav>`;
}

function emptyState(text) {
  return `<div class="empty">${escapeHtml(text)}</div>`;
}

function parseDriveId(url) {
  const s = String(url || "").trim();
  if (!s) return "";
  const d = s.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (d) return d[1];
  const q = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (q) return q[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(s)) return s;
  return "";
}

function driveUrls(driveUrl) {
  const id = parseDriveId(driveUrl);
  if (!id) return null;
  return {
    driveId: id,
    driveUrl: "https://drive.google.com/file/d/" + id + "/view",
    previewUrl: "https://drive.google.com/file/d/" + id + "/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=" + id
  };
}

function uid(prefix) {
  return prefix + "-" + Math.random().toString(36).slice(2, 10);
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function refresh() {
  catalog = catalogFrom(db);
}

function homeView() {
  return `
    <section class="hero">
      <div class="kicker">${escapeHtml(catalog.settings.siteName)}</div>
      <h1>All your course material, one clean library.</h1>
      <p>${escapeHtml(catalog.settings.tagline)}. Open notes, textbooks or PPTs, then pick the year and semester.</p>
    </section>
    <section class="choice-grid">
      ${Object.entries(KIND_META)
        .map(
          ([key, meta]) => `
        <a class="card" href="#/${key}">
          <div class="icon-pill ${meta.cls}">${meta.icon}</div>
          <h2>${meta.title}</h2>
          <p class="muted">${meta.blurb}</p>
        </a>`
        )
        .join("")}
    </section>
    <section class="panel help-card">
      <h2 class="section-title">How files work</h2>
      <p class="muted">PDFs stay on Google Drive. This site only stores chapter names and public links.</p>
    </section>
  `;
}

function yearView(kind) {
  const meta = KIND_META[kind];
  return `
    ${crumb([{ href: "#/", label: "Home" }, { label: meta.title }])}
    <h1 class="section-title">${meta.title}</h1>
    <p class="muted" style="margin-bottom:18px">Choose your year. Each year has two semesters.</p>
    <section class="year-grid">
      ${[1, 2, 3, 4]
        .map(
          (y) => `
        <a class="card year-card" href="#/${kind}/${y}">
          <div class="year-num">${y}</div>
          <strong>${YEAR_LABEL[y]}</strong>
          <span class="muted">Semester ${SEM_IN_YEAR[y].join(" & ")}</span>
        </a>`
        )
        .join("")}
    </section>
  `;
}

function semesterView(kind, year) {
  const meta = KIND_META[kind];
  return `
    ${crumb([
      { href: "#/", label: "Home" },
      { href: `#/${kind}`, label: meta.title },
      { label: YEAR_LABEL[year] }
    ])}
    <h1 class="section-title">${YEAR_LABEL[year]}</h1>
    <p class="muted" style="margin-bottom:18px">Select a semester to open chapters and files.</p>
    <section class="sem-grid">
      ${SEM_IN_YEAR[year]
        .map(
          (sem, idx) => `
        <a class="card sem-card" href="#/${kind}/${year}/${sem}">
          <strong>${idx === 0 ? "1st Semester" : "2nd Semester"}</strong>
          <span class="muted">${SEM_LABEL[sem]} · ${subjectsFor(year, sem).length} subjects</span>
        </a>`
        )
        .join("")}
    </section>
  `;
}

function filesView(kind, year, semester) {
  const meta = KIND_META[kind];
  const subjects = subjectsFor(year, semester);
  const localSem = SEM_IN_YEAR[year][0] === semester ? "1st Semester" : "2nd Semester";
  const blocks = subjects
    .map((subject) => {
      const chapters = subject.chapters
        .map((ch) => {
          const files = (ch.files || []).filter((f) => f.kind === kind);
          const fileBits =
            files.length === 0
              ? `<span class="muted">Link pending</span>`
              : files
                  .map(
                    (f) =>
                      `<button class="ghost" data-open-file="${encodeURIComponent(JSON.stringify({ title: f.title, previewUrl: f.previewUrl, downloadUrl: f.downloadUrl, driveUrl: f.driveUrl }))}">Open</button>`
                  )
                  .join(" ");
          return `<div class="chapter-row"><div><strong>${escapeHtml(ch.name)}</strong><div class="muted">Chapter ${ch.order}</div></div><div class="inline-actions">${fileBits}</div></div>`;
        })
        .join("");
      return `<article class="panel subject-block"><div class="subject-head"><h2>${escapeHtml(subject.name)}</h2><span class="muted">${subject.chapters.length} chapters</span></div>${chapters}</article>`;
    })
    .join("");

  return `
    ${crumb([
      { href: "#/", label: "Home" },
      { href: `#/${kind}`, label: meta.title },
      { href: `#/${kind}/${year}`, label: YEAR_LABEL[year] },
      { label: localSem }
    ])}
    <h1 class="section-title">${meta.title} · ${localSem}</h1>
    <p class="muted" style="margin-bottom:18px">${YEAR_LABEL[year]} · ${SEM_LABEL[semester]} · Files open from Google Drive</p>
    ${subjects.length ? blocks : emptyState("No subjects added for this semester yet.")}
    <div id="preview-modal" class="preview-modal" hidden>
      <div class="preview-sheet">
        <div class="preview-bar">
          <strong id="preview-title">Preview</strong>
          <div class="inline-actions">
            <a id="preview-download" class="btn ghost" target="_blank" rel="noopener">Download</a>
            <a id="preview-open" class="btn ghost" target="_blank" rel="noopener">Open in Drive</a>
            <button type="button" class="danger" id="preview-close">Close</button>
          </div>
        </div>
        <iframe id="preview-frame" title="File preview" allow="autoplay"></iframe>
      </div>
    </div>
  `;
}

function adminLoginView() {
  return `
    <section class="panel admin-login">
      <h1 class="section-title">Admin login</h1>
      <p class="muted">Paste Google Drive links for each chapter. Password: admin123</p>
      <form id="login-form">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required />
        <div style="margin-top:14px"><button type="submit">Enter admin panel</button></div>
      </form>
    </section>
  `;
}

function adminPanelView() {
  const data = {
    settings: db.settings,
    subjects: db.subjects,
    chapters: db.chapters,
    files: db.files || []
  };
  const subjectOptions = data.subjects
    .slice()
    .sort((a, b) => a.year - b.year || a.semester - b.semester || a.order - b.order)
    .map((s) => `<option value="${s.id}">Y${s.year} · Sem ${s.semester} · ${escapeHtml(s.name)}</option>`)
    .join("");
  const chapterOptions = data.chapters
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((c) => {
      const sub = data.subjects.find((s) => s.id === c.subjectId);
      const label = sub ? `Y${sub.year} Sem ${sub.semester} · ${sub.name} · ${c.name}` : c.name;
      return `<option value="${c.id}">${escapeHtml(label)}</option>`;
    })
    .join("");
  const subjectRows = data.subjects
    .slice()
    .sort((a, b) => a.year - b.year || a.semester - b.semester || a.order - b.order)
    .map((s) => {
      const chCount = data.chapters.filter((c) => c.subjectId === s.id).length;
      return `<tr>
        <td>${s.year}</td><td>${s.semester}</td>
        <td>${escapeHtml(s.name)}</td>
        <td>${chCount}</td>
        <td class="inline-actions">
          <button class="ghost" data-rename-subject="${s.id}">Rename</button>
          <button class="danger" data-del-subject="${s.id}">Delete</button>
        </td>
      </tr>`;
    })
    .join("");
  const chapterRows = data.chapters
    .slice()
    .map((c) => {
      const sub = data.subjects.find((s) => s.id === c.subjectId);
      return `<tr>
        <td>${sub ? "Y" + sub.year + " Sem " + sub.semester : "-"}</td>
        <td>${sub ? escapeHtml(sub.name) : "-" }</td>
        <td>${escapeHtml(c.name)}</td>
        <td class="inline-actions">
          <button class="ghost" data-rename-chapter="${c.id}">Rename</button>
          <button class="danger" data-del-chapter="${c.id}">Delete</button>
        </td>
      </tr>`;
    })
    .join("");
  const fileRows = data.files
    .slice()
    .reverse()
    .map((f) => {
      const ch = data.chapters.find((c) => c.id === f.chapterId);
      const sub = ch ? data.subjects.find((s) => s.id === ch.subjectId) : null;
      return `<tr>
        <td>${escapeHtml(f.kind)}</td>
        <td>${sub ? escapeHtml(sub.name) : "-"}</td>
        <td>${ch ? escapeHtml(ch.name) : "-"}</td>
        <td><a href="${escapeHtml(f.driveUrl || "#")}" target="_blank" rel="noopener">${escapeHtml(f.title)}</a></td>
        <td><button class="danger" data-del-file="${f.id}">Delete</button></td>
      </tr>`;
    })
    .join("");

  return `
    <div class="admin-wrap">
      <section class="hero">
        <div class="kicker">Control panel</div>
        <h1>Manage the library</h1>
        <p>Paste a Google Drive public link below. Do not upload a file from the phone.</p>
      </section>
      <section class="panel drive-panel">
        <h2 class="section-title">Paste Google Drive link here</h2>
        <ol class="drive-steps muted">
          <li>Phone pe Google Drive app kholo, PDF/PPT upload karo.</li>
          <li>File pe 3 dots → Share → Anyone with the link → Viewer → Copy link.</li>
          <li>Neeche chapter, type, title bharo, link paste karo, Save link dabaao.</li>
        </ol>
        <form id="file-form">
          <label>Chapter</label>
          <select name="chapterId">${chapterOptions}</select>
          <div class="row">
            <div><label>Type</label><select name="kind"><option value="notes">Notes</option><option value="textbook">Textbook</option><option value="ppt">PPT</option></select></div>
            <div><label>Title</label><input name="title" placeholder="Chapter 1 notes" /></div>
          </div>
          <label>Google Drive link (paste here)</label>
          <input name="driveUrl" required inputmode="url" placeholder="https://drive.google.com/file/d/...." />
          <div style="margin-top:12px"><button type="submit">Save link</button></div>
        </form>
        <div style="overflow:auto;margin-top:16px">
          <table class="table"><thead><tr><th>Type</th><th>Subject</th><th>Chapter</th><th>File</th><th></th></tr></thead><tbody>${fileRows || ""}</tbody></table>
        </div>
      </section>
      <section class="panel">
        <h2 class="section-title">Site settings</h2>
        <form id="settings-form">
          <div class="row-3">
            <div><label>Site name</label><input name="siteName" value="${escapeHtml(data.settings.siteName)}" /></div>
            <div><label>Made by</label><input name="author" value="${escapeHtml(data.settings.author)}" /></div>
            <div><label>New password (optional)</label><input name="password" type="password" placeholder="Leave blank to keep" /></div>
          </div>
          <label>Tagline</label>
          <input name="tagline" value="${escapeHtml(data.settings.tagline)}" />
          <div style="margin-top:12px" class="inline-actions">
            <button type="submit">Save settings</button>
            <button type="button" class="ghost" id="logout-btn">Logout</button>
          </div>
        </form>
      </section>
      <section class="panel">
        <h2 class="section-title">Add subject</h2>
        <form id="subject-form" class="row">
          <div><label>Year</label><select name="year">${[1,2,3,4].map((y)=>`<option value="${y}">${y}</option>`).join("")}</select></div>
          <div><label>Semester</label><select name="semester">${[1,2,3,4,5,6,7,8].map((s)=>`<option value="${s}">${s}</option>`).join("")}</select></div>
          <div style="grid-column:1/-1"><label>Subject name</label><input name="name" required placeholder="Dairy Chemistry" /></div>
          <div><button type="submit">Add subject</button></div>
        </form>
        <div style="overflow:auto;margin-top:16px">
          <table class="table"><thead><tr><th>Year</th><th>Sem</th><th>Subject</th><th>Chapters</th><th></th></tr></thead><tbody>${subjectRows || ""}</tbody></table>
        </div>
      </section>
      <section class="panel">
        <h2 class="section-title">Chapters</h2>
        <form id="chapter-form">
          <label>Subject</label>
          <select name="subjectId">${subjectOptions}</select>
          <label>Chapter name</label>
          <input name="name" required placeholder="Milk Proteins" />
          <div style="margin-top:12px"><button type="submit">Add chapter</button></div>
        </form>
        <div style="overflow:auto;margin-top:16px">
          <table class="table"><thead><tr><th>Year / Sem</th><th>Subject</th><th>Chapter</th><th></th></tr></thead><tbody>${chapterRows || ""}</tbody></table>
        </div>
      </section>
    </div>
  `;
}

function renderAdmin() {
  if (!adminOk) {
    app.innerHTML = adminLoginView();
    document.getElementById("login-form").onsubmit = (e) => {
      e.preventDefault();
      if (e.target.password.value === (db.settings.adminPassword || "admin123")) {
        adminOk = true;
        sessionStorage.setItem("dt-admin", "1");
        render();
      } else toast("Wrong password");
    };
    return;
  }
  app.innerHTML = adminPanelView();

  document.getElementById("logout-btn").onclick = () => {
    adminOk = false;
    sessionStorage.removeItem("dt-admin");
    render();
  };

  document.getElementById("settings-form").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    db.settings.siteName = String(fd.get("siteName") || db.settings.siteName);
    db.settings.author = String(fd.get("author") || db.settings.author);
    db.settings.tagline = String(fd.get("tagline") || db.settings.tagline);
    const pw = String(fd.get("password") || "");
    if (pw.length >= 4) db.settings.adminPassword = pw;
    saveDb(db);
    refresh();
    toast("Settings saved");
    render();
  };

  document.getElementById("subject-form").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const year = Number(fd.get("year"));
    const semester = Number(fd.get("semester"));
    const name = String(fd.get("name") || "").trim();
    if (!name) return;
    const order = db.subjects.filter((s) => s.year === year && s.semester === semester).length + 1;
    db.subjects.push({ id: uid("sub"), year, semester, name, order });
    saveDb(db);
    refresh();
    toast("Subject added");
    render();
  };

  document.getElementById("chapter-form").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const subjectId = String(fd.get("subjectId"));
    const name = String(fd.get("name") || "").trim();
    if (!subjectId || !name) return;
    const order = db.chapters.filter((c) => c.subjectId === subjectId).length + 1;
    db.chapters.push({ id: uid("ch"), subjectId, name, order });
    saveDb(db);
    refresh();
    toast("Chapter added");
    render();
  };

  document.getElementById("file-form").onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const urls = driveUrls(fd.get("driveUrl"));
    if (!urls) {
      toast("Invalid Google Drive link");
      return;
    }
    db.files = db.files || [];
    db.files.push({
      id: uid("file"),
      chapterId: String(fd.get("chapterId")),
      kind: ["notes", "textbook", "ppt"].includes(fd.get("kind")) ? fd.get("kind") : "notes",
      title: String(fd.get("title") || "Open file").trim(),
      driveId: urls.driveId,
      driveUrl: urls.driveUrl,
      previewUrl: urls.previewUrl,
      downloadUrl: urls.downloadUrl
    });
    saveDb(db);
    refresh();
    toast("Drive link saved");
    render();
  };

  app.querySelectorAll("[data-rename-subject]").forEach((btn) => {
    btn.onclick = () => {
      const name = prompt("New subject name");
      if (!name) return;
      const s = db.subjects.find((x) => x.id === btn.dataset.renameSubject);
      if (s) s.name = name.trim();
      saveDb(db);
      refresh();
      render();
    };
  });
  app.querySelectorAll("[data-del-subject]").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Delete this subject and its chapters/files?")) return;
      const id = btn.dataset.delSubject;
      const chapterIds = db.chapters.filter((c) => c.subjectId === id).map((c) => c.id);
      db.files = (db.files || []).filter((f) => !chapterIds.includes(f.chapterId));
      db.chapters = db.chapters.filter((c) => c.subjectId !== id);
      db.subjects = db.subjects.filter((s) => s.id !== id);
      saveDb(db);
      refresh();
      render();
    };
  });
  app.querySelectorAll("[data-rename-chapter]").forEach((btn) => {
    btn.onclick = () => {
      const name = prompt("New chapter name");
      if (!name) return;
      const c = db.chapters.find((x) => x.id === btn.dataset.renameChapter);
      if (c) c.name = name.trim();
      saveDb(db);
      refresh();
      render();
    };
  });
  app.querySelectorAll("[data-del-chapter]").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Delete this chapter and its files?")) return;
      const id = btn.dataset.delChapter;
      db.files = (db.files || []).filter((f) => f.chapterId !== id);
      db.chapters = db.chapters.filter((c) => c.id !== id);
      saveDb(db);
      refresh();
      render();
    };
  });
  app.querySelectorAll("[data-del-file]").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Delete this file?")) return;
      db.files = (db.files || []).filter((f) => f.id !== btn.dataset.delFile);
      saveDb(db);
      refresh();
      render();
    };
  });
}

function bindPreview() {
  const modal = document.getElementById("preview-modal");
  if (!modal) return;
  const frame = document.getElementById("preview-frame");
  const title = document.getElementById("preview-title");
  const download = document.getElementById("preview-download");
  const open = document.getElementById("preview-open");
  const close = () => {
    modal.hidden = true;
    frame.src = "";
  };
  document.getElementById("preview-close").onclick = close;
  modal.onclick = (e) => {
    if (e.target === modal) close();
  };
  app.querySelectorAll("[data-open-file]").forEach((btn) => {
    btn.onclick = () => {
      const f = JSON.parse(decodeURIComponent(btn.dataset.openFile));
      title.textContent = f.title || "Preview";
      download.href = f.downloadUrl || f.driveUrl;
      open.href = f.driveUrl || f.previewUrl;
      frame.src = f.previewUrl || f.driveUrl;
      modal.hidden = false;
    };
  });
}

function render() {
  db = loadDb();
  refresh();
  const { parts } = parseHash();
  const [a, b, c] = parts;
  if (!a) {
    app.innerHTML = homeView();
    return;
  }
  if (a === "admin") {
    renderAdmin();
    return;
  }
  if (!KIND_META[a]) {
    app.innerHTML = homeView();
    return;
  }
  const year = Number(b);
  const semester = Number(c);
  if (!b) app.innerHTML = yearView(a);
  else if (!c) app.innerHTML = semesterView(a, year);
  else {
    app.innerHTML = filesView(a, year, semester);
    bindPreview();
  }
}

window.addEventListener("hashchange", render);
render();

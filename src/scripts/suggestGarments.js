
/**
 * Adds a inner layer garment to the outer layer garment and increases 
 * the outer garments score to place it higher in order of suggested garments.
 */

const addInnerLayer = (garment, middleLayer) => {
    garment.score += 0.5; // 0.5 for meeting temperatuer criteria but not 1 since it requiers a middle layer
    if (garment.innerLayer) {
        garment.innerLayer.push(middleLayer);
    } else {
        garment.innerLayer = [middleLayer];
    }
}

/**
 * Returns which outer layer types the middle layer is suited for
 * @param {*} middleLayer Middle layer garment to be evaluated
 * @returns Array of suited outer layer types
 */
const setMatchingTypes = (middleLayer) => {
    switch (middleLayer.type) {
        case 'shirt':
            return ['overall', 'jacket']; // Add garment types that fit the type of middlelayer
        case 'pants':
            return ['overall', 'shellTrousers'];
        case 'shoes':
            return ['shoes'];
        default:
            return '';
    }
}

/**
 * Finds a matching middle layer for a garment and checks if the garment
 * in combination with the middle layer matches the type of garment. 
 * If true it will be added as a attribute in the garment object.
 * This will add the middle layer as a card when displaying suggested garments
 * 
 * @param {object} garment The garment that to be matched with a middle layer
 * @param {Array} condition The condition to test the garment and middle layer against
 */
const findMiddleLayer = (garment, condition, middleLayers) => {
    let hasInnerLayer = false; // Om ett mellanlager har lagts till i set[]

    // Sorting middle layer garments from low temperature compensation to high
    // so that the lower garments will be compared first and fill the inner layer
    // spot if the requirements are met
    middleLayers.sort((a, b) => a.temperatureCompensation > b.temperatureCompensation ? 1 : -1);

    middleLayers.map((middleLayer) => {
        const forType = setMatchingTypes(middleLayer);

        const newGarmentTempMin = (garment.tempMin - middleLayer.temperatureCompensation) < condition.temperature;
        const typeMatches = forType.includes(garment.type);

        //TODO: testa med if(garment.innerlayer) / hasInnerLayer
        //TODO: overall eller overalls?
        // Checks if a overall garment needs an extra layer
        if (hasInnerLayer
            && garment.type === 'overall'
            && typeMatches
            && garment.innerLayer.length < 2
            && garment.innerLayer[0].type !== middleLayer.type
            && garment.innerLayer[0].temperatureCompensation === middleLayer.temperatureCompensation) {

            addInnerLayer(garment, middleLayer);
            hasInnerLayer = true

        } else if (
            !hasInnerLayer &&
            typeMatches &&
            newGarmentTempMin) {

            addInnerLayer(garment, middleLayer);
            hasInnerLayer = true
        }

    })
}

export const getSuggestions = (condition, middleLayers, originalGarments) => {
    try {

        //TODO: Detta är bara för test syfte
        const garments = [];
        originalGarments.forEach((g) => {
            garments.push({ ...g });
        })
        const suggestedClothes = [];
        /**
         * Poängsystem:
         * garment får 1p för temperatur och 1p för väderförhållande
         * får t.ex om en overall klarar av regn(1p) och 5grader temp(1p) får den 2p och hamnar i den högsta skalan av poäng
         * får t.ex en regnjacka som klarar temperaturen får den 1p vilket kan komma att kombineras med regnbyxor som också kan få 1p vilket ger 2p och hamnar i högsta skalan av poäng
         * en overall som klarar regn(1p) men inte temperatur får 1p men kan kompletteras med ett innerlager och om temperaturen möter kriteriet då så ökar det med 1p och hamnar i högsta skalan
         * 
         * set av garment poängsätts även för antal plagg, en overall = 1, jacka + överdrag = 2, jacka + överdrag + innerlager = 3
         * //TODO: måste fixa 3p system
         * ju lägre poäng desto bättre
         * 
         * ex:
         * väder: 5grader och regn
         * overall (regn) (5grader) = 2p
         * 
         * fodrad jacka (regn) (5grader) = 1p 
         * fodrade överdragsbyxor (regn) (5grader) = 1p  
         * kombineras till 2p 
         * 
         * overall (regn) (10grader) = 1p (möter inte temperaturkriteriet)
         */

        // Går igenom listan och filtrerar fram alla kläder som på något sätt matchar vädret
        garments.map((garment) => {
            let allCriteriaMet = false // Om false -> ytterkläderna räcker inte för temperaturen, -> testar lägga till mellan lager

            garment.score = 0;


            const meetsCondition = garment.condition.includes(condition.condition);

            //TODO: filtrera bort de som ger false pga för hög temp, en vinteroverall ska ska inte fungera vid 10c varmt med ull under?
            const meetsTemperature =
                (garment.tempMax > condition.temperature) &&
                (garment.tempMin < condition.temperature);

            if (meetsCondition &&
                meetsTemperature) {  // Kollar om garment möter både förhållandet(regn) och temperaturen
                garment.score = 3; // förhållande 1p + teimp 1p (+0.1p för att förhållande > temperatur) 
                allCriteriaMet = true;
                //TODO: testa om && garment.tempMax < condition.temperature
            } else if (meetsCondition && (garment.tempMax > condition.temperature)) { // Kollar om garment möter förhållande kriteriet (regn)
                garment.score = 2; // 1.1p för förhållande (+0.1p för att förhållande > temperatur) 
            } else if (meetsTemperature) { // kollar om garment möter temperatur kriterie
                garment.score = 1; // 1p för temperatur
            }

            // reduce jackets and shellpants points to lower them in the order to give precidence to overalls
            if (garment.type === 'jacket' || garment.type === 'shellTrousers') {
                garment.score -= 0.25;
            }

            //TODO: ska den här läggas in under kontroll för förhållande?
            // om inte både temperatur och förhållande möts så testas temperaturen om den subtraheras med innre lagrets temperaturvärde
            if (!allCriteriaMet &&
                meetsCondition &&
                garment.tempMax > condition.temperature &&
                (garment.type === 'jacket' ||
                    garment.type === 'shellTrousers' ||
                    garment.type === 'shoes' ||
                    garment.type === 'overall'
                )) {
                findMiddleLayer(garment, condition, middleLayers);
            }
        })

        // Sort garments after score, high to low
        garments.sort((a, b) => a.score - b.score || b.setCount - a.setCount);
        garments.reverse();

        // Add only one garment per type to the suggestion list
        garments.map((garment) => {
            const exists = suggestedClothes.some((existingGarment) => existingGarment.type === garment.type);
            //TODO: testa om score > 1 fungerar korrekt
            if (!exists && garment.score > 1) {
                suggestedClothes.push(garment);
            }
        })


        // Check if overall exists
        //TODO: rename
        const overallExists = suggestedClothes.find((garment) => garment.type === 'overall')

        // splice jacket and shell pants if overall exists and if its better scored than jacket or shell pants
        // If the overall is lower scored than either the jacket or shellpants the overall will be spliced
        // TODO: evaluate if a check if either jacket or shell exists before splicing overall
        for (let i = suggestedClothes.length - 1; i >= 0; i--) {
            const garment = suggestedClothes[i];

            if (overallExists &&
                overallExists.score > garment.score &&
                (garment.type === 'jacket' || garment.type === 'shellTrousers')) {
                suggestedClothes.splice(i, 1);
            } else if (overallExists &&
                overallExists.score < garment.score &&
                (garment.type === 'jacket' || garment.type === 'shellTrousers')) {
                suggestedClothes.splice(suggestedClothes.indexOf(overallExists), 1);
                break;
            }
        }

        const sortOrder = ['overall', 'jacket', 'shellTrousers', 'hat', 'gloves', 'shoes']

        suggestedClothes.sort((a, b) => sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type));

        return suggestedClothes;

    } catch (error) {
        return [];
    }
}
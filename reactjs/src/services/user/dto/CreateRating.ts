export interface CreateRating {
    id: number;
    userId: number;
    placeId: string;
    placeName: string;
    drinkOptionId: string;
    beanTypeId: string;
    beanName: string;
    regionName: string;
    roasterName: string;
    milkTypeId: number;
    roasterTypeId: string;
    placeRating: number;
    barista: string;
    testingNotes: string;
    placeImage: string;
    placeImageType: string;
    placeImageName: string;
    isDrinkRatioChanged: boolean;
    isBlendComponentsChanged: boolean;
    isDifferentServingTemp: boolean;
    isDifferentBarista: boolean;
    otherReason: boolean;
    ratingId : number; 
    moreRatingDetails : CreateRating[]; 
    creationTime : Date;

}
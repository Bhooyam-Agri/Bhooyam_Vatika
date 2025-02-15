export const PLANT_IMAGES_PATH = '/photos';  // This will map to the public directory

export const getPlantImagePath = (imageName: string) => {
  return `${PLANT_IMAGES_PATH}/${imageName}`;
}; 
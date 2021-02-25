export default function(galleryList = [], action) {
    if(action.type == 'addPersonToGallery') {
        const galleryListCopy = [...galleryList, action.person];
        return galleryListCopy;
    } else {
      return galleryList; 
   } 
}
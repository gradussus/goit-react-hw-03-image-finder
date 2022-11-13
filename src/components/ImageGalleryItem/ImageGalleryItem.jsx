import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  click,
}) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => {
        click(largeImageURL);
      }}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem_image}
      />
    </li>
  );
};

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  click,
}) => {
  return (
    <li
      onClick={() => {
        click(largeImageURL);
      }}
    >
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

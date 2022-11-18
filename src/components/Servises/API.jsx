import axios from 'axios';

export const searchParams = new URLSearchParams({
    key: '30176034-3a939666b78dd32120afd5b2c',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

// export function setSearchParams () {}

export const API = () =>  axios.get(`https://pixabay.com/api/?${searchParams}`)
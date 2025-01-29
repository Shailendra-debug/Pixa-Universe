document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://pixabay.com/api/?key=16540928-953b26f5c191adbc64444e096&image_type=photo&pretty=true&per_page=200';
    const imageGallery = document.getElementById('image-gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const downloadBtn = document.getElementById('download-btn');
    const closeModal = document.querySelector('.close');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.hits.forEach(hit => {
                const img = document.createElement('img');
                img.src = hit.webformatURL;
                img.alt = hit.tags;
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modalImage.src = hit.largeImageURL;
                    downloadBtn.href = hit.largeImageURL;
                    downloadBtn.download = hit.id + '.jpg';
                });
                imageGallery.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

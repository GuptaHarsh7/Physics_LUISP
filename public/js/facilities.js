

const images = ['newtons_rings.jpg', 'grating_setup.jpg', 'spectrometer_setup.jpg'];
const contents = ["Newton's rings", 'Grating setup', 'Spectrometer setup'];

const elements = {
    button: document.querySelectorAll('.button'),
    buttonLeft: document.querySelector('.button--left'),
    buttonRight: document.querySelector('.button--right'),
    activeImage: document.querySelector('.active__image'),
    contentName: document.querySelector('.content-name'),
    // marker: document.querySelector('.marker'),
};
// images.forEach((current,index) => {
//     let type='off'
//     if (index==0) type='on'
//     const markup = `<ion-icon class="marker__icon marker--${index}" name="radio-button-${type}"></ion-icon>`
//     elements.marker.insertAdjacentHTML('beforeend',markup)
//     // elements.marker.classList.add(`marker--${index}`)
// })

const changeImage = event => {
    const el = event.target.closest('.button');
    // Index of that new index
    const newIndex = +el.dataset.gotoimage;
    const fileName = images[newIndex];

    // Changing Image
    elements.activeImage.setAttribute('src', `./media/${fileName}`);

    const mod = images.length;
    // Changing buttons dataset value
    const left = newIndex - 1 >= 0 ? (newIndex - 1) % mod : mod + ((newIndex - 1) % mod);
    elements.buttonLeft.dataset.gotoimage = left;
    const right = (newIndex + 1) % mod;
    elements.buttonRight.dataset.gotoimage = right;

    // Changing Content
    elements.contentName.textContent = contents[newIndex];

    //Changing Marker
    // document.querySelector(`marker--${newIndex}`).setAttribute('name', 'radio-button-on')
};

elements.button.forEach(node => {
    node.addEventListener('click', changeImage);
});
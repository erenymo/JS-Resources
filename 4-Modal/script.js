'use strict';

// birden fazla kez kullanılmış class'o querySelector ile çağırdığın zaman sadece ilk eleman gelir
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal'); // querySelectorAll() ile birden fazla yerde kullanılmış class'ın tüm elemanlarını çağırır.

// Show Modal
const showModal = function () {
  modal.classList.remove('hidden'); // classList:  modal classının sahip olduğu diğer class listesine erişebilirsin.
  overlay.classList.remove('hidden');
};

// Close The Modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnShowModal.length; i++) {
  console.log(i);
  btnShowModal[i].addEventListener('click', showModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//keydown : tuşa bastığımız an,  keypress : tuşa basılı tuttuğumuz sürece,  keyup : tuştan elimizi kaldırdığımızda.
document.addEventListener('keydown', function (event) {
  console.log(event);
  console.log(event.key); // returns which key I pressed
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

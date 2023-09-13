const mainImage = document.getElementById("main-image");
const images = document.querySelectorAll(".product-detail__img-item");
const slider = document.querySelector('.product-detail__img-slider');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentIndex = 0;

// Hàm cập nhật ảnh khi click
function updateImageByClick(event) {
	const image = event.target;
	mainImage.src = image.src;
	currentIndex = Array.from(images).indexOf(image); // Cập nhật currentIndex dựa trên vị trí của hình ảnh trong danh sách
	updateSlider();
}

// Hàm cập nhật ảnh khi click nút prev
function updateImageByPrev() {
	if (currentIndex > 0) {
		currentIndex--;
		mainImage.src = images[currentIndex].src;
		updateSlider();
	}
}

// Hàm cập nhật ảnh khi click nút next
function updateImageByNext() {
	if (currentIndex < images.length - 1) {
		currentIndex++;
		mainImage.src = images[currentIndex].src;
		updateSlider();
	}
}

// Hàm cập nhật slider
function updateSlider() {
  const scrollPosition = currentIndex * images[0].offsetWidth; // Định vị hiện tại cho scroll

  slider.scrollTo({
    left: scrollPosition,
    behavior: "smooth", // Tạo hiệu ứng mượt mà
  });

  // Loại bỏ lớp active khỏi tất cả các hình ảnh
  images.forEach((img) => {
    img.classList.remove("product-detail__img-item--active");
  });

  // Thêm lớp active cho hình ảnh được chọn
  images[currentIndex].classList.add("product-detail__img-item--active");
}

// Thêm sự kiện click cho các ảnh
images.forEach((image) => {
	image.addEventListener("click", updateImageByClick);
});

// Thêm sự kiện click cho nút prev
prevButton.addEventListener('click', updateImageByPrev);

// Thêm sự kiện click cho nút next
nextButton.addEventListener('click', updateImageByNext);

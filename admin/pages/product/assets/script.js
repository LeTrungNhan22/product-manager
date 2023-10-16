"use strict";

// Image Upload Preview
let noImageRef = document.getElementById('no-images');
let showImageRef = document.getElementById('show-images');
let uploadImageBtn = document.getElementById('upload-image-button');
let fileInput = document.getElementById('inputProductImages'); // Đặt biến này ở đây
let urlImage = document.getElementById('url');
let saveURLBtn = document.getElementById('modal-save-image-btn');
let closeModelBtn = document.getElementById('modal-close-btn');
let delAllImageBtn = document.getElementById('delete-all-image-btn');
let arrImages = []; // Đặt biến toàn cục

uploadImageBtn.addEventListener('click', function (e) {
	e.preventDefault();
	fileInput.click(); // Sử dụng biến toàn cục fileInput ở đây
});


fileInput.addEventListener('change', function (e) {
	let files = e.target.files;
	if (files.length > 0) {
		noImageRef.classList.add('d-none');
		showImageRef.classList.remove('d-none');
		renderImages(files);
	} else {
		noImageRef.classList.remove('d-none');
		showImageRef.classList.add('d-none');
	}
});

let addImageButtonElement = `  <div class="product-image--item__add d-flex flex-row p-3">
	<button
	  type="button"
	  class="btn btn-primary w-50 me-1"
	  id="add-image-button"
	  onclick="document.getElementById('inputProductImages').click();"
	>
	  Thêm
	</button>
	<button
	type="button"
	class="btn btn-secondary"
	id="add-image-url-button w-50"
	data-bs-toggle="modal"
	data-bs-target="#inputUrlImageModal"
  >
	Từ URL
  </button>
  </div>`;

const renderImages = (files) => {
	console.log(fileInput);
	//  check files is exist
	if (files.length === 0) return;
	//  check arrImages is exist
	if (arrImages.length === 0) {
		arrImages = [...files];
	} else {
		arrImages = [...arrImages, ...files];
	}
	//  render images

	console.log(arrImages); // Số lượng file được render chính xác
	let html = arrImages.map((file, index) => {
		return ` <div class="product-image--item 
							 ${index === 0 ? 'product-image--item__main' : ''}"
						 data-image-id=${index}
					>
					<img
					src="${URL.createObjectURL(file)}"
					alt=""
					class="product-image--item-src"
					/>
					<input
					type="checkbox"
					class="delete-image-checkbox"
					data-image-index="${index}"
					>
			
					</input>
			</div>`;
	});
	showImageRef.innerHTML = html.join('') + addImageButtonElement;
	//  add event listener for delete image
	let deleteImageCheckbox = document.querySelectorAll('.delete-image-checkbox');
	if (deleteImageCheckbox.length > 0) {
		delAllImageBtn.classList.remove('d-none');
	}
};

// Delete image is checked by button
delAllImageBtn.addEventListener('click', function (e) {
	e.preventDefault();
	let deleteImageCheckboxes = document.querySelectorAll('.delete-image-checkbox');
	if (deleteImageCheckboxes.length === 0) return;

	// Tạo một mảng chứa chỉ các phần tử chưa được chọn
	arrImages = arrImages.filter((image, index) => {
		return !deleteImageCheckboxes[index].checked;
	});
	// Vẽ lại hình ảnh dựa trên mảng đã lọc
	renderImages(arrImages);
});



saveURLBtn.addEventListener('click', function (e) {
	e.preventDefault();
	let url = urlImage.value;
	if (url === '') return;
	addImageByUrl(url);
	urlImage.value = '';
	closeModelBtn.click();
});

// Function to add image by URL
const addImageByUrl = (url) => {
	let tempFiles = [];
	fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.blob();
			}
			throw new Error('Network response was not ok');
		})
		.then((blob) => {
			// Thêm hình ảnh từ URL vào mảng
			const fakeFile = new File([blob], 'image.jpg', { type: blob.type });
			tempFiles.push(fakeFile);
			// Render hình ảnh
			renderImages(tempFiles);
		})
		.catch((error) => {
			console.error('Error adding image by URL:', error);
		});
};





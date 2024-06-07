// const $fileInput = $('.file-input');
// const $droparea = $('.file-drop-area');
// const $delete = $('.item-delete');

// $fileInput.on('dragenter focus click', function () {
//   $droparea.addClass('is-active');
// });

// $fileInput.on('dragleave blur drop', function () {
//   $droparea.removeClass('is-active');
// });

// $fileInput.on('change', function () {
//   let filesCount = $(this)[0].files.length;
//   let $textContainer = $(this).prev();

//   if (filesCount === 1) {
//     let fileName = $(this).val().split('\\').pop();
//     $textContainer.text(fileName);
//     $('.item-delete').css('display', 'inline-block');
//   } else if (filesCount === 0) {
//     $textContainer.text('or drop files here');
//     $('.item-delete').css('display', 'none');
//   } else {
//     $textContainer.text(filesCount + ' files selected');
//     $('.item-delete').css('display', 'inline-block');
//   }
// });

// $delete.on('click', function () {
//   $('.file-input').val(null);
//   $('.file-msg').text('or drop files here');
//   $('.item-delete').css('display', 'none');
// });

/////////////////////////////////////////////////////////////////////////////////////////

  // document.getElementById('upload-form').addEventListener('submit', function (e) {
  //   e.preventDefault();
  // const formData = new FormData(this);

  // fetch('/upload_project', {
  //   method: 'POST',
  // body: formData,
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //           if (data.message === 'Project uploaded successfully') {
  //   // Redirect to a new page upon successful upload
  //   window.location.href = '/success.html';
  //           } else {
  //   alert('Upload failed. Please try again.');
  //           }
  //       })
  //       .catch(error => {
  //   console.error(error);
  // alert('Server error. Please try again later.');
  //       });
  //   });
 
  /////////////////////////////////////////////////////////////////////////////////////////


  // document.getElementById('upload-form').addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   const formData = new FormData(this);
  
  //   fetch('/upload_project', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.message === 'Project uploaded successfully') {
  //         // Redirect to a new page upon successful upload
  //         window.location.href = '/uniindex.html';
  //       } else {
  //         alert('Upload failed. Please try again.');
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       alert('Server error. Please try again later.');
  //     });
  // });
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  // Create an array to store the selected files
  const selectedFiles = document.querySelector('input[type="file"]').files;

  
  // Check if files were selected
  if (selectedFiles.length === 0) {
    alert('Please select at least one file to upload.');
    return;
  }

  // Append the selected files to the FormData object
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append('files', selectedFiles[i]);
  }

  // Send the formData to the server
  fetch('/upload_project', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Project uploaded successfully') {
        // Redirect to a new page upon successful upload
        window.location.href = '/uniindex.html';
      } else {
        alert('Upload failed. Please try again.');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Server error. Please try again later.');
    });
});

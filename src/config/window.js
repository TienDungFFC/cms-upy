window.UPY_ACTION_WATCH = 'watch'; // xem
window.UPY_ACTION_CREATE = 'create'; // thêm mới
window.UPY_ACTION_DELETE = 'delete'; // xóa
window.UPY_ACTION_UPDATE = 'update'; // chỉnh sửa
window.UPY_ACTION_EXPERTISE = 'expires'; // thẩm định
window.UPY_ACTION_UPLOAD_EXCEL = 'upload_excel'; // upload excel

window.errorImage = (e) => {
    if(e.target){
        // e.target.classList.add('error-img');
        e.target.src = '/images/no-image.png';
    }else{
        // e.classList.add('error-img');
        e.src = '/images/no-image.png'
    }

}

window.stopScoll = (e) => {
    window.scrollTo(0, 0)
}
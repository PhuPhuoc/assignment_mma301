const GetImageSource = (imgSource: string | undefined) => {
    switch (imgSource) {
        case 'red_user.png':
            return require('../assets/red_user.png');
        case 'blue_user.png':
            return require('../assets/blue_user.png');
        // Thêm các trường hợp khác tùy theo tên hình ảnh của bạn
        default:
            return require('../assets/purple_user.png'); // Hình ảnh mặc định
    }
};

export default GetImageSource

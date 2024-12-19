class ImgStyleUtil {
    setStyle = (thumb) => {
        return thumb === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" 
            ? {"objectFit":"unset"} 
            : {"objectFit":"cover"}
    }
}

export default ImgStyleUtil;
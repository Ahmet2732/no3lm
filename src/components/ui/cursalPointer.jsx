const Carousel = ({ items, renderItem, carouselId }) => {
    const itemGroups = chunkArray(items, 3); //  sets of 3 

    return (
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {itemGroups.map((group, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <div className="row justify-content-center">
                            {group.map(item => renderItem(item))}
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev " type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon  rounded-circle bg-danger p-3 " aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                <span className="carousel-control-next-icon rounded-circle bg-danger p-3" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
    
}; 
const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};
export default Carousel;
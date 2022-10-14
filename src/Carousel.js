import React from "react";
class Carousel extends React.Component {
  // Old-fashion way
  // constructor(props) {
  //   super(props);

  //   this.handleIndexClick = this.handleIndexClick.bind(this);
  // }
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel container mx-auto flex justify-around items-start h-96 mt-2">
        <img
          src={images[active]}
          alt="animal"
          className="max-w[45%] w-96 rounded-xl border-4 border-[#333] "
        ></img>
        <div className="carousel-smaller w-[50%] ">
          {images.map((photo, index) => (
            //eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              key={photo}
              src={photo}
              data-index={index}
              className={
                index === active
                  ? "active w-24 h-24 inline-block m-4 rounded-full border-4 border-[#333] opacity-60"
                  : "" +
                    "w-24 h-24 inline-block m-4 rounded-full border-red-300 border-4"
              }
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

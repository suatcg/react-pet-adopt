import { Component, lazy } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
const Modal = lazy(() => import("./Modal"));

class Details extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: true,
  //   };
  // }

  // Class-properties with babel plug-in , it does same thing as above
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );

    const json = await res.json();

    this.setState(Object.assign({ loading: false }, json.pets[0]));

    // Same way above one
    // this.setState({ loading: false }, ...json.pets[0]);

    // Same way above one
    // this.setState({
    //   loading: false,
    // });

    // this.setState(json.pets[0]);

    // setTimeout(function () {
    //   console.log(this.state);
    // }, 1);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }

    // throw new Error("It's crashed");

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details h-full">
        <Carousel images={images} />
        <div className="container mx-auto">
          <h1 className=" font-bold text-[5rem]">{name}</h1>
          <h2 className="text-red-600 font-extrabold uppercase">
            {animal} - {breed} - {city} - {state}{" "}
          </h2>
          {/* How can you read into class component  */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                className="btn"
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                {" "}
                Adopt {name}{" "}
              </button>
            )}
          </ThemeContext.Consumer>
          <p className="text-[1.2rem] w-[50%]">{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();

  return (
    <ErrorBoundary>
      <Details params={params} />{" "}
    </ErrorBoundary>
  );
};

export default WrappedDetails;
// export default withRouter(Details);
